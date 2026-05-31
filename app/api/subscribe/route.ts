import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

import { sendSubscriberWelcomeEmail } from "@/src/lib/email/sendSubscriberWelcomeEmail";
import { adminDb } from "@/src/lib/firebase-admin";

export const runtime = "nodejs";

function normalizeEmail(value: unknown) {
  return String(value || "").trim().toLowerCase();
}

function cleanString(value: unknown, max = 200) {
  return String(value || "").trim().slice(0, max);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function subscriberDocId(email: string) {
  return Buffer.from(email).toString("base64url");
}

function buildTags(interests: Record<string, boolean>) {
  const tags = new Set<string>();

  tags.add("remote_forge");

  if (interests.testing) tags.add("testing");
  if (interests.updates) tags.add("updates");
  if (interests.earlyBird) tags.add("early_bird");
  if (interests.premium) tags.add("premium");

  return Array.from(tags);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const email = normalizeEmail(body.email);
    const name = cleanString(body.name, 120);
    const source = cleanString(body.source || "website", 120);

    const interests = {
      testing: body.interests?.testing === true,
      updates: body.interests?.updates !== false,
      earlyBird: body.interests?.earlyBird !== false,
      premium: body.interests?.premium !== false,
    };

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 },
      );
    }

    const ref = adminDb.collection("emailSubscribers").doc(subscriberDocId(email));
    const snap = await ref.get();

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
        subscribedAt: snap.exists ? snap.data()?.subscribedAt || now : now,
        unsubscribedAt: null,
        createdAt: snap.exists ? snap.data()?.createdAt || now : now,
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
        welcomeEmailSentAt: emailResult.sent ? FieldValue.serverTimestamp() : null,
        welcomeEmailError: emailResult.error || "",
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