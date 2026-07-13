import { DocumentReference, FieldValue } from "firebase-admin/firestore";

import { adminDb } from "@/src/lib/firebase-admin";

export type RegularPlan = "monthly" | "yearly" | "lifetime";

export type CodePrefix = "RF-MONTHLY" | "RF-YEARLY" | "RF-LIFETIME";

export type PremiumPlan =
  | "stripe_monthly"
  | "stripe_yearly"
  | "stripe_lifetime";

export type SubscriptionStatus = "monthly" | "yearly" | "lifetime";

export type CreateLicenseCodeInput = {
  codePrefix: CodePrefix;
  email: string;
  plan: RegularPlan;
  premiumPlan: PremiumPlan;
  subscriptionStatus: SubscriptionStatus;
  stripeCheckoutSessionId: string;
  stripePaymentIntentId?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  amountTotal?: number | null;
  currency?: string | null;
};

function randomPart(length: number) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  return Array.from({ length }, () => {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }).join("");
}

function makeLicenseCode(prefix: CodePrefix) {
  return `${prefix}-${randomPart(4)}-${randomPart(4)}`;
}

async function createUniqueCode(prefix: CodePrefix): Promise<{
  code: string;
  ref: DocumentReference;
}> {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const code = makeLicenseCode(prefix);
    const ref = adminDb.collection("licenseCodes").doc(code);
    const snap = await ref.get();

    if (!snap.exists) {
      return { code, ref };
    }
  }

  throw new Error("Could not generate unique license code.");
}

export async function findLicenseByCheckoutSession(
  stripeCheckoutSessionId: string,
) {
  const cleanSessionId = stripeCheckoutSessionId.trim();

  if (!cleanSessionId) return null;

  const snap = await adminDb
    .collection("licenseCodes")
    .where("stripeCheckoutSessionId", "==", cleanSessionId)
    .limit(1)
    .get();

  if (snap.empty) return null;

  return snap.docs[0];
}

export async function findLicenseBySubscription(stripeSubscriptionId: string) {
  const cleanSubscriptionId = stripeSubscriptionId.trim();

  if (!cleanSubscriptionId) return null;

  const snap = await adminDb
    .collection("licenseCodes")
    .where("stripeSubscriptionId", "==", cleanSubscriptionId)
    .limit(1)
    .get();

  if (snap.empty) return null;

  return snap.docs[0];
}

export async function createRemoteForgeLicenseCode(
  input: CreateLicenseCodeInput,
) {
  const existing = await findLicenseByCheckoutSession(
    input.stripeCheckoutSessionId,
  );

  if (existing) {
    return {
      code: existing.id,
      created: false,
      data: existing.data(),
    };
  }

  const { code, ref } = await createUniqueCode(input.codePrefix);

  const stripePaymentIntentId = input.stripePaymentIntentId || "";
  const stripeSubscriptionId = input.stripeSubscriptionId || "";
  const stripeCustomerId = input.stripeCustomerId || "";

  const data = {
    code,

    type: "stripe",
    source: "stripe_regular_pricing",
    offer: "regular",

    email: input.email,
    buyerEmail: input.email,

    plan: input.plan,
    premiumPlan: input.premiumPlan,
    subscriptionStatus: input.subscriptionStatus,

    isPremium: true,
    adsDisabled: true,
    isActive: true,

    status: "unused",
    maxUses: 1,
    usedCount: 0,

    isRedeemed: false,
    redeemedByUid: null,
    redeemedAt: null,

    stripeCheckoutSessionId: input.stripeCheckoutSessionId,
    stripePaymentIntentId,
    stripeSubscriptionId,
    stripeCustomerId,
    stripeSubscriptionStatus: stripeSubscriptionId ? "pending" : "",
    stripePaymentStatus: "paid",

    amountTotal: input.amountTotal ?? null,
    currency: input.currency ?? "usd",

    emailSent: false,
    emailSentAt: null,
    emailError: "",
    resendEmailId: "",

    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    expiresAt: null,
  };

  await ref.set(data);

  return {
    code,
    created: true,
    data,
  };
}
