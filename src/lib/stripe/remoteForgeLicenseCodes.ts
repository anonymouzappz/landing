import { DocumentReference, FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/src/lib/firebase-admin";

type CodePrefix = "RF-MO" | "RF-YR" | "RF-LT";

export type CreateLicenseCodeInput = {
  codePrefix: CodePrefix;
  email: string;
  plan: "monthly" | "yearly" | "lifetime";
  premiumPlan:
    | "early_bird_monthly"
    | "early_bird_yearly"
    | "early_bird_lifetime";
  subscriptionStatus: "monthly" | "yearly" | "lifetime";
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
  for (let attempt = 0; attempt < 12; attempt++) {
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
  const snap = await adminDb
    .collection("licenseCodes")
    .where("stripeCheckoutSessionId", "==", stripeCheckoutSessionId)
    .limit(1)
    .get();

  if (snap.empty) return null;

  return snap.docs[0];
}

export async function findLicenseBySubscription(stripeSubscriptionId: string) {
  const snap = await adminDb
    .collection("licenseCodes")
    .where("stripeSubscriptionId", "==", stripeSubscriptionId)
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

  const data = {
    code,
    type: input.premiumPlan,
    source: "stripe",
    email: input.email,
    plan: input.plan,
    premiumPlan: input.premiumPlan,
    subscriptionStatus: input.subscriptionStatus,

    isPremium: true,
    adsDisabled: true,

    isRedeemed: false,
    redeemedByUid: null,
    redeemedAt: null,

    stripeCheckoutSessionId: input.stripeCheckoutSessionId,
    stripePaymentIntentId: input.stripePaymentIntentId || "",
    stripeSubscriptionId: input.stripeSubscriptionId || "",
    stripeCustomerId: input.stripeCustomerId || "",

    amountTotal: input.amountTotal ?? null,
    currency: input.currency ?? null,

    isActive: true,
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