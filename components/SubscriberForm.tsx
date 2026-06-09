"use client";

import { Mail, Sparkles } from "lucide-react";
import { useState } from "react";

type SubscriberFormProps = {
  source?: string;
  compact?: boolean;
};

export default function SubscriberForm({
  source = "footer",
  compact = false,
}: SubscriberFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [updates, setUpdates] = useState(true);
  const [premium, setPremium] = useState(true);
  const [companion, setCompanion] = useState(true);

  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setOk(false);
      setMessage("Enter your email address.");
      return;
    }

    setBusy(true);
    setMessage("");
    setOk(false);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          source,
          interests: {
            updates,
            premium,
            companion,
            android: true,
          },
        }),
      });

      const data = (await res.json()) as {
        message?: string;
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data.error || "Could not subscribe.");
      }

      setOk(true);
      setMessage(
        data.message ||
          "You’re subscribed. Watch your email for RemoteForge updates.",
      );
      setName("");
      setEmail("");
    } catch (error) {
      setOk(false);
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className={[
        "rounded-[1.5rem] border border-cyan-300/10 bg-black/25 p-4",
        compact ? "" : "mt-6",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
          <Sparkles className="h-5 w-5 text-cyan-300" />
        </div>

        <div>
          <h4 className="font-black text-white">
            Subscribe for RemoteForge updates
          </h4>
          <p className="mt-1 text-sm font-semibold leading-6 text-white/55">
            Get app updates, premium feature news, Windows Companion releases,
            smart-home improvements, and RemoteForge announcements.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[0.85fr_1.15fr_auto]">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          autoComplete="name"
          className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-sm font-bold text-white outline-none placeholder:text-white/35 focus:border-cyan-300/40"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="Email address"
          autoComplete="email"
          className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-sm font-bold text-white outline-none placeholder:text-white/35 focus:border-cyan-300/40"
        />

        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 px-5 text-sm font-black text-black transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Mail size={17} />
          {busy ? "Saving..." : "Subscribe"}
        </button>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-xs font-bold text-white/65">
          <input
            type="checkbox"
            checked={updates}
            onChange={(e) => setUpdates(e.target.checked)}
          />
          Product updates
        </label>

        <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-xs font-bold text-white/65">
          <input
            type="checkbox"
            checked={premium}
            onChange={(e) => setPremium(e.target.checked)}
          />
          Premium news
        </label>

        <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-xs font-bold text-white/65">
          <input
            type="checkbox"
            checked={companion}
            onChange={(e) => setCompanion(e.target.checked)}
          />
          Companion updates
        </label>
      </div>

      {message ? (
        <p
          className={[
            "mt-3 text-sm font-bold",
            ok ? "text-emerald-300" : "text-amber-300",
          ].join(" ")}
        >
          {message}
        </p>
      ) : null}

      <p className="mt-3 text-xs font-semibold leading-5 text-white/35">
        No spam. You can unsubscribe anytime from RemoteForge emails.
      </p>
    </form>
  );
}