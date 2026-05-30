import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { sendRemoteForgeLicenseEmail } from "@/src/lib/email/sendRemoteForgeLicenseEmail";
import { adminDb } from "@/src/lib/firebase-admin";
import {
  createRemoteForgeLicenseCode,
  findLicenseBySubscription,
} from "@/src/lib/stripe/remoteForgeLicenseCodes";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function getCustomerEmail(session: Stripe.Checkout.Session) {
  return (
    session.customer_details?.email ||
    session.customer_email ||
    ""
  ).trim();
}

function getPlanLabel(plan: string) {
  if (plan === "monthly") return "Monthly Early Bird";
  if (plan === "yearly") return "Yearly Early Bird";
  if (plan === "lifetime") return "Lifetime Early Bird";
  return "Early Bird";
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "/api/stripe/webhook",
    message: "RemoteForge Stripe webhook route is live.",
  });
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  console.log("[Stripe webhook] checkout.session.completed:", session.id);

  if (session.metadata?.app !== "remoteforge") {
    console.log("[Stripe webhook] Ignored session. app metadata mismatch.");
    return;
  }

  if (session.metadata?.offer !== "early_bird") {
    console.log("[Stripe webhook] Ignored session. offer metadata mismatch.");
    return;
  }

  const plan = session.metadata.plan;

  if (plan !== "monthly" && plan !== "yearly" && plan !== "lifetime") {
    console.warn("[Stripe webhook] Unknown early-bird plan:", plan);
    return;
  }

  const codePrefix = session.metadata.codePrefix;

  if (
    codePrefix !== "RF-MO" &&
    codePrefix !== "RF-YR" &&
    codePrefix !== "RF-LT"
  ) {
    console.warn("[Stripe webhook] Unknown code prefix:", codePrefix);
    return;
  }

  const premiumPlan = session.metadata.premiumPlan;

  if (
    premiumPlan !== "early_bird_monthly" &&
    premiumPlan !== "early_bird_yearly" &&
    premiumPlan !== "early_bird_lifetime"
  ) {
    console.warn("[Stripe webhook] Unknown premium plan:", premiumPlan);
    return;
  }

  const subscriptionStatus = session.metadata.subscriptionStatus;

  if (
    subscriptionStatus !== "monthly" &&
    subscriptionStatus !== "yearly" &&
    subscriptionStatus !== "lifetime"
  ) {
    console.warn(
      "[Stripe webhook] Unknown subscription status:",
      subscriptionStatus,
    );
    return;
  }

  const email = getCustomerEmail(session);

  if (!email) {
    console.warn(
      "[Stripe webhook] Checkout completed without customer email:",
      session.id,
    );
  }

  const stripePaymentIntentId = readString(session.payment_intent);
  const stripeSubscriptionId = readString(session.subscription);
  const stripeCustomerId = readString(session.customer);

  const license = await createRemoteForgeLicenseCode({
    codePrefix,
    email,
    plan,
    premiumPlan,
    subscriptionStatus,
    stripeCheckoutSessionId: session.id,
    stripePaymentIntentId,
    stripeSubscriptionId,
    stripeCustomerId,
    amountTotal: session.amount_total,
    currency: session.currency,
  });

  console.log(
    "[Stripe webhook] License result:",
    license.code,
    "created=",
    license.created,
  );

  if (!license.created) {
    console.log(
      "[Stripe webhook] License already existed. Skipping duplicate email.",
    );
    return;
  }

  if (!email) {
    await adminDb.collection("licenseCodes").doc(license.code).set(
      {
        emailSent: false,
        emailSentAt: null,
        emailError: "Missing customer email from Stripe Checkout Session.",
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return;
  }

  const emailResult = await sendRemoteForgeLicenseEmail({
    to: email,
    code: license.code,
    plan: getPlanLabel(plan),
  });

  await adminDb.collection("licenseCodes").doc(license.code).set(
    {
      emailSent: emailResult.sent,
      emailSentAt: emailResult.sent ? FieldValue.serverTimestamp() : null,
      emailError: emailResult.sent ? "" : emailResult.error || "",
      resendEmailId: emailResult.id || "",
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  console.log("[Stripe webhook] Email result:", emailResult);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log(
    "[Stripe webhook] Subscription event:",
    subscription.id,
    subscription.status,
  );

  const license = await findLicenseBySubscription(subscription.id);

  if (!license) {
    console.log(
      "[Stripe webhook] No license found for subscription:",
      subscription.id,
    );
    return;
  }

  const activeStatuses = ["active", "trialing"];
  const isActive = activeStatuses.includes(subscription.status);

  const firstItem = subscription.items.data[0];

  const currentPeriodStart =
    typeof firstItem?.current_period_start === "number"
      ? new Date(firstItem.current_period_start * 1000)
      : null;

  const currentPeriodEnd =
    typeof firstItem?.current_period_end === "number"
      ? new Date(firstItem.current_period_end * 1000)
      : null;

  await license.ref.set(
    {
      stripeSubscriptionStatus: subscription.status,
      isActive,
      updatedAt: FieldValue.serverTimestamp(),
      currentPeriodStart,
      currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
    { merge: true },
  );

  const data = license.data();
  const redeemedByUid = readString(data.redeemedByUid);
  const code = readString(data.code);

  if (!redeemedByUid || !code) return;

  const userRef = adminDb.collection("users").doc(redeemedByUid);
  const userSnap = await userRef.get();

  if (!userSnap.exists) return;

  const userData = userSnap.data() || {};

  if (userData.licenseCode !== code) return;

  await userRef.set(
    {
      isPremium: isActive,
      adsDisabled: isActive,
      subscriptionStatus: isActive ? data.subscriptionStatus : "inactive",
      premiumPlan: isActive ? data.premiumPlan : "none",
      premiumUpdatedAt: FieldValue.serverTimestamp(),
      stripeSubscriptionStatus: subscription.status,
      currentPeriodStart,
      currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      updatedAt: FieldValue.serverTimestamp(),
      lastActiveAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
}

export async function POST(req: NextRequest) {
  console.log("[Stripe webhook] HIT");

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    console.error("[Stripe webhook] Missing Stripe signature.");

    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    console.log("[Stripe webhook] Verified event:", event.type);
  } catch (error) {
    console.error("[Stripe webhook] Signature failed:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `Webhook signature failed: ${error.message}`
            : "Webhook signature failed.",
      },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription,
        );
        break;
      }

      default: {
        console.log("[Stripe webhook] Ignored event:", event.type);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Stripe webhook] Handler failed:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Stripe webhook handler failed.",
      },
      { status: 500 },
    );
  }
}