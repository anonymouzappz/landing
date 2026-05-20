"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Smartphone,
  ShieldCheck,
  Wifi,
  Monitor,
  Sparkles,
  CheckCircle2,
  Cpu,
  LockKeyhole,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

export default function DownloadPage() {
  const [code, setCode] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function verifyCode() {
    setLoading(true);
    setMessage("");
    setDownloadUrl("");

    try {
      const res = await fetch("/api/verify-download-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setMessage(data.message || "Invalid download code.");
        return;
      }

      setDownloadUrl(data.downloadUrl);
      setMessage("Code verified. Your download is ready.");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040816] px-5 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,.16),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,.18),transparent_38%)]" />

      <div className="absolute inset-0 opacity-[0.035]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:90px_90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl border border-cyan-300/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-white/65 backdrop-blur-xl transition hover:border-cyan-300/20 hover:text-cyan-200"
        >
          <ArrowLeft size={17} />
          Back home
        </Link>

        <section className="mt-10 grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-cyan-200">
              <Sparkles size={15} />
              Premium Download Access
            </div>

            <h1 className="mt-7 text-5xl font-black leading-[0.92] tracking-[-0.06em] md:text-7xl">
              Unlock the
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Windows Companion.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
              Enter your RemoteForge upgrade code to unlock the Windows
              Companion installer.
            </p>

            <div className="mt-8 rounded-[2rem] border border-cyan-300/10 bg-black/35 p-6 backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <LockKeyhole className="text-cyan-300" size={24} />
                <h2 className="text-2xl font-black">Enter Download Code</h2>
              </div>

              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="RF-XXXX-XXXX-2026"
                className="mt-5 w-full rounded-2xl border border-cyan-300/10 bg-white/[0.04] px-5 py-4 text-lg font-black uppercase tracking-[0.18em] text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/35"
              />

              <button
                onClick={verifyCode}
                disabled={loading}
                className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 px-7 py-5 font-black text-black shadow-[0_0_45px_rgba(34,211,238,.35)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="animate-spin" size={22} /> : <ShieldCheck size={22} />}
                {loading ? "Verifying..." : "Verify Code"}
              </button>

              {message && (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  {downloadUrl ? (
                    <CheckCircle2 className="mt-0.5 text-cyan-300" size={18} />
                  ) : (
                    <AlertTriangle className="mt-0.5 text-violet-300" size={18} />
                  )}
                  <p className="text-sm leading-6 text-white/65">{message}</p>
                </div>
              )}

              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download
                  className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-cyan-300/20 bg-cyan-300 px-7 py-5 font-black text-black shadow-[0_0_45px_rgba(34,211,238,.35)] transition hover:-translate-y-0.5"
                >
                  <Download size={22} />
                  Download Windows Companion
                </a>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Local WiFi", "Secure Pairing", "PC Control", "Media Commands"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-cyan-300/10 bg-black/30 px-4 py-3 text-sm font-bold text-cyan-100"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-cyan-300/10 bg-black/35 p-8 backdrop-blur-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-violet-500/15" />

            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-300 to-violet-500 shadow-[0_0_50px_rgba(34,211,238,.35)]">
                <Monitor className="text-black" size={38} />
              </div>

              <h2 className="mt-7 text-3xl font-black">Companion Installer</h2>

              <p className="mt-4 leading-8 text-white/60">
                Built for the MVP RemoteForge setup: Android remote app +
                Windows Companion + local network commands.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Shows local IP address and port",
                  "Generates secure pairing code",
                  "Supports mouse, keyboard, volume, and media",
                  "Prepared for future AI macros and app launch commands",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.035] px-4 py-4"
                  >
                    <CheckCircle2 className="mt-0.5 text-cyan-300" size={18} />
                    <p className="text-sm leading-6 text-white/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              Icon: Smartphone,
              title: "Android App",
              text: "Play Store link coming soon after MVP testing.",
            },
            {
              Icon: Wifi,
              title: "Local Network",
              text: "Pair and control devices over your trusted WiFi.",
            },
            {
              Icon: ShieldCheck,
              title: "Private Pairing",
              text: "Only pair devices you own or have permission to control.",
            },
          ].map(({ Icon, title, text }) => (
            <div
              key={title}
              className="rounded-[2rem] border border-cyan-300/10 bg-white/[0.03] p-7 backdrop-blur-xl"
            >
              <Icon className="text-cyan-300" size={34} />
              <h3 className="mt-5 text-2xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-white/55">{text}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-[2.5rem] border border-cyan-300/10 bg-black/35 p-8 backdrop-blur-2xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-cyan-300">
                <Cpu size={16} />
                Install Flow
              </div>

              <h2 className="mt-4 text-3xl font-black">
                Verify, download, install, pair.
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              {["Verify", "Download", "Install", "Pair"].map((step, index) => (
                <div
                  key={step}
                  className="rounded-2xl border border-white/5 bg-white/[0.035] px-5 py-4 text-center"
                >
                  <div className="text-sm font-black text-cyan-300">
                    0{index + 1}
                  </div>
                  <div className="mt-1 text-sm font-bold text-white/70">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}