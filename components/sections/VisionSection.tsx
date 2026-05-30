import {
  BrainCircuit,
  Cpu,
  Home,
  MonitorSmartphone,
  Network,
  RadioTower,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type VisionCard = {
  Icon: LucideIcon;
  title: string;
  text: string;
  glow: string;
};

const cards: VisionCard[] = [
  {
    Icon: MonitorSmartphone,
    title: "Universal Remote Control",
    text: "Control Roku, Android TV, Google TV, Fire TV, Windows PCs, keyboards, touchpads, media, and smart-home devices from one app.",
    glow: "from-cyan-400/20 to-blue-500/10",
  },
  {
    Icon: Home,
    title: "Smart Home Remote",
    text: "Use Home Assistant Bridge to control lights, plugs, thermostats, speakers, scenes, scripts, sensors, fans, covers, and more.",
    glow: "from-emerald-400/20 to-cyan-500/10",
  },
  {
    Icon: RadioTower,
    title: "Matter Direct Future",
    text: "RemoteForge is preparing native Matter setup, QR scanning, and direct control for Matter bulbs, plugs, switches, thermostats, and sensors.",
    glow: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    Icon: Network,
    title: "Local Network Sync",
    text: "Fast device discovery and low-latency control over your trusted WiFi network for supported local devices.",
    glow: "from-blue-500/20 to-violet-500/10",
  },
  {
    Icon: Shield,
    title: "Private + Secure",
    text: "Built around account-gated saving, secure pairing, local-first control, and permission-based access.",
    glow: "from-emerald-400/20 to-cyan-500/10",
  },
  {
    Icon: BrainCircuit,
    title: "AI Automation Ready",
    text: "Future AI macros, smart scenes, room actions, voice commands, automation flows, and intelligent device routines.",
    glow: "from-fuchsia-500/20 to-violet-500/10",
  },
];

export default function VisionSection() {
  return (
    <section
      id="vision"
      className="relative overflow-hidden border-y border-cyan-300/10 bg-[#040816] px-5 py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,.14),transparent_32%),radial-gradient(circle_at_85%_75%,rgba(168,85,247,.16),transparent_38%)]" />

      <div className="absolute inset-0 opacity-[0.035]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-xl">
              <Sparkles size={15} />
              The Future Of Remote Control
            </div>

            <h2 className="mt-7 text-5xl font-black leading-[0.92] tracking-[-0.06em] text-white md:text-7xl">
              One remote for{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                every device.
              </span>
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-white/[0.03] p-8 backdrop-blur-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-violet-500/10" />

            <div className="relative">
              <p className="text-lg leading-8 text-white/70">
                RemoteForge is becoming a next-generation remote ecosystem for
                TVs, streaming devices, Windows PCs, smart-home devices, Home
                Assistant, Matter, and future automation workflows.
              </p>

              <p className="mt-5 text-lg leading-8 text-white/50">
                The MVP now includes Roku, Android TV / Google TV discovery,
                Fire TV setup, Windows Companion, Home Assistant Smart Home
                Remote, and Matter Direct Control preparation.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Roku TV",
                  "Android TV",
                  "Fire TV",
                  "Windows Companion",
                  "Home Assistant",
                  "Matter QR",
                  "Smart Home Remote",
                  "Local WiFi",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-cyan-300/10 bg-black/30 px-4 py-3 text-sm font-black text-white/70"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map(({ Icon, title, text, glow }) => (
            <div
              key={title}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${glow}`}
              />

              <div className="relative">
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                  <Icon className="h-6 w-6 text-cyan-300" />
                </div>

                <h3 className="mt-6 text-2xl font-black text-white">
                  {title}
                </h3>

                <p className="mt-3 leading-7 text-white/55">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          <Stat icon={Cpu} value="Local-first" label="Fast command flow" />
          <Stat icon={Home} value="Smart-home" label="Home Assistant remote" />
          <Stat icon={RadioTower} value="Matter-ready" label="QR setup path" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <Icon className="h-7 w-7 text-cyan-300" />
      <div className="mt-4 text-2xl font-black text-white">{value}</div>
      <div className="mt-1 text-sm font-bold text-white/45">{label}</div>
    </div>
  );
}