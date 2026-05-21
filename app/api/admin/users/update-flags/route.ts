import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";

import { getAdminUser } from "@/src/lib/admin-auth";
import { adminDb } from "@/src/lib/firebase-admin";

type UpdateFlagsBody = {
  uid?: string;
  isPremium?: boolean;
  adsDisabled?: boolean;
};

export async function POST(req: Request) {
  const admin = await getAdminUser();

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body = (await req.json()) as UpdateFlagsBody;

    if (!body.uid || typeof body.uid !== "string") {
      return NextResponse.json(
        { error: "Missing user uid" },
        { status: 400 },
      );
    }

    const updates: Record<string, unknown> = {
      updatedAt: FieldValue.serverTimestamp(),
      updatedByAdminUid: admin.uid,
    };

    if (typeof body.isPremium === "boolean") {
      updates.isPremium = body.isPremium;
    }

    if (typeof body.adsDisabled === "boolean") {
      updates.adsDisabled = body.adsDisabled;
    }

    await adminDb.collection("users").doc(body.uid).set(updates, {
      merge: true,
    });

    return NextResponse.json({
      ok: true,
      uid: body.uid,
    });
  } catch (e) {
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Failed to update user",
      },
      { status: 500 },
    );
  }
}