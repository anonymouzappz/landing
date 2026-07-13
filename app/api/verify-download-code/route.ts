import { adminDb, adminStorage } from "@/src/lib/firebase-admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function normalizeCode(value: unknown) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/[^A-Z0-9-]/g, "");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cleanCode = normalizeCode(body.code);

    if (!cleanCode) {
      return NextResponse.json(
        { ok: false, message: "Enter your download code." },
        { status: 400 }
      );
    }

    const ref = adminDb.collection("licenseCodes").doc(cleanCode);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json(
        { ok: false, message: "Invalid download code." },
        { status: 404 }
      );
    }

    const data = snap.data();

    if (!data?.active) {
      return NextResponse.json(
        { ok: false, message: "This code is not active." },
        { status: 403 }
      );
    }

    if (data.expiresAt instanceof Timestamp) {
      const expiresAt = data.expiresAt.toDate();

      if (expiresAt.getTime() < Date.now()) {
        return NextResponse.json(
          { ok: false, message: "This download code has expired." },
          { status: 403 }
        );
      }
    }

    const downloadLimit = Number(data.downloadLimit ?? 5);
    const downloadCount = Number(data.downloadCount ?? 0);

    if (downloadCount >= downloadLimit) {
      return NextResponse.json(
        { ok: false, message: "Download limit reached." },
        { status: 403 }
      );
    }

    await ref.update({
      downloadCount: FieldValue.increment(1),
      lastDownloadedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    const file = adminStorage
  .bucket()
  .file("installers/RemoteForgeCompanion.exe");

const [downloadUrl] = await file.getSignedUrl({
  action: "read",
  expires: Date.now() + 1000 * 60 * 10,
  responseDisposition:
    'attachment; filename="RemoteForgeCompanion.exe"',
  responseType: "application/octet-stream",
});

return NextResponse.json({
  ok: true,
  message: "Code verified. Your download is ready.",
  downloadUrl,
  fileName: "RemoteForgeCompanion.exe",
});
  } catch (error) {
    console.error("verify-download-code error:", error);

    return NextResponse.json(
      { ok: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}