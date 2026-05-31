"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Download,
  Home,
  MailPlus,
  Megaphone,
  Menu,
  MonitorSmartphone,
  RefreshCw,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Subscribers", href: "/admin/subscribers", icon: MailPlus },
  { label: "Devices", href: "/admin/devices", icon: MonitorSmartphone },
  { label: "Companion", href: "/admin/companion", icon: Download },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Support", href: "/admin/support", icon: Bell },
  { label: "Android Update", href: "/admin/android-update", icon: RefreshCw },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#02030a] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,.16),transparent_40%)]" />

      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl lg:block">
          <Link href="/admin" className="mb-8 block">
            <p className="text-2xl font-black tracking-[-0.04em]">
              Remote<span className="text-cyan-300">Forge</span>
            </p>

            <p className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-white/40">
              Admin Panel
            </p>
          </Link>

          <nav className="grid gap-2">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "group flex min-w-0 items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-bold transition",
                    active
                      ? "border-cyan-300/35 bg-cyan-300/15 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,.12)]"
                      : "border-white/5 bg-white/[0.03] text-white/70 hover:border-cyan-300/25 hover:bg-cyan-300/10 hover:text-cyan-200",
                  ].join(" ")}
                >
                  <Icon
                    className={[
                      "shrink-0 transition",
                      active
                        ? "text-cyan-300"
                        : "text-white/45 group-hover:text-cyan-300",
                    ].join(" ")}
                    size={18}
                  />

                  <span className="truncate">{item.label}</span>

                  {active ? (
                    <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,.75)]" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-3xl border border-emerald-300/15 bg-emerald-300/10 p-4">
            <div className="flex items-center gap-2 text-sm font-black text-emerald-300">
              <ShieldCheck size={17} />
              Owner Access
            </div>

            <p className="mt-2 text-xs font-semibold leading-5 text-white/45">
              This dashboard is locked to your Firebase admin UID only.
            </p>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-white/10 bg-[#02030a]/85 px-4 py-4 backdrop-blur-xl lg:hidden">
            <div className="mb-4 flex items-center justify-between gap-3">
              <Link href="/admin" className="min-w-0">
                <p className="truncate text-xl font-black tracking-[-0.04em]">
                  Remote<span className="text-cyan-300">Forge</span>
                </p>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                  Admin Panel
                </p>
              </Link>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                <Menu className="text-cyan-300" size={22} />
              </div>
            </div>

            <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {nav.map((item) => {
                const Icon = item.icon;
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-black transition",
                      active
                        ? "border-cyan-300/35 bg-cyan-300/15 text-cyan-100"
                        : "border-white/10 bg-white/[0.045] text-white/70 hover:border-cyan-300/25 hover:bg-cyan-300/10 hover:text-cyan-200",
                    ].join(" ")}
                  >
                    <Icon
                      className={active ? "text-cyan-300" : "text-white/45"}
                      size={16}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </header>

          <div className="w-full min-w-0 flex-1 p-4 sm:p-5 lg:p-8">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}