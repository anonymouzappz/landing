import { Resend } from "resend";

type SendRemoteForgeLicenseEmailInput = {
  to: string;
  code: string;
  plan: string;
};

type SendRemoteForgeLicenseEmailResult = {
  sent: boolean;
  id: string;
  error: string;
};

const resendApiKey = process.env.RESEND_API_KEY;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

function cleanString(value: unknown, fallback = "") {
  return String(value || fallback).trim();
}

function getPlanLabel(plan: string) {
  if (plan === "monthly") return "Monthly Premium";
  if (plan === "yearly") return "Yearly Premium";
  if (plan === "lifetime") return "Lifetime Premium";

  if (plan === "stripe_monthly") return "Monthly Premium";
  if (plan === "stripe_yearly") return "Yearly Premium";
  if (plan === "stripe_lifetime") return "Lifetime Premium";

  return cleanString(plan, "RemoteForge Premium");
}

export async function sendRemoteForgeLicenseEmail({
  to,
  code,
  plan,
}: SendRemoteForgeLicenseEmailInput): Promise<SendRemoteForgeLicenseEmailResult> {
  try {
    const email = cleanString(to).toLowerCase();
    const licenseCode = cleanString(code);
    const planLabel = getPlanLabel(plan);

    if (!email) {
      return {
        sent: false,
        id: "",
        error: "Missing recipient email.",
      };
    }

    if (!licenseCode) {
      return {
        sent: false,
        id: "",
        error: "Missing RemoteForge license code.",
      };
    }

    if (!resend) {
      return {
        sent: false,
        id: "",
        error: "Missing RESEND_API_KEY.",
      };
    }

    const result = await resend.emails.send({
      from:
        process.env.REMOTEFORGE_EMAIL_FROM ||
        "RemoteForge <support@remoteforge.net>",
      to: email,
      subject: "Your RemoteForge Premium Restore Code",
      html: `
        <div style="margin:0;padding:0;background:#050816;color:#ffffff;font-family:Arial,sans-serif;">
          <div style="max-width:640px;margin:0 auto;padding:32px 18px;">
            <div style="border:1px solid rgba(34,211,238,.18);background:rgba(255,255,255,.05);border-radius:28px;padding:28px;">
              <p style="margin:0 0 10px;color:#67e8f9;font-size:12px;font-weight:900;letter-spacing:.22em;text-transform:uppercase;">
                RemoteForge Premium
              </p>

              <h1 style="margin:0;color:#ffffff;font-size:32px;line-height:1.1;font-weight:900;">
                Your RemoteForge code is ready.
              </h1>

              <p style="margin:18px 0 0;color:rgba(255,255,255,.72);font-size:16px;line-height:1.7;">
                Thanks for supporting RemoteForge. Use the restore code below inside the RemoteForge app to activate your ${planLabel}.
              </p>

              <div style="margin:26px 0;padding:20px;border-radius:20px;background:rgba(34,211,238,.10);border:1px solid rgba(34,211,238,.24);text-align:center;">
                <p style="margin:0 0 8px;color:#a5f3fc;font-size:12px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;">
                  Restore Code
                </p>
                <p style="margin:0;color:#ffffff;font-size:28px;font-weight:900;letter-spacing:.08em;word-break:break-word;">
                  ${licenseCode}
                </p>
              </div>

              <div style="margin-top:24px;padding:18px;border-radius:20px;background:rgba(0,0,0,.24);border:1px solid rgba(255,255,255,.08);">
                <p style="margin:0 0 10px;color:#ffffff;font-size:15px;font-weight:900;">
                  How to activate:
                </p>
                <ol style="margin:0;padding-left:20px;color:rgba(255,255,255,.70);font-size:14px;line-height:1.7;">
                  <li>Open the RemoteForge Android app.</li>
                  <li>Sign in or create an account.</li>
                  <li>Go to Premium or Account.</li>
                  <li>Tap Restore with Code.</li>
                  <li>Enter your code to activate Premium.</li>
                </ol>
              </div>

              <p style="margin:24px 0 0;color:rgba(255,255,255,.45);font-size:12px;line-height:1.6;">
                Keep this email for your records. If you need help, contact RemoteForge support.
              </p>
            </div>
          </div>
        </div>
      `,
      text: `Your RemoteForge Premium Restore Code

Plan: ${planLabel}
Code: ${licenseCode}

How to activate:
1. Open the RemoteForge Android app.
2. Sign in or create an account.
3. Go to Premium or Account.
4. Tap Restore with Code.
5. Enter your code to activate Premium.

Keep this email for your records.`,
    });

    return {
      sent: true,
      id: result.data?.id || "",
      error: "",
    };
  } catch (error) {
    return {
      sent: false,
      id: "",
      error:
        error instanceof Error
          ? error.message
          : "Could not send RemoteForge license email.",
    };
  }
}