import {
  Computer,
  KeyRound,
  MousePointer2,
  Tv,
  Sparkles,
  Wifi,
  ShieldCheck,
  RadioTower,
  Cpu,
} from "lucide-react";

const steps = [
  {
    Icon: Tv,
    title: "Roku TV Discovery",
    text: "RemoteForge scans your WiFi network for Roku TVs using fast local discovery and automatically loads device information.",
    bullets: [
      "Auto-detect Roku devices on local WiFi",
      "Load device name, model, IP, and software",
      "Send navigation and playback commands",
    ],
    glow: "from-cyan-400/20 to-blue-500/10",
  },
  {
    Icon: Computer,
    title: "Windows Companion",
    text: "The Windows Companion securely pairs your Android device to your PC using a local pairing system.",
    bullets: [
      "Connect using local IP + pairing code",
      "Control media, apps, and desktop actions",
      "Secure pairing before device access",
    ],
    glow: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    Icon: MousePointer2,
    title: "Wireless Touchpad",
    text: "Transform your Android phone into a responsive wireless touchpad with smooth desktop navigation.",
    bullets: [
      "Mouse movement + gestures",
      "Left + right click support",
      "Scroll and precision controls",
    ],
    glow: "from-cyan-400/20 to-emerald-500/10",
  },
  {
    Icon: KeyRound,
    title: "Keyboard + Media",
    text: "Send keyboard shortcuts, typing, media commands, volume controls, and future automation actions.",
    bullets: [
      "Type directly from your phone",
      "Media playback + volume control",
      "Future AI command support",
    ],
    glow: "from-fuchsia-500/20 to-blue-500/10",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how"
      className="relative overflow-hidden bg-[#040816] px-5 py-28"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.12),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(168,85,247,.14),transparent_36%)]" />

      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:90px_90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-xl">
              <Sparkles size={15} />
              How RemoteForge Works
            </div>

            <h2 className="mt-7 text-5xl font-black leading-[0.92] tracking-[-0.06em] text-white md:text-7xl">
              Fast pairing.
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Instant control.
              </span>
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-white/[0.03] p-8 backdrop-blur-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-violet-500/10" />

            <div className="relative">
              <p className="text-lg leading-8 text-white/70">
                RemoteForge uses local WiFi communication to discover compatible
                devices, securely pair with them, and send low-latency commands
                directly from your Android phone.
              </p>

              <p className="mt-5 text-lg leading-8 text-white/50">
                The MVP focuses on Roku TV control and Windows Companion support,
                then expands into smart-home screens, AI macros, automation
                routines, and future universal device integrations.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    Icon: Wifi,
                    label: "Local WiFi Discovery",
                  },
                  {
                    Icon: ShieldCheck,
                    label: "Secure Pairing",
                  },
                  {
                    Icon: RadioTower,
                    label: "Low-Latency Commands",
                  },
                  {
                    Icon: Cpu,
                    label: "Future AI Automation",
                  },
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

        {/* MAIN GRID */}
        <div className="mt-16 grid gap-6 xl:grid-cols-2">
          {steps.map(({ Icon, title, text, bullets, glow }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-300/20"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${glow} opacity-0 transition duration-500 group-hover:opacity-100`}
              />

              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/15 bg-black/35 shadow-[0_0_35px_rgba(34,211,238,.16)]">
                  <Icon className="text-cyan-300" size={30} />
                </div>

                <h3 className="mt-6 text-3xl font-black text-white">
                  {title}
                </h3>

                <p className="mt-4 text-base leading-8 text-white/60">
                  {text}
                </p>

                <div className="mt-7 space-y-3">
                  {bullets.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/25 px-4 py-4"
                    >
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,.9)]" />

                      <p className="text-sm leading-6 text-white/70">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex items-center gap-2 text-sm font-bold text-cyan-300">
                  <div className="h-[2px] w-8 rounded-full bg-cyan-300" />
                  RemoteForge System
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM FLOW */}
        <div className="mt-16 rounded-[2.5rem] border border-cyan-300/10 bg-black/30 p-8 backdrop-blur-2xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {[
              "Discover Devices",
              "Secure Pairing",
              "Control Screens",
              "Future AI Automation",
            ].map((step, index) => (
              <div
                key={step}
                className="flex flex-1 items-center gap-5"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-500 text-lg font-black text-black shadow-[0_0_30px_rgba(34,211,238,.35)]">
                  0{index + 1}
                </div>

                <div>
                  <p className="text-lg font-black text-white">{step}</p>

                  <p className="mt-1 text-sm text-white/50">
                    RemoteForge connected ecosystem
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}