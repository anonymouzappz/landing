import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { sendRemoteForgeLicenseEmail } from "@/src/lib/email/sendRemoteForgeLicenseEmail";
import { adminDb } from "@/src/lib/firebase-admin";
import {
  createRemoteForgeLicenseCode,
  findLicenseBySubscription,
  type CodePrefix,
  type PremiumPlan,
  type RegularPlan,
  type SubscriptionStatus,
} from "@/src/lib/stripe/remoteForgeLicenseCodes";

export const runtime = "nodejs";

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value || value.trim().length === 0) {
    throw new Error(`Missing ${name}`);
  }

  return value.trim();
}

const stripeSecretKey = requiredEnv("STRIPE_SECRET_KEY");
const stripeWebhookSecret = requiredEnv("STRIPE_WEBHOOK_SECRET");

const stripe = new Stripe(stripeSecretKey);

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isRemoteForgePlan(value: unknown): value is RegularPlan {
  return value === "monthly" || value === "yearly" || value === "lifetime";
}

function getCustomerEmail(session: Stripe.Checkout.Session): string {
  return (
    session.customer_details?.email ||
    session.customer_email ||
    ""
  ).trim();
}

function getCodePrefix(plan: RegularPlan): CodePrefix {
  if (plan === "monthly") return "RF-MONTHLY";
  if (plan === "yearly") return "RF-YEARLY";
  return "RF-LIFETIME";
}

function getPremiumPlan(plan: RegularPlan): PremiumPlan {
  if (plan === "monthly") return "stripe_monthly";
  if (plan === "yearly") return "stripe_yearly";
  return "stripe_lifetime";
}

function getSubscriptionStatus(plan: RegularPlan): SubscriptionStatus {
  return plan;
}

function getPlanLabel(plan: RegularPlan): string {
  if (plan === "monthly") return "Monthly Premium";
  if (plan === "yearly") return "Yearly Premium";
  return "Lifetime Premium";
}

function getStripePaymentIntentId(session: Stripe.Checkout.Session): string {
  return typeof session.payment_intent === "string"
    ? session.payment_intent
    : "";
}

function getStripeSubscriptionId(session: Stripe.Checkout.Session): string {
  return typeof session.subscription === "string"
    ? session.subscription
    : "";
}

function getStripeCustomerId(session: Stripe.Checkout.Session): string {
  return typeof session.customer === "string" ? session.customer : "";
}

function getSubscriptionPeriodDates(subscription: Stripe.Subscription) {
  const firstItem = subscription.items.data[0];

  const currentPeriodStart =
    typeof firstItem?.current_period_start === "number"
      ? new Date(firstItem.current_period_start * 1000)
      : null;

  const currentPeriodEnd =
    typeof firstItem?.current_period_end === "number"
      ? new Date(firstItem.current_period_end * 1000)
      : null;

  return {
    currentPeriodStart,
    currentPeriodEnd,
  };
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

  const metadata = session.metadata || {};

  if (metadata.app !== "remoteforge") {
    console.log("[Stripe webhook] Ignored session. app metadata mismatch.");
    return;
  }

  const planRaw = readString(metadata.plan);

  if (!isRemoteForgePlan(planRaw)) {
    console.warn("[Stripe webhook] Unknown RemoteForge plan:", planRaw);
    return;
  }

  const plan: RegularPlan = planRaw;

  if (session.payment_status !== "paid") {
    console.warn(
      "[Stripe webhook] Checkout session is not paid:",
      session.id,
      session.payment_status,
    );
    return;
  }

  const codePrefix: CodePrefix = getCodePrefix(plan);
  const premiumPlan: PremiumPlan = getPremiumPlan(plan);
  const subscriptionStatus: SubscriptionStatus = getSubscriptionStatus(plan);

  const email = getCustomerEmail(session);

  if (!email) {
    console.warn(
      "[Stripe webhook] Checkout completed without customer email:",
      session.id,
    );
  }

  const stripePaymentIntentId = getStripePaymentIntentId(session);
  const stripeSubscriptionId = getStripeSubscriptionId(session);
  const stripeCustomerId = getStripeCustomerId(session);

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

  await adminDb.collection("licenseCodes").doc(license.code).set(
    {
      type: "stripe",
      source: "stripe_regular_pricing",
      offer: "regular",

      plan,
      premiumPlan,
      subscriptionStatus,

      stripeMode: session.mode || "",
      stripePaymentStatus: session.payment_status,
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId,
      stripeSubscriptionId,
      stripeCustomerId,
      stripePriceId:
        readString(metadata.stripePriceId) || readString(metadata.priceId),

      buyerEmail: email,
      email,

      amountTotal: session.amount_total || 0,
      currency: session.currency || "usd",

      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
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
  const { currentPeriodStart, currentPeriodEnd } =
    getSubscriptionPeriodDates(subscription);

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
      subscriptionStatus: isActive
        ? readString(data.subscriptionStatus)
        : "inactive",
      premiumPlan: isActive ? readString(data.premiumPlan) : "none",
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
      stripeWebhookSecret,
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