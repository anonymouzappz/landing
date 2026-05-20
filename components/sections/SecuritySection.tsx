import {
  LockKeyhole,
  Router,
  UserCheck,
  ShieldCheck,
  Fingerprint,
  Wifi,
  ScanLine,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type SecurityCard = {
  Icon: LucideIcon;
  title: string;
  text: string;
  points: string[];
  glow: string;
};

const cards: SecurityCard[] = [
  {
    Icon: Router,
    title: "Local Network First",
    text: "Roku and Windows Companion commands run over your trusted WiFi instead of public remote-control servers.",
    points: [
      "Local WiFi communication",
      "No public remote tunnel required",
      "Fast low-latency command flow",
    ],
    glow: "from-cyan-400/20 to-blue-500/10",
  },
  {
    Icon: UserCheck,
    title: "Account-Gated Pairing",
    text: "Guests can explore simple features, but saving devices and pairing with Windows Companion requires login.",
    points: [
      "Guest-safe testing",
      "Login required for PC pairing",
      "Saved devices tied to user account",
    ],
    glow: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    Icon: LockKeyhole,
    title: "Pairing Code Protection",
    text: "The Windows Companion displays a pairing code so only someone near the computer can approve access.",
    points: [
      "One-time pairing code",
      "Physical access verification",
      "Future QR pairing support",
    ],
    glow: "from-emerald-400/20 to-cyan-500/10",
  },
];

export default function SecuritySection() {
  return (
    <section
      id="security"
      className="relative overflow-hidden border-y border-cyan-300/10 bg-[#040816] px-5 py-28"
    >
      {/* BACKGROUND FX */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,.13),transparent_32%),radial-gradient(circle_at_82%_80%,rgba(168,85,247,.15),transparent_38%)]" />

      <div className="absolute inset-0 opacity-[0.035]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:85px_85px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-xl">
              <ShieldCheck size={16} />
              Privacy &amp; Safety
            </div>

            <h2 className="mt-7 text-5xl font-black leading-[0.92] tracking-[-0.06em] text-white md:text-7xl">
              Built for devices
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                you trust.
              </span>
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-white/[0.03] p-8 backdrop-blur-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-violet-500/10" />

            <div className="relative">
              <p className="text-lg leading-8 text-white/70">
                RemoteForge is designed for your personal devices, your trusted
                network, and permission-based control. The MVP keeps control
                local-first while requiring secure pairing for Windows Companion.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { Icon: Wifi, label: "Local WiFi First" },
                  { Icon: Fingerprint, label: "User-Based Access" },
                  { Icon: ScanLine, label: "Pairing Code Approval" },
                  { Icon: Server, label: "No Public Remote Tunnel" },
                ].map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-2xl border border-cyan-300/10 bg-black/30 px-4 py-4"
                  >
                    <Icon className="text-cyan-300" size={20} />
                    <span className="text-sm font-bold text-white/75">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECURITY CARDS */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {cards.map(({ Icon, title, text, points, glow }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-300/20"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${glow} opacity-0 transition duration-500 group-hover:opacity-100`}
              />

              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/15 bg-black/35 shadow-[0_0_35px_rgba(34,211,238,.16)]">
                  <Icon className="text-cyan-300" size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-black text-white">
                  {title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/60">
                  {text}
                </p>

                <div className="mt-7 space-y-3">
                  {points.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/25 px-4 py-4"
                    >
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,.9)]" />

                      <p className="text-sm leading-6 text-white/70">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECURITY NOTICE */}
        <div className="mt-16 relative overflow-hidden rounded-[2.5rem] border border-cyan-300/10 bg-black/35 p-8 backdrop-blur-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-violet-500/10" />

          <div className="relative grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-400/10 shadow-[0_0_35px_rgba(34,211,238,.16)]">
                <Sparkles className="text-cyan-300" size={28} />
              </div>

              <h3 className="mt-5 text-3xl font-black text-white">
                Permission-based control only.
              </h3>
            </div>

            <p className="text-base leading-8 text-white/60">
              RemoteForge is intended only for devices you own or have permission
              to control. Future versions can add encrypted pairing tokens, QR
              pairing, device approval, session expiration, signed companion
              sessions, and advanced account-level security controls.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}