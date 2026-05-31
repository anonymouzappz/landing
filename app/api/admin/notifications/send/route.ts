import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";

import { adminAuth, adminDb } from "@/src/lib/firebase-admin";

export const runtime = "nodejs";

type NotificationTarget = "all" | "premium" | "user";
type NotificationType = "announcement" | "app_update" | "premium" | "support_reply";

type SendNotificationBody = {
  adminIdToken: string;
  title: string;
  body: string;
  type: NotificationType;
  target: NotificationTarget;
  targetUid?: string;
};

const OWNER_UIDS = new Set([
  "eLuUntmJfDeuc2fy6c6BJhT2R4K2",
]);

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function chunkArray<T>(items: T[], size: number) {
  const chunks: T[][] = [];

  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }

  return chunks;
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

async function getTargetUsers(target: NotificationTarget, targetUid: string) {
  if (target === "user") {
    if (!targetUid) {
      throw new Error("Target UID is required.");
    }

    const snap = await adminDb.collection("users").doc(targetUid).get();

    if (!snap.exists) {
      throw new Error("Target user not found.");
    }

    return [snap];
  }

  if (target === "premium") {
    const snap = await adminDb
      .collection("users")
      .where("isPremium", "==", true)
      .get();

    return snap.docs;
  }

  const snap = await adminDb.collection("users").get();
  return snap.docs;
}

async function getEnabledTokensForUsers(userIds: string[]) {
  const tokenRows: {
    uid: string;
    tokenDocId: string;
    token: string;
  }[] = [];

  for (const uid of userIds) {
    const tokensSnap = await adminDb
      .collection("users")
      .doc(uid)
      .collection("fcmTokens")
      .where("enabled", "==", true)
      .get();

    for (const tokenDoc of tokensSnap.docs) {
      const data = tokenDoc.data();
      const token = cleanString(data.token);

      if (!token) continue;

      tokenRows.push({
        uid,
        tokenDocId: tokenDoc.id,
        token,
      });
    }
  }

  return tokenRows;
}

export async function POST(req: NextRequest) {
  try {
    const input = (await req.json()) as SendNotificationBody;

    const adminIdToken = cleanString(input.adminIdToken);
    const title = cleanString(input.title);
    const body = cleanString(input.body);
    const type = cleanString(input.type) as NotificationType;
    const target = cleanString(input.target) as NotificationTarget;
    const targetUid = cleanString(input.targetUid);

    const sentByUid = await verifyAdmin(adminIdToken);

    if (!title || title.length < 3) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 },
      );
    }

    if (!body || body.length < 3) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
    }

    if (!["announcement", "app_update", "premium", "support_reply"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid notification type." },
        { status: 400 },
      );
    }

    if (!["all", "premium", "user"].includes(target)) {
      return NextResponse.json(
        { error: "Invalid target." },
        { status: 400 },
      );
    }

    const users = await getTargetUsers(target, targetUid);
    const userIds = users.map((doc) => doc.id);

    const tokenRows = await getEnabledTokensForUsers(userIds);
    const tokens = [...new Set(tokenRows.map((row) => row.token))];

    const notificationRef = adminDb.collection("notifications").doc();

    await notificationRef.set({
      title,
      body,
      type,
      target,
      targetUid: target === "user" ? targetUid : "",
      sentByUid,
      userCount: userIds.length,
      tokenCount: tokens.length,
      status: "sending",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    if (tokens.length === 0) {
      await notificationRef.set(
        {
          status: "no_tokens",
          successCount: 0,
          failureCount: 0,
          sentAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

      return NextResponse.json({
        ok: true,
        notificationId: notificationRef.id,
        userCount: userIds.length,
        tokenCount: 0,
        successCount: 0,
        failureCount: 0,
        message: "No enabled FCM tokens found.",
      });
    }

    let successCount = 0;
    let failureCount = 0;

    const invalidTokens = new Set<string>();

    const tokenChunks = chunkArray(tokens, 500);

    for (const chunk of tokenChunks) {
      const response = await getMessaging().sendEachForMulticast({
        tokens: chunk,
        notification: {
          title,
          body,
        },
        data: {
          type,
          route:
            type === "app_update"
              ? "/settings"
              : type === "premium"
                ? "/premium"
                : "/home",
          notificationId: notificationRef.id,
        },
        android: {
          priority: "high",
          notification: {
            channelId: "remoteforge_alerts",
            sound: "default",
          },
        },
      });

      successCount += response.successCount;
      failureCount += response.failureCount;

      response.responses.forEach((result, index) => {
        if (result.success) return;

        const code = result.error?.code || "";

        if (
          code.includes("registration-token-not-registered") ||
          code.includes("invalid-registration-token")
        ) {
          invalidTokens.add(chunk[index]);
        }
      });
    }

    if (invalidTokens.size > 0) {
      for (const row of tokenRows) {
        if (!invalidTokens.has(row.token)) continue;

        await adminDb
          .collection("users")
          .doc(row.uid)
          .collection("fcmTokens")
          .doc(row.tokenDocId)
          .set(
            {
              enabled: false,
              disabledReason: "invalid_token",
              updatedAt: FieldValue.serverTimestamp(),
            },
            { merge: true },
          );
      }
    }

    await notificationRef.set(
      {
        status: "sent",
        successCount,
        failureCount,
        invalidTokenCount: invalidTokens.size,
        sentAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return NextResponse.json({
      ok: true,
      notificationId: notificationRef.id,
      userCount: userIds.length,
      tokenCount: tokens.length,
      successCount,
      failureCount,
      invalidTokenCount: invalidTokens.size,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not send notification.",
      },
      { status: 500 },
    );
  }
}