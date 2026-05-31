"use client";

import { MailPlus, Send } from "lucide-react";
import { useState } from "react";

const tagOptions = [
  { label: "Testing", value: "testing" },
  { label: "Product Updates", value: "updates" },
  { label: "Early Bird", value: "early_bird" },
  { label: "Premium", value: "premium" },
  { label: "All RemoteForge", value: "remote_forge" },
];

export default function AdminSubscriberCampaignForm() {
  const [tag, setTag] = useState("testing");
  const [limit, setLimit] = useState(100);
  const [subject, setSubject] = useState(
    "RemoteForge Android Testing Instructions",
  );
  const [title, setTitle] = useState("RemoteForge testing instructions");
  const [preheader, setPreheader] = useState(
    "Here is what to expect next for RemoteForge testing.",
  );
  const [htmlBody, setHtmlBody] = useState(
    "<p>Thanks for subscribing to RemoteForge testing updates.</p><p>We’re preparing instructions for Android testing. You’ll receive the steps, what to test, and how to send feedback.</p>",
  );
  const [textBody, setTextBody] = useState(
    "Thanks for subscribing to RemoteForge testing updates. We’re preparing instructions for Android testing. You’ll receive the steps, what to test, and how to send feedback.",
  );
  const [secret, setSecret] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");

  async function sendCampaign(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!confirm("Send this email campaign now?")) return;

    setBusy(true);
    setResult("");

    try {
      const res = await fetch("/api/admin/email-campaigns/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({
          tag,
          limit,
          subject,
          preheader,
          title,
          htmlBody,
          textBody,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Campaign failed.");
      }

      setResult(
        `Campaign sent. Targeted: ${data.targeted}, Sent: ${data.sentCount}, Failed: ${data.failedCount}`,
      );
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Campaign failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
          <MailPlus className="h-6 w-6 text-cyan-300" />
        </div>

        <div>
          <h2 className="text-2xl font-black">Send Email Campaign</h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-white/45">
            Sends to subscribers where status is subscribed and selected tag
            matches. Unsubscribed users are skipped.
          </p>
        </div>
      </div>

      <form onSubmit={sendCampaign} className="mt-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-xs font-black uppercase tracking-wider text-white/40">
              Tag
            </span>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm font-bold text-white outline-none"
            >
              {tagOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-black uppercase tracking-wider text-white/40">
              Limit
            </span>
            <input
              type="number"
              min={1}
              max={500}
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm font-bold text-white outline-none"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-black uppercase tracking-wider text-white/40">
            Subject
          </span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm font-bold text-white outline-none"
          />
        </label>

        <label className="block">
          <span className="text-xs font-black uppercase tracking-wider text-white/40">
            Preheader
          </span>
          <input
            value={preheader}
            onChange={(e) => setPreheader(e.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm font-bold text-white outline-none"
          />
        </label>

        <label className="block">
          <span className="text-xs font-black uppercase tracking-wider text-white/40">
            Email Title
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm font-bold text-white outline-none"
          />
        </label>

        <label className="block">
          <span className="text-xs font-black uppercase tracking-wider text-white/40">
            HTML Body
          </span>
          <textarea
            value={htmlBody}
            onChange={(e) => setHtmlBody(e.target.value)}
            rows={8}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-semibold leading-6 text-white outline-none"
          />
        </label>

        <label className="block">
          <span className="text-xs font-black uppercase tracking-wider text-white/40">
            Text Body
          </span>
          <textarea
            value={textBody}
            onChange={(e) => setTextBody(e.target.value)}
            rows={5}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-semibold leading-6 text-white outline-none"
          />
        </label>

        <label className="block">
          <span className="text-xs font-black uppercase tracking-wider text-white/40">
            Admin Campaign Secret
          </span>
          <input
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            type="password"
            className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm font-bold text-white outline-none"
            placeholder="ADMIN_CAMPAIGN_SECRET"
          />
        </label>

        {result ? (
          <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4 text-sm font-bold text-cyan-100">
            {result}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 px-5 text-sm font-black text-black transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={17} />
          {busy ? "Sending..." : "Send Campaign"}
        </button>
      </form>
    </section>
  );
}