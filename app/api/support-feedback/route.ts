import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

import { adminDb } from "@/src/lib/firebase-admin";

export const runtime = "nodejs";

function cleanString(value: unknown, max = 2000) {
  return String(value || "").trim().slice(0, max);
}

function normalizeEmail(value: unknown) {
  return String(value || "").trim().toLowerCase().slice(0, 240);
}

function isValidEmail(email: string) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeType(value: unknown) {
  const type = cleanString(value, 40).toLowerCase();

  if (["support", "feedback", "bug", "feature"].includes(type)) {
    return type;
  }

  return "feedback";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const type = normalizeType(body.type);
    const name = cleanString(body.name, 120);
    const email = normalizeEmail(body.email);
    const message = cleanString(body.message, 3000);
    const pageUrl = cleanString(body.pageUrl, 600);
    const userAgent = cleanString(req.headers.get("user-agent"), 800);

    if (!message || message.length < 6) {
      return NextResponse.json(
        { error: "Please enter a little more detail." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address or leave it blank." },
        { status: 400 },
      );
    }

    const ref = adminDb.collection("supportFeedback").doc();

    await ref.set({
      type,
      status: "new",
      name,
      email,
      message,
      pageUrl,
      userAgent,
      source: "website_fab",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      ok: true,
      id: ref.id,
      message: "Thanks! Your message was sent to RemoteForge support.",
    });
  } catch (error) {
    console.error("[support-feedback] failed:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not send message right now.",
      },
      { status: 500 },
    );
  }
}