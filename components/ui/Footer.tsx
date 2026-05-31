import Link from "next/link";
import {
  Download,
  ShieldCheck,
  Sparkles,
  Globe,
  PlayCircle,
} from "lucide-react";
import SubscriberForm from "../SubscriberForm";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.anonymouzappz.remoteforge";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cyan-300/10 bg-[#02040b] px-5 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,.10),transparent_28%),radial-gradient(circle_at_85%_80%,rgba(168,85,247,.12),transparent_35%)]" />

      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:90px_90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <p className="text-2xl font-black tracking-[-0.04em]">
              Remote
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Forge
              </span>
            </p>

            <p className="mt-2 text-xs font-black uppercase tracking-[0.28em] text-cyan-300/70">
              One App. Every Remote.
            </p>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/60">
              RemoteForge is building a universal remote-control ecosystem for
              Roku TVs, Android TV, Google TV, Fire TV, Windows PCs, Home
              Assistant, Matter-ready smart devices, media systems, and future
              AI-powered automation.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-cyan-300/10 bg-cyan-400/5 px-4 py-3 text-sm font-bold text-cyan-200">
                <ShieldCheck size={17} />
                Local WiFi Pairing
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-violet-400/10 bg-violet-400/5 px-4 py-3 text-sm font-bold text-violet-200">
                <Sparkles size={17} />
                AI Ready Platform
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-white/[0.03] p-6 backdrop-blur-2xl md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-violet-500/10" />

            <div className="relative">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
                Android Testing
              </p>

              <h3 className="mt-4 text-3xl font-black leading-tight text-white">
                Test RemoteForge on Android.
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/60">
                Join the Google Play testing release and subscribe for tester
                instructions, launch updates, premium news, and RemoteForge
                announcements.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 px-6 py-4 font-black text-black shadow-[0_0_35px_rgba(34,211,238,.35)] transition hover:-translate-y-0.5"
                >
                  <PlayCircle size={18} />
                  Join Android Test
                </a>

                <a
                  href="/downloads/RemoteForgeCompanionSetup.exe"
                  download="RemoteForgeCompanionSetup.exe"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 font-black text-white transition hover:bg-white/15"
                >
                  <Download size={18} />
                  Companion
                </a>
              </div>

              <SubscriberForm source="footer_android_testing" />
            </div>
          </div>
        </div>

        <div className="my-10 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-white/45">
              © 2026 RemoteForge. All rights reserved.
            </p>

            <a
              href="https://anonymouzappz.net"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 transition hover:text-cyan-200"
            >
              <Globe size={16} />
              Development by: AnonymouzAppz.net
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-cyan-300/10 bg-cyan-400/5 px-5 py-3 text-sm font-bold text-cyan-200 transition hover:border-cyan-300/20 hover:bg-cyan-400/10"
            >
              Android Test
            </a>

            <Link
              href="/privacy"
              className="rounded-2xl border border-white/5 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white/60 transition hover:border-cyan-300/15 hover:bg-cyan-400/5 hover:text-cyan-200"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="rounded-2xl border border-white/5 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white/60 transition hover:border-cyan-300/15 hover:bg-cyan-400/5 hover:text-cyan-200"
            >
              Terms of Service
            </Link>

            <a
              href="/downloads/RemoteForgeCompanionSetup.exe"
              download="RemoteForgeCompanionSetup.exe"
              className="rounded-2xl border border-white/5 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white/60 transition hover:border-cyan-300/15 hover:bg-cyan-400/5 hover:text-cyan-200"
            >
              Windows Companion
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}