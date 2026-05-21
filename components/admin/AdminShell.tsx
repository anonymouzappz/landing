import Link from "next/link";
import {
  Bell,
  Download,
  Home,
  Megaphone,
  MonitorSmartphone,
  Settings,
  ShieldCheck,
  Users,
  RefreshCw,
} from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Devices", href: "/admin/devices", icon: MonitorSmartphone },
  { label: "Companion", href: "/admin/companion", icon: Download },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Support", href: "/admin/support", icon: Bell },
  { label: "Android Update", href: "/admin/android-update", icon: RefreshCw },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#02030a] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,.16),transparent_40%)]" />

      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl lg:block">
          <div className="mb-8">
            <p className="text-2xl font-black">
              Remote<span className="text-cyan-300">Forge</span>
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-white/40">
              Admin Panel
            </p>
          </div>

          <nav className="grid gap-2">
            {nav.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm font-bold text-white/70 transition hover:border-cyan-300/25 hover:bg-cyan-300/10 hover:text-cyan-200"
                >
                  <Icon size={18} />
                  {item.label}
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

        <section className="flex-1 p-5 lg:p-8">{children}</section>
      </div>
    </main>
  );
}