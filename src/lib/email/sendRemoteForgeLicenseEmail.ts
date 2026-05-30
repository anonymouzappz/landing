import { Resend } from "resend";

type SendLicenseEmailInput = {
  to: string;
  code: string;
  plan: string;
};

function getFromEmail() {
  return (
    process.env.REMOTEFORGE_FROM_EMAIL ||
    "RemoteForge <noreply@remoteforge.net>"
  );
}

function planLabel(plan: string) {
  if (plan === "monthly") return "Monthly Early Bird";
  if (plan === "yearly") return "Yearly Early Bird";
  if (plan === "lifetime") return "Lifetime Early Bird";
  return "Early Bird Premium";
}

export async function sendRemoteForgeLicenseEmail({
  to,
  code,
  plan,
}: SendLicenseEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[Resend] Missing RESEND_API_KEY.");
    return {
      sent: false,
      error: "Missing RESEND_API_KEY",
      id: "",
    };
  }

  if (!to) {
    console.error("[Resend] Missing recipient email.");
    return {
      sent: false,
      error: "Missing recipient email",
      id: "",
    };
  }

  const resend = new Resend(apiKey);
  const label = planLabel(plan);

  const { data, error } = await resend.emails.send({
    from: getFromEmail(),
    to,
    subject: "Your RemoteForge Early Bird Restore Code",
    html: `
      <div style="margin:0;padding:0;background:#040816;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
        <div style="max-width:640px;margin:0 auto;padding:32px 18px;">
          <div style="border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);border-radius:28px;padding:28px;">
            <div style="display:inline-block;padding:8px 12px;border-radius:999px;background:rgba(34,211,238,.12);color:#67e8f9;font-size:12px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;">
              RemoteForge Early Bird
            </div>

            <h1 style="font-size:34px;line-height:1.05;margin:22px 0 10px;font-weight:900;color:#ffffff;">
              Your restore code is ready.
            </h1>

            <p style="font-size:16px;line-height:1.7;color:rgba(255,255,255,.68);margin:0 0 18px;">
              Thank you for supporting RemoteForge before launch. Your <strong style="color:#ffffff;">${label}</strong> purchase has been confirmed.
            </p>

            <div style="margin:22px 0;padding:20px;border-radius:20px;background:rgba(34,211,238,.12);border:1px solid rgba(34,211,238,.25);text-align:center;">
              <div style="font-size:12px;color:#67e8f9;font-weight:900;text-transform:uppercase;letter-spacing:.18em;margin-bottom:8px;">
                Restore Code
              </div>
              <div style="font-size:28px;line-height:1.2;font-weight:900;letter-spacing:.08em;color:#ffffff;">
                ${code}
              </div>
            </div>

            <h2 style="font-size:20px;margin:24px 0 10px;color:#ffffff;">How to redeem</h2>

            <ol style="padding-left:22px;color:rgba(255,255,255,.72);line-height:1.8;font-size:15px;">
              <li>Open RemoteForge on Android.</li>
              <li>Sign in with your RemoteForge account.</li>
              <li>Go to Premium or Account.</li>
              <li>Tap <strong>Restore with Code</strong>.</li>
              <li>Enter the code above.</li>
            </ol>

            <p style="font-size:14px;line-height:1.7;color:rgba(255,255,255,.5);margin-top:24px;">
              This code unlocks your early-bird Premium access. Keep this email for your records.
            </p>

            <p style="font-size:15px;line-height:1.7;color:rgba(255,255,255,.7);margin-top:24px;">
              Thank you,<br />
              <strong style="color:#ffffff;">RemoteForge</strong>
            </p>
          </div>
        </div>
      </div>
    `,
    text: `
Your RemoteForge Early Bird Restore Code

Thank you for supporting RemoteForge before launch.

Plan: ${label}
Restore code: ${code}

How to redeem:
1. Open RemoteForge on Android.
2. Sign in with your RemoteForge account.
3. Go to Premium or Account.
4. Tap Restore with Code.
5. Enter the code above.

Thank you,
RemoteForge
    `.trim(),
  });

  if (error) {
    console.error("[Resend] Email failed:", error);

    return {
      sent: false,
      error: JSON.stringify(error),
      id: "",
    };
  }

  console.log("[Resend] Email sent:", data?.id);

  return {
    sent: true,
    error: "",
    id: data?.id || "",
  };
}