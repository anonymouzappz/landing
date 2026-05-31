"use client";

import {
  Bug,
  CheckCircle2,
  Lightbulb,
  LifeBuoy,
  MessageSquare,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

const options = [
  { label: "Support", value: "support", icon: LifeBuoy },
  { label: "Feedback", value: "feedback", icon: MessageSquare },
  { label: "Bug", value: "bug", icon: Bug },
  { label: "Feature", value: "feature", icon: Lightbulb },
];

export default function SupportFeedbackFab() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("feedback");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [ok, setOk] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setBusy(true);
    setNotice("");
    setOk(false);

    try {
      const res = await fetch("/api/support-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          name,
          email,
          message,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not send message.");
      }

      setOk(true);
      setNotice(data.message || "Message sent.");
      setMessage("");

      setTimeout(() => {
        setOpen(false);
        setNotice("");
      }, 1400);
    } catch (error) {
      setOk(false);
      setNotice(
        error instanceof Error ? error.message : "Could not send message.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {open ? (
        <div className="fixed inset-0 z-[9998] bg-black/35 backdrop-blur-sm md:hidden" />
      ) : null}

      <div className="fixed bottom-5 right-5 z-[9999]">
        {open ? (
          <div className="mb-4 w-[calc(100vw-2.5rem)] overflow-hidden rounded-[2rem] border border-white/10 bg-[#07101f]/95 p-5 text-white shadow-2xl shadow-black/60 backdrop-blur-2xl md:w-[420px]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">
                  <Sparkles size={13} />
                  RemoteForge
                </p>

                <h3 className="mt-4 text-2xl font-black tracking-tight">
                  Support & Feedback
                </h3>

                <p className="mt-1 text-sm font-semibold leading-6 text-white/50">
                  Send bugs, ideas, questions, or feedback directly to the
                  RemoteForge admin dashboard.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white/70 transition hover:bg-white/15 hover:text-white"
                aria-label="Close support form"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submit} className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {options.map((item) => {
                  const Icon = item.icon;
                  const active = type === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setType(item.value)}
                      className={[
                        "flex items-center gap-2 rounded-2xl border px-3 py-3 text-xs font-black transition",
                        active
                          ? "border-cyan-300/35 bg-cyan-300/15 text-cyan-100"
                          : "border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/10",
                      ].join(" ")}
                    >
                      <Icon size={15} />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-sm font-bold text-white outline-none placeholder:text-white/35 focus:border-cyan-300/40"
                />

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email optional"
                  className="h-12 rounded-2xl border border-white/10 bg-white/10 px-4 text-sm font-bold text-white outline-none placeholder:text-white/35 focus:border-cyan-300/40"
                />
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="Tell us what happened or what you want added..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-semibold leading-6 text-white outline-none placeholder:text-white/35 focus:border-cyan-300/40"
              />

              {notice ? (
                <div
                  className={[
                    "rounded-2xl border p-3 text-sm font-bold",
                    ok
                      ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
                      : "border-amber-300/20 bg-amber-300/10 text-amber-200",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2">
                    {ok ? <CheckCircle2 size={17} /> : null}
                    {notice}
                  </div>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={busy}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 px-5 text-sm font-black text-black transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={17} />
                {busy ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="group flex h-14 items-center gap-3 rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 px-5 font-black text-black shadow-[0_0_45px_rgba(34,211,238,.55)] ring-1 ring-white/20 transition hover:-translate-y-0.5"
          aria-label="Open support and feedback"
        >
          {open ? <X size={21} /> : <MessageSquare size={21} />}
          <span className="hidden sm:inline">Support</span>
        </button>
      </div>
    </>
  );
}