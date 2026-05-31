import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { adminDb } from "@/src/lib/firebase-admin";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://remoteforge.net").replace(
    /\/$/,
    "",
  );
}

function getFromEmail() {
  return (
    process.env.REMOTEFORGE_FROM_EMAIL ||
    "RemoteForge <noreply@remoteforge.net>"
  );
}

function requireAdmin(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  return Boolean(
    process.env.ADMIN_CAMPAIGN_SECRET &&
      secret &&
      secret === process.env.ADMIN_CAMPAIGN_SECRET,
  );
}

function clean(value: unknown, max = 5000) {
  return String(value || "").trim().slice(0, max);
}

export async function POST(req: NextRequest) {
  try {
    if (!requireAdmin(req)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();

    const subject = clean(body.subject, 180);
    const preheader = clean(body.preheader, 300);
    const title = clean(body.title, 180);
    const htmlBody = clean(body.htmlBody, 10000);
    const textBody = clean(body.textBody, 10000);
    const tag = clean(body.tag || "testing", 80);
    const limit = Math.min(Number(body.limit || 250), 500);

    if (!subject || !title || !htmlBody) {
      return NextResponse.json(
        { error: "subject, title, and htmlBody are required." },
        { status: 400 },
      );
    }

    const subscribersSnap = await adminDb
      .collection("emailSubscribers")
      .where("status", "==", "subscribed")
      .where("tags", "array-contains", tag)
      .limit(limit)
      .get();

    const campaignRef = adminDb.collection("emailCampaigns").doc();

    await campaignRef.set({
      subject,
      preheader,
      title,
      htmlBody,
      textBody,
      tag,
      limit,
      status: "sending",
      totalTargeted: subscribersSnap.size,
      sentCount: 0,
      failedCount: 0,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    let sentCount = 0;
    let failedCount = 0;

    for (const doc of subscribersSnap.docs) {
      const sub = doc.data();
      const email = String(sub.email || "").trim().toLowerCase();

      if (!email) continue;

      const unsubscribeUrl = `${getBaseUrl()}/unsubscribe?email=${encodeURIComponent(
        email,
      )}`;

      const html = `
        <div style="margin:0;padding:0;background:#040816;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
          <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
            ${preheader}
          </div>

          <div style="max-width:680px;margin:0 auto;padding:32px 18px;">
            <div style="border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);border-radius:28px;padding:28px;">
              <div style="display:inline-block;padding:8px 12px;border-radius:999px;background:rgba(34,211,238,.12);color:#67e8f9;font-size:12px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;">
                RemoteForge
              </div>

              <h1 style="font-size:32px;line-height:1.08;margin:22px 0 12px;font-weight:900;color:#ffffff;">
                ${title}
              </h1>

              <div style="font-size:16px;line-height:1.7;color:rgba(255,255,255,.72);">
                ${htmlBody}
              </div>

              <div style="margin-top:28px;padding-top:18px;border-top:1px solid rgba(255,255,255,.10);font-size:12px;line-height:1.6;color:rgba(255,255,255,.45);">
                You received this because you subscribed to RemoteForge updates.
                <br />
                <a href="${unsubscribeUrl}" style="color:#67e8f9;">Unsubscribe</a>
              </div>
            </div>
          </div>
        </div>
      `;

      try {
        const result = await resend.emails.send({
          from: getFromEmail(),
          to: email,
          subject,
          html,
          text:
            textBody ||
            `${title}\n\n${htmlBody.replace(/<[^>]+>/g, "")}\n\nUnsubscribe: ${unsubscribeUrl}`,
        });

        await campaignRef.collection("recipients").doc(doc.id).set({
          email,
          subscriberId: doc.id,
          status: "sent",
          resendEmailId: result.data?.id || "",
          sentAt: FieldValue.serverTimestamp(),
        });

        sentCount++;
      } catch (error) {
        failedCount++;

        await campaignRef.collection("recipients").doc(doc.id).set({
          email,
          subscriberId: doc.id,
          status: "failed",
          error: error instanceof Error ? error.message : String(error),
          failedAt: FieldValue.serverTimestamp(),
        });
      }
    }

    await campaignRef.set(
      {
        status: "complete",
        sentCount,
        failedCount,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    return NextResponse.json({
      ok: true,
      campaignId: campaignRef.id,
      targeted: subscribersSnap.size,
      sentCount,
      failedCount,
    });
  } catch (error) {
    console.error("[email-campaigns/send] failed:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not send campaign.",
      },
      { status: 500 },
    );
  }
}