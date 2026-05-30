import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export type EarlyBirdPlan = "monthly" | "yearly" | "lifetime";

type PlanConfig = {
  plan: EarlyBirdPlan;
  priceId: string;
  mode: "payment" | "subscription";
  codePrefix: "RF-MO" | "RF-YR" | "RF-LT";
  premiumPlan:
    | "early_bird_monthly"
    | "early_bird_yearly"
    | "early_bird_lifetime";
  subscriptionStatus: "monthly" | "yearly" | "lifetime";
};

export function getEarlyBirdPlan(plan: EarlyBirdPlan): PlanConfig {
  if (plan === "monthly") {
    return {
      plan,
      priceId: process.env.STRIPE_EARLY_BIRD_MONTHLY_PRICE_ID || "",
      mode: "subscription",
      codePrefix: "RF-MO",
      premiumPlan: "early_bird_monthly",
      subscriptionStatus: "monthly",
    };
  }

  if (plan === "yearly") {
    return {
      plan,
      priceId: process.env.STRIPE_EARLY_BIRD_YEARLY_PRICE_ID || "",
      mode: "subscription",
      codePrefix: "RF-YR",
      premiumPlan: "early_bird_yearly",
      subscriptionStatus: "yearly",
    };
  }

  return {
    plan,
    priceId: process.env.STRIPE_EARLY_BIRD_LIFETIME_PRICE_ID || "",
    mode: "payment",
    codePrefix: "RF-LT",
    premiumPlan: "early_bird_lifetime",
    subscriptionStatus: "lifetime",
  };
}

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

function requireStripeEnv() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY.");
  }
}

function assertPriceId(plan: EarlyBirdPlan, priceId: string) {
  if (!priceId) {
    throw new Error(`Missing Stripe price ID for ${plan}.`);
  }

  if (!priceId.startsWith("price_")) {
    throw new Error(
      `Invalid Stripe price ID for ${plan}. Expected a price_ ID, got: ${priceId}`,
    );
  }
}

export async function createEarlyBirdCheckout(plan: EarlyBirdPlan) {
  requireStripeEnv();

  const config = getEarlyBirdPlan(plan);
  const baseUrl = getBaseUrl();

  assertPriceId(plan, config.priceId);

  const metadata = {
    app: "remoteforge",
    offer: "early_bird",
    plan: config.plan,
    premiumPlan: config.premiumPlan,
    subscriptionStatus: config.subscriptionStatus,
    codePrefix: config.codePrefix,
  };

  const session = await stripe.checkout.sessions.create({
    mode: config.mode,

    // Important for your live account while Cards are pending/being approved.
    // Once Cards are fully enabled, this is still fine.
    payment_method_types: ["card"],

    line_items: [
      {
        price: config.priceId,
        quantity: 1,
      },
    ],

    automatic_tax: {
      enabled: true,
    },

    allow_promotion_codes: false,
    billing_address_collection: "auto",

    customer_creation: config.mode === "payment" ? "always" : undefined,

    success_url: `${baseUrl}/early-bird/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/#earlybird`,

    metadata,

    subscription_data:
      config.mode === "subscription"
        ? {
            metadata,
          }
        : undefined,

    payment_intent_data:
      config.mode === "payment"
        ? {
            metadata,
          }
        : undefined,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a Checkout URL.");
  }

  return session.url;
}