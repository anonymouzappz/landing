import { adminDb } from "@/src/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";



export const runtime = "nodejs";

type PlanKey = "monthly" | "yearly" | "lifetime";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

const stripe = new Stripe(stripeSecretKey);

function isPlanKey(value: unknown): value is PlanKey {
  return value === "monthly" || value === "yearly" || value === "lifetime";
}

function planPrefix(plan: PlanKey) {
  if (plan === "monthly") return "RF-MONTHLY";
  if (plan === "yearly") return "RF-YEARLY";
  return "RF-LIFETIME";
}

function randomCodePart(length = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let value = "";

  for (let i = 0; i < length; i += 1) {
    value += chars[Math.floor(Math.random() * chars.length)];
  }

  return value;
}

async function createUniqueLicenseCode(plan: PlanKey) {
  for (let i = 0; i < 8; i += 1) {
    const code = `${planPrefix(plan)}-${randomCodePart(8)}`;
    const ref = adminDb.collection("licenseCodes").doc(code);
    const snap = await ref.get();

    if (!snap.exists) {
      return { code, ref };
    }
  }

  throw new Error("Could not generate unique license code.");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      sessionId?: unknown;
    };

    const sessionId =
      typeof body.sessionId === "string" ? body.sessionId.trim() : "";

    if (!sessionId.startsWith("cs_")) {
      return NextResponse.json(
        { error: "Invalid checkout session." },
        { status: 400 },
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription", "customer"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Checkout is not paid yet." },
        { status: 402 },
      );
    }

    if (session.metadata?.app !== "remoteforge") {
      return NextResponse.json(
        { error: "This checkout does not belong to RemoteForge." },
        { status: 400 },
      );
    }

    const plan = session.metadata?.plan;

    if (!isPlanKey(plan)) {
      return NextResponse.json(
        { error: "Missing or invalid RemoteForge plan." },
        { status: 400 },
      );
    }

    const existing = await adminDb
      .collection("licenseCodes")
      .where("stripeCheckoutSessionId", "==", session.id)
      .limit(1)
      .get();

    if (!existing.empty) {
      const doc = existing.docs[0];
      const data = doc.data();

      return NextResponse.json({
        code: data.code || doc.id,
        plan: data.plan || plan,
        status: data.status || "unused",
      });
    }

    const { code, ref } = await createUniqueLicenseCode(plan);

    const now = new Date();

    let stripeSubscriptionId = "";

    if (typeof session.subscription === "string") {
      stripeSubscriptionId = session.subscription;
    } else if (session.subscription?.id) {
      stripeSubscriptionId = session.subscription.id;
    }

    let stripeCustomerId = "";

    if (typeof session.customer === "string") {
      stripeCustomerId = session.customer;
    } else if (session.customer?.id) {
      stripeCustomerId = session.customer.id;
    }

    await ref.set({
      code,
      type: "stripe",
      source: "website_pricing",
      plan,
      planName: session.metadata?.planName || `RemoteForge ${plan}`,
      status: "unused",
      isActive: true,
      maxUses: 1,
      usedCount: 0,

      stripeCheckoutSessionId: session.id,
      stripePaymentStatus: session.payment_status,
      stripeCustomerId,
      stripeSubscriptionId,
      stripeMode: session.mode || "",
      stripeAmountTotal: session.amount_total || 0,
      stripeCurrency: session.currency || "usd",

      buyerEmail:
        session.customer_details?.email ||
        session.customer_email ||
        "",

      uid: session.metadata?.uid || "",
      redeemedByUid: null,
      redeemedAt: null,
      expiresAt: null,

      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      code,
      plan,
      status: "unused",
    });
  } catch (error) {
    console.error("[stripe_license_code_error]", error);

    return NextResponse.json(
      { error: "Could not create RemoteForge license code." },
      { status: 500 },
    );
  }
}