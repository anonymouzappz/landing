import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

type PlanKey = "monthly" | "yearly" | "lifetime";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

const stripe = new Stripe(stripeSecretKey);

const priceMap: Record<
  PlanKey,
  {
    priceId?: string;
    mode: "subscription" | "payment";
    planName: string;
  }
> = {
  monthly: {
    priceId: process.env.STRIPE_PRICE_MONTHLY,
    mode: "subscription",
    planName: "RemoteForge Monthly Premium",
  },
  yearly: {
    priceId: process.env.STRIPE_PRICE_YEARLY,
    mode: "subscription",
    planName: "RemoteForge Yearly Premium",
  },
  lifetime: {
    priceId: process.env.STRIPE_PRICE_LIFETIME,
    mode: "payment",
    planName: "RemoteForge Lifetime Premium",
  },
};

function isPlanKey(value: unknown): value is PlanKey {
  return value === "monthly" || value === "yearly" || value === "lifetime";
}

function getPremiumPlan(plan: PlanKey): string {
  if (plan === "monthly") return "stripe_monthly";
  if (plan === "yearly") return "stripe_yearly";
  return "stripe_lifetime";
}

function getCodePrefix(plan: PlanKey): string {
  if (plan === "monthly") return "RF-MONTHLY";
  if (plan === "yearly") return "RF-YEARLY";
  return "RF-LIFETIME";
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      plan?: unknown;
      email?: unknown;
      uid?: unknown;
    };

    if (!isPlanKey(body.plan)) {
      return NextResponse.json(
        { error: "Invalid plan selected." },
        { status: 400 },
      );
    }

    const selectedPlan = priceMap[body.plan];

    if (!selectedPlan.priceId) {
      return NextResponse.json(
        { error: `Missing Stripe price ID for ${body.plan}.` },
        { status: 500 },
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
      req.nextUrl.origin;

    const customerEmail =
      typeof body.email === "string" && body.email.includes("@")
        ? body.email.trim()
        : undefined;

    const uid =
      typeof body.uid === "string" && body.uid.trim().length > 0
        ? body.uid.trim()
        : "";

    const session = await stripe.checkout.sessions.create({
      mode: selectedPlan.mode,
      line_items: [
        {
          price: selectedPlan.priceId,
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      client_reference_id: uid || undefined,
      metadata: {
        app: "remoteforge",
        offer: "regular",
        source: "website_pricing",

        plan: body.plan,
        planName: selectedPlan.planName,
        premiumPlan: getPremiumPlan(body.plan),
        subscriptionStatus: body.plan,
        codePrefix: getCodePrefix(body.plan),
        stripePriceId: selectedPlan.priceId,
        uid,
      },
      allow_promotion_codes: true,
      success_url: `${baseUrl}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing?checkout=cancelled`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[stripe_checkout_error]", error);

    return NextResponse.json(
      { error: "Could not start Stripe Checkout." },
      { status: 500 },
    );
  }
}