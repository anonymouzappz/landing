import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export type EarlyBirdPlan = "monthly" | "yearly" | "lifetime";

type PlanConfig = {
  plan: EarlyBirdPlan;
  priceId: string;
  mode: "payment" | "subscription";
  codePrefix: "RF-MO" | "RF-YR" | "RF-LT";
  premiumPlan: string;
  subscriptionStatus: "monthly" | "yearly" | "lifetime";
};

export function getEarlyBirdPlan(plan: EarlyBirdPlan): PlanConfig {
  if (plan === "monthly") {
    return {
      plan,
      priceId: process.env.STRIPE_EARLY_BIRD_MONTHLY_PRICE_ID!,
      mode: "subscription",
      codePrefix: "RF-MO",
      premiumPlan: "early_bird_monthly",
      subscriptionStatus: "monthly",
    };
  }

  if (plan === "yearly") {
    return {
      plan,
      priceId: process.env.STRIPE_EARLY_BIRD_YEARLY_PRICE_ID!,
      mode: "subscription",
      codePrefix: "RF-YR",
      premiumPlan: "early_bird_yearly",
      subscriptionStatus: "yearly",
    };
  }

  return {
    plan,
    priceId: process.env.STRIPE_EARLY_BIRD_LIFETIME_PRICE_ID!,
    mode: "payment",
    codePrefix: "RF-LT",
    premiumPlan: "early_bird_lifetime",
    subscriptionStatus: "lifetime",
  };
}

export async function createEarlyBirdCheckout(plan: EarlyBirdPlan) {
  const config = getEarlyBirdPlan(plan);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY.");
  }

  if (!config.priceId) {
    throw new Error(`Missing Stripe price ID for ${plan}.`);
  }

  const session = await stripe.checkout.sessions.create({
    mode: config.mode,
    line_items: [
      {
        price: config.priceId,
        quantity: 1,
      },
    ],
    allow_promotion_codes: false,
    billing_address_collection: "auto",
    customer_creation: config.mode === "payment" ? "always" : undefined,
    success_url: `${baseUrl}/early-bird/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/early-bird`,
    metadata: {
      app: "remoteforge",
      offer: "early_bird",
      plan: config.plan,
      premiumPlan: config.premiumPlan,
      subscriptionStatus: config.subscriptionStatus,
      codePrefix: config.codePrefix,
    },
    subscription_data:
      config.mode === "subscription"
        ? {
            metadata: {
              app: "remoteforge",
              offer: "early_bird",
              plan: config.plan,
              premiumPlan: config.premiumPlan,
              subscriptionStatus: config.subscriptionStatus,
              codePrefix: config.codePrefix,
            },
          }
        : undefined,
    payment_intent_data:
      config.mode === "payment"
        ? {
            metadata: {
              app: "remoteforge",
              offer: "early_bird",
              plan: config.plan,
              premiumPlan: config.premiumPlan,
              subscriptionStatus: config.subscriptionStatus,
              codePrefix: config.codePrefix,
            },
          }
        : undefined,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a Checkout URL.");
  }

  return session.url;
}