import {
  BrainCircuit,
  MonitorSmartphone,
  Network,
  Shield,
  Sparkles,
  Cpu,
  RadioTower,
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
    title: "Universal Control",
    text: "Control TVs, Windows PCs, streaming apps, keyboards, and future smart devices from one clean remote ecosystem.",
    glow: "from-cyan-400/20 to-blue-500/10",
  },
  {
    Icon: Network,
    title: "Local Network Sync",
    text: "Ultra-fast device discovery and low-latency communication directly over your private WiFi network.",
    glow: "from-blue-500/20 to-violet-500/10",
  },
  {
    Icon: Shield,
    title: "Private + Secure",
    text: "Built with secure pairing, local-first architecture, and privacy-aware communication between devices.",
    glow: "from-emerald-400/20 to-cyan-500/10",
  },
  {
    Icon: BrainCircuit,
    title: "AI Automation",
    text: "Future AI macros, smart scenes, voice commands, automation flows, and intelligent room control.",
    glow: "from-fuchsia-500/20 to-violet-500/10",
  },
];

export default function VisionSection() {
  return (
    <section
      id="vision"
      className="relative overflow-hidden border-y border-cyan-300/10 bg-[#040816] px-5 py-28"
    >
      {/* BACKGROUND FX */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,.14),transparent_32%),radial-gradient(circle_at_85%_75%,rgba(168,85,247,.16),transparent_38%)]" />

      <div className="absolute inset-0 opacity-[0.035]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* TOP */}
        <div className="grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-xl">
              <Sparkles size={15} />
              The Future Of Remote Control
            </div>

            <h2 className="mt-7 text-5xl font-black leading-[0.92] tracking-[-0.06em] text-white md:text-7xl">
              One platform for{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                every screen.
              </span>
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-white/[0.03] p-8 backdrop-blur-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-violet-500/10" />

            <div className="relative">
              <p className="text-lg leading-8 text-white/70">
                RemoteForge is building a next-generation remote ecosystem for
                Roku TVs, Windows PCs, Android TV, Fire TV, smart displays,
                media playback, AI automation, and future connected devices.
              </p>

              <p className="mt-5 text-lg leading-8 text-white/50">
                The MVP begins with Roku and Windows Companion, then expands
                into advanced device syncing, local smart-home control, macros,
                multi-room control, and AI-assisted actions.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Roku TV",
                  "Windows Companion",
                  "Android App",
                  "AI Macros",
                  "Local WiFi",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-cyan-300/10 bg-black/30 px-4 py-3 text-sm font-bold text-cyan-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FEATURE GRID */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ Icon, title, text, glow }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-300/20"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${glow} opacity-0 transition duration-500 group-hover:opacity-100`}
              />

              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/15 bg-black/40 shadow-[0_0_30px_rgba(34,211,238,.15)]">
                  <Icon size={30} className="text-cyan-300" />
                </div>

                <h3 className="mt-6 text-2xl font-black text-white">
                  {title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/60">
                  {text}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-cyan-300">
                  <div className="h-[2px] w-8 rounded-full bg-cyan-300" />
                  RemoteForge Vision
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM STATUS PANEL */}
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {[
            {
              Icon: Cpu,
              title: "Smart Device Engine",
              text: "Built for scalable device integrations and future platform expansion.",
            },
            {
              Icon: RadioTower,
              title: "Low-Latency Communication",
              text: "Fast real-time commands with local discovery and responsive controls.",
            },
            {
              Icon: Sparkles,
              title: "Future AI Experiences",
              text: "Voice scenes, smart routines, intelligent automation, and adaptive controls.",
            },
          ].map(({ Icon, title, text }) => (
            <div
              key={title}
              className="relative overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-black/35 p-6 backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-violet-500/10" />

              <div className="relative flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-400/10">
                  <Icon className="text-cyan-300" size={24} />
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">{title}</h3>

                  <p className="mt-2 text-sm leading-7 text-white/55">
                    {text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}