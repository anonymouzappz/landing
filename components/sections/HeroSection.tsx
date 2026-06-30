"use client";

import Link from "next/link";
import {
  Download,
  MonitorSmartphone,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Wifi,
} from "lucide-react";

import RemoteForgeWorld from "@/components/three/RemoteForgeWorld";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.anonymouzappz.remoteforge&hl=en_US";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-[#050711] pt-24">
      <RemoteForgeWorld />

      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(5,7,17,.96)_0%,rgba(5,7,17,.78)_38%,rgba(5,7,17,.24)_74%,rgba(5,7,17,.88)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-44 bg-gradient-to-t from-[#050711] to-transparent" />

      <div className="relative z-20 mx-auto flex min-h-[calc(92svh-6rem)] max-w-7xl items-center px-5 py-14">
        <div className="max-w-3xl pb-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-emerald-200">
            <ShieldCheck size={14} />
            Secure local control
          </p>

          <h1 className="mt-7 max-w-3xl text-6xl font-black leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
            RemoteForge
          </h1>

          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/[0.68] sm:text-xl">
            A modern remote platform for supported TVs, streaming devices,
            Windows PCs, smart-home controls, casting, keyboard, mouse, and
            media playback from one polished app.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-6 text-sm font-black text-slate-950 shadow-[0_18px_60px_rgba(34,211,238,.24)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
            >
              <PlayCircle size={18} />
              Google Play
            </a>

            <Link
              href="#download"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/[0.12] bg-white/[0.08] px-6 text-sm font-black text-white backdrop-blur-xl transition hover:border-white/[0.2] hover:bg-white/[0.12]"
            >
              <Download size={18} />
              Windows Companion
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-4 text-sm font-bold text-white/[0.58]">
            <span className="inline-flex items-center gap-2">
              <MonitorSmartphone size={17} className="text-cyan-300" />
              Roku, Android TV, Fire TV
            </span>
            <span className="inline-flex items-center gap-2">
              <Wifi size={17} className="text-emerald-300" />
              Local network pairing
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles size={17} className="text-amber-300" />
              Premium smart controls
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

