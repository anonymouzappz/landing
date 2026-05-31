import { Resend } from "resend";

type SendSubscriberWelcomeEmailInput = {
  to: string;
  name?: string;
  interests?: {
    testing?: boolean;
    updates?: boolean;
    earlyBird?: boolean;
    premium?: boolean;
  };
};

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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendSubscriberWelcomeEmail({
  to,
  name,
  interests,
}: SendSubscriberWelcomeEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[Subscriber Email] Missing RESEND_API_KEY.");

    return {
      sent: false,
      id: "",
      error: "Missing RESEND_API_KEY",
    };
  }

  if (!to) {
    return {
      sent: false,
      id: "",
      error: "Missing recipient email",
    };
  }

  const resend = new Resend(apiKey);
  const baseUrl = getBaseUrl();
  const displayName = name?.trim()
    ? escapeHtml(name.trim())
    : "RemoteForge Subscriber";

  const tags = [
    interests?.testing ? "Testing instructions" : null,
    interests?.updates ? "Product updates" : null,
    interests?.earlyBird ? "Early-bird updates" : null,
    interests?.premium ? "Premium news" : null,
  ].filter(Boolean) as string[];

  const subject = "You’re on the RemoteForge list";

  const html = `
    <div style="margin:0;padding:0;background:#040816;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
        We have your email and will send RemoteForge testing instructions soon.
      </div>

      <div style="max-width:680px;margin:0 auto;padding:32px 18px;">
        <div style="border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);border-radius:28px;padding:28px;">
          <div style="display:inline-block;padding:8px 12px;border-radius:999px;background:rgba(34,211,238,.12);color:#67e8f9;font-size:12px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;">
            RemoteForge
          </div>

          <h1 style="font-size:34px;line-height:1.05;margin:22px 0 10px;font-weight:900;color:#ffffff;">
            We have your email.
          </h1>

          <p style="font-size:16px;line-height:1.7;color:rgba(255,255,255,.72);margin:0 0 18px;">
            Hey ${displayName}, thanks for subscribing to RemoteForge. You’re now on our update list.
          </p>

          <div style="margin:22px 0;padding:18px;border-radius:20px;background:rgba(34,211,238,.10);border:1px solid rgba(34,211,238,.20);">
            <div style="font-size:13px;color:#67e8f9;font-weight:900;text-transform:uppercase;letter-spacing:.14em;margin-bottom:10px;">
              What happens next
            </div>

            <p style="margin:0;font-size:15px;line-height:1.7;color:rgba(255,255,255,.78);">
              We’ll send you another email with the exact instructions when it’s time to test RemoteForge on Android. That message will include the steps, what to try, and how to send feedback.
            </p>
          </div>

          ${
            tags.length
              ? `
          <div style="margin:22px 0;padding:16px;border-radius:20px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.10);">
            <div style="font-size:13px;color:#67e8f9;font-weight:900;text-transform:uppercase;letter-spacing:.14em;margin-bottom:10px;">
              You signed up for
            </div>
            <div style="color:rgba(255,255,255,.78);font-size:15px;line-height:1.7;">
              ${tags.map((tag) => `• ${tag}`).join("<br />")}
            </div>
          </div>
          `
              : ""
          }

          <p style="font-size:14px;line-height:1.7;color:rgba(255,255,255,.5);margin-top:24px;">
            RemoteForge is building one remote platform for supported TVs, streaming devices, Windows PCs, Home Assistant, Matter-ready smart devices, and future automation.
          </p>

          <div style="margin-top:28px;padding-top:18px;border-top:1px solid rgba(255,255,255,.10);font-size:12px;line-height:1.6;color:rgba(255,255,255,.45);">
            You received this because you subscribed to RemoteForge updates.
            <br />
            <a href="${baseUrl}/unsubscribe?email=${encodeURIComponent(to)}" style="color:#67e8f9;">Unsubscribe</a>
          </div>
        </div>
      </div>
    </div>
  `;

  const text = `
You’re on the RemoteForge list

Hey ${name?.trim() ? name.trim() : "RemoteForge Subscriber"},

Thanks for subscribing to RemoteForge. We have your email and you’re now on our update list.

What happens next:
We’ll send you another email with the exact instructions when it’s time to test RemoteForge on Android. That message will include the steps, what to try, and how to send feedback.

You signed up for:
${tags.length ? tags.map((tag) => `- ${tag}`).join("\n") : "- RemoteForge updates"}

RemoteForge is building one remote platform for supported TVs, streaming devices, Windows PCs, Home Assistant, Matter-ready smart devices, and future automation.

Unsubscribe:
${baseUrl}/unsubscribe?email=${encodeURIComponent(to)}

RemoteForge
  `.trim();

  const { data, error } = await resend.emails.send({
    from: getFromEmail(),
    to,
    subject,
    html,
    text,
  });

  if (error) {
    console.error("[Subscriber Email] Failed:", error);

    return {
      sent: false,
      id: "",
      error: JSON.stringify(error),
    };
  }

  console.log("[Subscriber Email] Sent:", data?.id);

  return {
    sent: true,
    id: data?.id || "",
    error: "",
  };
}