import { NextRequest, NextResponse } from "next/server";

import { adminAuth, adminDb } from "@/src/lib/firebase-admin";

export const runtime = "nodejs";

const OWNER_UIDS = new Set([
  "eLuUntmJfDeuc2fy6c6BJhT2R4K2",
]);

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function verifyAdmin(adminIdToken: string) {
  if (!adminIdToken) {
    throw new Error("Missing admin token.");
  }

  const decoded = await adminAuth.verifyIdToken(adminIdToken);

  if (!OWNER_UIDS.has(decoded.uid)) {
    throw new Error("Unauthorized.");
  }

  return decoded.uid;
}

export async function POST(req: NextRequest) {
  try {
    const input = await req.json();
    const adminIdToken = cleanString(input.adminIdToken);

    await verifyAdmin(adminIdToken);

    const snap = await adminDb
      .collection("users")
      .orderBy("lastActiveAt", "desc")
      .limit(250)
      .get();

    const users = await Promise.all(
      snap.docs.map(async (doc) => {
        const data = doc.data();

        const isAnonymous = data.isAnonymous === true;
        const email = cleanString(data.email);
        const name =
          cleanString(data.name) ||
          cleanString(data.displayName) ||
          "RemoteForge User";

        if (isAnonymous) return null;
        if (!email) return null;

        const tokensSnap = await doc.ref
          .collection("fcmTokens")
          .where("enabled", "==", true)
          .limit(25)
          .get();

        return {
          uid: doc.id,
          name,
          email,
          photoUrl: cleanString(data.photoUrl || data.photoURL),
          isPremium: data.isPremium === true,
          notificationsEnabled: data.notificationsEnabled !== false,
          tokenCount: tokensSnap.size,
          lastActiveAt:
            typeof data.lastActiveAt?.toDate === "function"
              ? data.lastActiveAt.toDate().toISOString()
              : "",
        };
      }),
    );

    return NextResponse.json({
      ok: true,
      users: users.filter(Boolean),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Could not load users.",
      },
      { status: 500 },
    );
  }
}