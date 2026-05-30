"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Cpu,
  Download,
  Menu,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.anonymouzappz.remoteforge";

const navItems = [
  { label: "Vision", href: "#vision" },
  { label: "How It Works", href: "#how" },
  { label: "Security", href: "#security" },
  { label: "Early Bird Pricing", href: "#earlybird" },
  { label: "FAQ", href: "#faq" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setOpen(false);
  }

  function renderNavItem(item: (typeof navItems)[number], mobile = false) {
    const className = mobile
      ? "rounded-2xl border border-white/5 bg-white/[0.035] px-4 py-4 text-sm font-bold text-white/75 transition hover:border-cyan-300/20 hover:bg-cyan-300/10 hover:text-cyan-200"
      : "rounded-xl px-3 py-2 text-sm font-bold text-white/65 transition hover:bg-cyan-300/10 hover:text-cyan-200 xl:px-4";

    if (item.href.startsWith("#")) {
      return (
        <a
          key={item.label}
          href={item.href}
          onClick={closeMenu}
          className={className}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        key={item.label}
        href={item.href}
        onClick={closeMenu}
        className={className}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-cyan-300/10 bg-[#030712]/90 shadow-[0_20px_80px_rgba(0,0,0,.45)] backdrop-blur-2xl"
          : "border-b border-white/5 bg-[#030712]/55 backdrop-blur-xl"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,.14),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,.14),transparent_35%)]" />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-cyan-300/15 bg-black/40 shadow-[0_0_35px_rgba(34,211,238,.18)]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-violet-500/25" />

            <Image
              src="/logo.png"
              alt="RemoteForge Logo"
              width={42}
              height={42}
              className="relative z-10 h-10 w-10 object-contain transition duration-500 group-hover:scale-110"
              priority
            />
          </div>

          <div className="min-w-0 leading-none">
            <div className="truncate text-xl font-black tracking-[-0.04em] text-white sm:text-2xl">
              Remote
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Forge
              </span>
            </div>

            <div className="mt-1 hidden items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300/75 sm:flex">
              <Cpu size={11} />
              Universal Control
            </div>
          </div>
        </Link>

        <div className="hidden min-w-0 items-center rounded-2xl border border-white/10 bg-white/[0.035] px-2 py-2 backdrop-blur-xl lg:flex">
          {navItems.map((item) => renderNavItem(item))}
        </div>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <div className="hidden items-center gap-2 rounded-2xl border border-emerald-400/15 bg-emerald-400/10 px-4 py-2 text-xs font-black text-emerald-300 2xl:flex">
            <ShieldCheck size={15} />
            Secure Pairing
          </div>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 px-4 py-3 text-sm font-black text-cyan-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/15 xl:inline-flex"
          >
            <PlayCircle size={17} />
            Android Test
          </a>

          <a
            href="#download"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 px-5 py-3 text-sm font-black text-black shadow-[0_0_35px_rgba(34,211,238,.35)] transition hover:-translate-y-0.5"
          >
            <Download size={17} />
            Download
          </a>
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/15 bg-white/[0.06] text-white backdrop-blur-xl lg:hidden"
          aria-label="Toggle menu"
          type="button"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        className={`relative overflow-hidden border-t border-cyan-300/10 bg-[#030712]/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open ? "max-h-[820px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-6 pt-3">
          <div className="grid gap-2">
            {navItems.map((item) => renderNavItem(item, true))}
          </div>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 px-5 py-4 text-sm font-black text-cyan-200"
          >
            <PlayCircle size={17} />
            Join Android Test
          </a>

          <a
            href="#download"
            onClick={closeMenu}
            className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 px-5 py-4 text-sm font-black text-black shadow-[0_0_35px_rgba(34,211,238,.35)]"
          >
            <Download size={17} />
            Download RemoteForge
          </a>

          <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-emerald-400/15 bg-emerald-400/10 px-4 py-3 text-xs font-black text-emerald-300">
            <Sparkles size={15} />
            Android Remote + Windows Companion
          </div>
        </div>
      </div>
    </header>
  );
}