import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

import { sendSubscriberWelcomeEmail } from "@/src/lib/email/sendSubscriberWelcomeEmail";
import { adminDb } from "@/src/lib/firebase-admin";

export const runtime = "nodejs";

type SubscriberInterests = {
  updates: boolean;
  premium: boolean;
  companion: boolean;
  android: boolean;
};

function normalizeEmail(value: unknown): string {
  return String(value || "").trim().toLowerCase();
}

function cleanString(value: unknown, max = 200): string {
  return String(value || "").trim().slice(0, max);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function subscriberDocId(email: string): string {
  return Buffer.from(email).toString("base64url");
}

function readBoolean(value: unknown, defaultValue: boolean): boolean {
  if (typeof value === "boolean") return value;
  return defaultValue;
}

function buildInterests(value: unknown): SubscriberInterests {
  const raw =
    value && typeof value === "object"
      ? (value as Record<string, unknown>)
      : {};

  return {
    updates: readBoolean(raw.updates, true),
    premium: readBoolean(raw.premium, true),
    companion: readBoolean(raw.companion, true),
    android: readBoolean(raw.android, true),
  };
}

function buildTags(interests: SubscriberInterests): string[] {
  const tags = new Set<string>();

  tags.add("remote_forge");

  if (interests.updates) tags.add("updates");
  if (interests.premium) tags.add("premium");
  if (interests.companion) tags.add("companion");
  if (interests.android) tags.add("android");

  return Array.from(tags);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      email?: unknown;
      name?: unknown;
      source?: unknown;
      interests?: unknown;
    };

    const email = normalizeEmail(body.email);
    const name = cleanString(body.name, 120);
    const source = cleanString(body.source || "website", 120);
    const interests = buildInterests(body.interests);

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 },
      );
    }

    const ref = adminDb.collection("emailSubscribers").doc(subscriberDocId(email));
    const snap = await ref.get();

    const existing = snap.exists ? snap.data() || {} : {};
    const now = FieldValue.serverTimestamp();
    const tags = buildTags(interests);

    await ref.set(
      {
        email,
        name,
        source,
        status: "subscribed",

        tags,
        interests,

        marketingOptIn: true,
        subscribedAt: existing.subscribedAt || now,
        unsubscribedAt: null,

        createdAt: existing.createdAt || now,
        updatedAt: now,
      },
      { merge: true },
    );

    const emailResult = await sendSubscriberWelcomeEmail({
      to: email,
      name,
      interests,
    });

    await ref.set(
      {
        welcomeEmailSent: emailResult.sent,
        welcomeEmailSentAt: emailResult.sent
          ? FieldValue.serverTimestamp()
          : null,
        welcomeEmailError: emailResult.sent ? "" : emailResult.error || "",
        welcomeResendEmailId: emailResult.id || "",
        lastEmailAt: emailResult.sent ? FieldValue.serverTimestamp() : null,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return NextResponse.json({
      ok: true,
      emailSent: emailResult.sent,
      message: emailResult.sent
        ? snap.exists
          ? "You’re already subscribed. We updated your preferences and sent a confirmation email."
          : "You’re subscribed. Check your email for your RemoteForge confirmation."
        : "You’re subscribed, but the confirmation email could not be sent right now.",
      emailError: emailResult.sent ? "" : emailResult.error,
    });
  } catch (error) {
    console.error("[subscribe] failed:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not subscribe right now.",
      },
      { status: 500 },
    );
  }
}