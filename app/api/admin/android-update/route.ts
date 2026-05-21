import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";

import { getAdminUser } from "@/src/lib/admin-auth";
import { adminDb } from "@/src/lib/firebase-admin";

type AndroidUpdateBody = {
  latestVersionCode?: number;
  latestVersionName?: string;
  minimumRequiredVersionCode?: number;
  forceUpdate?: boolean;
  updateTitle?: string;
  updateMessage?: string;
  playStoreUrl?: string;
};

export async function POST(req: Request) {
  const admin = await getAdminUser();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as AndroidUpdateBody;

    const latestVersionCode = Number(body.latestVersionCode || 0);
    const minimumRequiredVersionCode = Number(
      body.minimumRequiredVersionCode || 0,
    );

    if (latestVersionCode <= 0) {
      return NextResponse.json(
        { error: "Latest version code must be greater than 0." },
        { status: 400 },
      );
    }

    if (minimumRequiredVersionCode < 0) {
      return NextResponse.json(
        { error: "Minimum required version code is invalid." },
        { status: 400 },
      );
    }

    await adminDb.collection("appConfig").doc("androidUpdate").set(
      {
        latestVersionCode,
        latestVersionName: body.latestVersionName || "",
        minimumRequiredVersionCode,
        forceUpdate: body.forceUpdate === true,
        updateTitle: body.updateTitle || "RemoteForge update available",
        updateMessage:
          body.updateMessage ||
          "Update RemoteForge to get the latest fixes and improvements.",
        playStoreUrl: body.playStoreUrl || "",
        updatedAt: FieldValue.serverTimestamp(),
        updatedByAdminUid: admin.uid,
      },
      { merge: true },
    );

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      {
        error:
          e instanceof Error ? e.message : "Failed to update Android settings",
      },
      { status: 500 },
    );
  }
}