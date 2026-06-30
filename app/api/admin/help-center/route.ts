import { randomUUID } from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { getAdminUser } from "@/src/lib/admin-auth";
import { adminDb, adminStorage } from "@/src/lib/firebase-admin";

export const runtime = "nodejs";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readInt(formData: FormData, key: string, fallback: number) {
  const value = Number.parseInt(readString(formData, key), 10);
  return Number.isFinite(value) ? value : fallback;
}

function readTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function safeFileName(value: string) {
  return (value || "help-video.mp4")
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function isUploadedFile(value: FormDataEntryValue | null): value is File {
  return (
    typeof value === "object" &&
    value !== null &&
    "arrayBuffer" in value &&
    "size" in value &&
    "name" in value
  );
}

export async function POST(request: Request) {
  const admin = await getAdminUser();

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const title = readString(formData, "title");
  const summary = readString(formData, "summary");
  const body = readString(formData, "body");

  if (!title || !summary || !body) {
    return NextResponse.json(
      { error: "Title, summary, and body are required." },
      { status: 400 },
    );
  }

  const id = slugify(readString(formData, "id") || title);

  if (!id) {
    return NextResponse.json(
      { error: "Could not create a valid article slug." },
      { status: 400 },
    );
  }

  const file = formData.get("video");
  let videoUrl = "";
  let videoStoragePath = "";
  let videoFileName = "";
  let videoContentType = "";

  if (isUploadedFile(file) && file.size > 0) {
    if (file.size > 300 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Video must be 300 MB or smaller." },
        { status: 400 },
      );
    }

    if (file.type && !file.type.startsWith("video/")) {
      return NextResponse.json(
        { error: "Only video files can be uploaded." },
        { status: 400 },
      );
    }

    const bucket = adminStorage.bucket();
    const token = randomUUID();
    const bytes = Buffer.from(await file.arrayBuffer());
    videoFileName = safeFileName(file.name);
    videoContentType = file.type || "video/mp4";
    videoStoragePath = `help-center/videos/${id}/${Date.now()}-${videoFileName}`;

    await bucket.file(videoStoragePath).save(bytes, {
      resumable: false,
      metadata: {
        contentType: videoContentType,
        metadata: {
          firebaseStorageDownloadTokens: token,
        },
      },
    });

    videoUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
      videoStoragePath,
    )}?alt=media&token=${token}`;
  }

  const docRef = adminDb.collection("helpArticles").doc(id);
  const existing = await docRef.get();
  const payload: Record<string, unknown> = {
    title,
    category: readString(formData, "category") || "General",
    summary,
    body,
    tags: readTags(readString(formData, "tags")),
    isActive: formData.get("isActive") === "on",
    sortOrder: readInt(formData, "sortOrder", 999),
    updatedAt: FieldValue.serverTimestamp(),
    updatedByAdminUid: admin.uid,
  };

  if (!existing.exists) {
    payload.createdAt = FieldValue.serverTimestamp();
  }

  const videoTitle = readString(formData, "videoTitle");
  if (videoTitle) payload.videoTitle = videoTitle;

  if (videoUrl) {
    payload.videoUrl = videoUrl;
    payload.videoFileName = videoFileName;
    payload.videoStoragePath = videoStoragePath;
    payload.videoContentType = videoContentType;
  }

  await docRef.set(payload, { merge: true });

  revalidatePath("/admin/help-center");

  return NextResponse.json({ ok: true, id });
}

