"use client";

import { MailPlus, Send } from "lucide-react";
import { useState } from "react";

const tagOptions = [
  { label: "Product Updates", value: "updates" },
  { label: "Premium News", value: "premium" },
  { label: "Companion Updates", value: "companion" },
  { label: "Android App", value: "android" },
  { label: "All RemoteForge", value: "remote_forge" },
];

export default function AdminSubscriberCampaignForm() {
  const [tag, setTag] = useState("updates");
  const [limit, setLimit] = useState(100);

  const [subject, setSubject] = useState(
    "RemoteForge is now live on Google Play",
  );

  const [title, setTitle] = useState("RemoteForge is available now");

  const [preheader, setPreheader] = useState(
    "Download RemoteForge on Google Play and stay updated on new features.",
  );

  const [htmlBody, setHtmlBody] = useState(
    "<p>Thanks for subscribing to RemoteForge updates.</p><p>RemoteForge is now live on Google Play. You can download the Android app, connect supported devices, and follow along as we continue improving Windows Companion, smart-home controls, premium features, and future automation tools.</p><p>Download RemoteForge from Google Play and watch your email for product updates.</p>",
  );

  const [textBody, setTextBody] = useState(
    "Thanks for subscribing to RemoteForge updates. RemoteForge is now live on Google Play. You can download the Android app, connect supported devices, and follow along as we continue improving Windows Companion, smart-home controls, premium features, and future automation tools.",
  );

  const [secret, setSecret] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");

  async function sendCampaign(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const cleanSecret = secret.trim();
    const cleanSubject = subject.trim();
    const cleanTitle = title.trim();
    const cleanPreheader = preheader.trim();
    const cleanHtmlBody = htmlBody.trim();
    const cleanTextBody = textBody.trim();
    const safeLimit = Math.min(Math.max(Number(limit) || 1, 1), 500);

    if (!cleanSecret) {
      setResult("Enter the admin campaign secret.");
      return;
    }

    if (!cleanSubject || !cleanTitle || !cleanHtmlBody || !cleanTextBody) {
      setResult("Subject, title, HTML body, and text body are required.");
      return;
    }

    if (!confirm("Send this email campaign now?")) return;

    setBusy(true);
    setResult("");

    try {
      const res = await fetch("/api/admin/email-campaigns/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": cleanSecret,
        },
        body: JSON.stringify({
          tag,
          limit: safeLimit,
          subject: cleanSubject,
          preheader: cleanPreheader,
          title: cleanTitle,
          htmlBody: cleanHtmlBody,
          textBody: cleanTextBody,
        }),
      });

      const data = (await res.json()) as {
        targeted?: number;
        sentCount?: number;
        failedCount?: number;
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data.error || "Campaign failed.");
      }

      setResult(
        `Campaign sent. Targeted: ${data.targeted ?? 0}, Sent: ${
          data.sentCount ?? 0
        }, Failed: ${data.failedCount ?? 0}`,
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
            Sends to subscribers where status is subscribed and the selected tag
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