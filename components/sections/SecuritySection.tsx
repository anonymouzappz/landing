import {
  Fingerprint,
  Home,
  LockKeyhole,
  QrCode,
  Router,
  ScanLine,
  Server,
  ShieldCheck,
  UserCheck,
  Wifi,
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
    text: "RemoteForge focuses on local WiFi communication for supported remotes, smart devices, Windows Companion, and Home Assistant connections.",
    points: [
      "Local WiFi command flow",
      "Fast response for supported devices",
      "Designed for trusted networks",
    ],
    glow: "from-cyan-400/20 to-blue-500/10",
  },
  {
    Icon: UserCheck,
    title: "Account-Gated Saving",
    text: "Guests can explore simple features, but saving devices, syncing rooms, pairing companion tools, and premium smart-home features require login.",
    points: [
      "Guest-safe testing",
      "Saved devices tied to user account",
      "Premium gates for advanced controls",
    ],
    glow: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    Icon: LockKeyhole,
    title: "Pairing Code Protection",
    text: "Windows Companion uses pairing codes so access requires someone near the computer during setup.",
    points: [
      "One-time pairing flow",
      "Physical access verification",
      "Companion access control",
    ],
    glow: "from-emerald-400/20 to-cyan-500/10",
  },
  {
    Icon: Home,
    title: "Home Assistant Bridge",
    text: "Home Assistant access is stored per user and used to load and control only that user’s configured smart-home bridge.",
    points: [
      "User-owned bridge connection",
      "Smart-home devices stay in Home Assistant",
      "RemoteForge acts as a remote layer",
    ],
    glow: "from-blue-500/20 to-cyan-500/10",
  },
  {
    Icon: QrCode,
    title: "Matter QR Setup",
    text: "Matter setup uses QR/manual pairing codes and a native Android channel path for future direct Matter commissioning.",
    points: [
      "QR setup flow",
      "Manual setup code support",
      "Native channel preparation",
    ],
    glow: "from-fuchsia-500/20 to-violet-500/10",
  },
];

export default function SecuritySection() {
  return (
    <section
      id="security"
      className="relative overflow-hidden border-y border-cyan-300/10 bg-[#040816] px-5 py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,.13),transparent_32%),radial-gradient(circle_at_82%_80%,rgba(168,85,247,.15),transparent_38%)]" />

      <div className="absolute inset-0 opacity-[0.035]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:85px_85px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
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
                RemoteForge is designed for your personal devices, trusted
                network, and permission-based control. Local-first control,
                user accounts, pairing codes, and premium gates help keep the
                experience safer and more intentional.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { Icon: Wifi, label: "Local WiFi First" },
                  { Icon: Fingerprint, label: "User-Based Access" },
                  { Icon: ScanLine, label: "QR + Pairing Setup" },
                  { Icon: Server, label: "No Public Remote Tunnel" },
                ].map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <Icon className="h-5 w-5 text-cyan-300" />
                    <span className="text-sm font-black text-white/75">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map(({ Icon, title, text, points, glow }) => (
            <div
              key={title}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${glow}`} />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                  <Icon className="h-6 w-6 text-cyan-300" />
                </div>

                <h3 className="mt-6 text-2xl font-black text-white">
                  {title}
                </h3>

                <p className="mt-3 leading-7 text-white/55">{text}</p>

                <ul className="mt-5 space-y-2">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2 text-sm font-bold text-white/60"
                    >
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}