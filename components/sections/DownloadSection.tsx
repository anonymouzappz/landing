import Link from "next/link";
import {
  Download,
  Globe,
  Smartphone,
  Monitor,
  Sparkles,
  ShieldCheck,
  Wifi,
  Cpu,
  ArrowRight,
  Play,
  LockKeyhole,
} from "lucide-react";

export default function DownloadSection() {
  return (
    <section
      id="download"
      className="relative overflow-hidden bg-[#040816] px-5 py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.14),transparent_30%),radial-gradient(circle_at_82%_80%,rgba(168,85,247,.16),transparent_36%)]" />

      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:85px_85px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.8rem] border border-cyan-300/10 bg-black/35 p-8 backdrop-blur-2xl md:p-14">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-violet-500/15" />
          <div className="absolute right-0 top-0 h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative">
            <div className="grid gap-14 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-xl">
                  <Sparkles size={15} />
                  Get RemoteForge
                </div>

                <h2 className="mt-7 text-5xl font-black leading-[0.92] tracking-[-0.06em] text-white md:text-7xl">
                  Download the
                  <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                    connected ecosystem.
                  </span>
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                  Start with the Windows Companion today and prepare for the
                  full Android RemoteForge experience launching soon with Roku,
                  PC, media, and AI-powered device control.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    { Icon: Wifi, label: "Local WiFi Pairing" },
                    { Icon: ShieldCheck, label: "Secure Pairing" },
                    { Icon: Cpu, label: "AI Ready" },
                  ].map(({ Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 rounded-2xl border border-cyan-300/10 bg-black/30 px-4 py-3 text-sm font-bold text-white/75"
                    >
                      <Icon size={17} className="text-cyan-300" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-white/[0.03] p-8 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-violet-500/10" />

                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
                      Platform Status
                    </p>

                    <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                      MVP ACTIVE
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    {[
                      ["Windows Companion", "Protected download with code", true],
                      ["Android Remote App", "Launching after MVP testing", false],
                      ["Web Dashboard", "Future remote management", false],
                    ].map(([title, text, active]) => (
                      <div
                        key={String(title)}
                        className="flex items-start gap-4 rounded-2xl border border-white/5 bg-black/30 p-4"
                      >
                        <div
                          className={`mt-1 h-3 w-3 rounded-full ${
                            active
                              ? "bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,.9)]"
                              : "bg-white/20"
                          }`}
                        />

                        <div>
                          <h4 className="font-black text-white">{title}</h4>
                          <p className="mt-1 text-sm text-white/55">{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-2xl border border-cyan-300/10 bg-cyan-400/5 p-4">
                    <p className="text-sm leading-7 text-white/60">
                      Future updates will expand into Android TV, Fire TV,
                      Samsung, LG, AI macros, smart scenes, and advanced device
                      automation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              <Link
                href="/download"
                className="group relative overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 p-[1px] transition duration-500 hover:-translate-y-1"
              >
                <div className="relative h-full rounded-[2rem] bg-[#06101f] p-7">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,.16),transparent_35%)]" />

                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-500 shadow-[0_0_35px_rgba(34,211,238,.35)]">
                      <LockKeyhole className="text-black" size={30} />
                    </div>

                    <h3 className="mt-6 text-3xl font-black text-white">
                      Windows Companion
                    </h3>

                    <p className="mt-4 text-base leading-8 text-white/65">
                      Unlock the official Windows Companion with your
                      RemoteForge download code after upgrading.
                    </p>

                    <div className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-violet-500 px-5 py-4 font-black text-black shadow-[0_0_35px_rgba(34,211,238,.35)]">
                      Enter Download Code
                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              </Link>

              <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-300/20">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-violet-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/15 bg-black/35 shadow-[0_0_35px_rgba(34,211,238,.16)]">
                    <Smartphone className="text-cyan-300" size={30} />
                  </div>

                  <h3 className="mt-6 text-3xl font-black text-white">
                    Android App
                  </h3>

                  <p className="mt-4 text-base leading-8 text-white/60">
                    The Android RemoteForge app launches soon with Roku TV
                    support, Windows pairing, media controls, touchpad mode, and
                    AI-powered automation features.
                  </p>

                  <div className="mt-7 flex items-center gap-2 rounded-2xl border border-cyan-300/10 bg-black/25 px-5 py-4 text-sm font-bold text-cyan-200">
                    <Play size={18} />
                    Play Store Coming Soon
                  </div>
                </div>
              </div>

              <a
                href="https://app.remoteforge.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-300/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-400/5 opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/15 bg-black/35 shadow-[0_0_35px_rgba(34,211,238,.16)]">
                    <Globe className="text-cyan-300" size={30} />
                  </div>

                  <h3 className="mt-6 text-3xl font-black text-white">
                    Web Dashboard
                  </h3>

                  <p className="mt-4 text-base leading-8 text-white/60">
                    Access the future RemoteForge dashboard for connected device
                    management, room controls, account syncing, and AI-powered
                    remote experiences.
                  </p>

                  <div className="mt-7 inline-flex items-center gap-2 rounded-2xl border border-cyan-300/10 bg-black/25 px-5 py-4 text-sm font-bold text-cyan-200">
                    <Monitor size={18} />
                    Open Web Platform
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}