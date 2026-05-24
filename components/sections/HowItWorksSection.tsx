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
  Flame,
  MonitorSmartphone,
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
    Icon: Flame,
    title: "Fire TV Control",
    text: "Fire TV can connect two ways: directly through Fire TV ADB or through the RemoteForge Windows Companion using ADB tools.",
    bullets: [
      "Direct Fire TV ADB connection over local WiFi",
      "Windows Companion ADB connection for advanced setup",
      "Clear setup options for different Fire TV devices",
    ],
    glow: "from-orange-400/20 to-red-500/10",
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
      className="relative overflow-hidden bg-[#040816] px-5 py-20 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,.12),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(168,85,247,.14),transparent_36%)]" />

      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:90px_90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
          <div>
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-200 backdrop-blur-xl sm:text-sm sm:tracking-[0.22em]">
              <Sparkles size={15} />
              How RemoteForge Works
            </div>

            <h2 className="mt-7 text-4xl font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl md:text-7xl">
              Fast pairing.
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Instant control.
              </span>
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-white/[0.03] p-5 backdrop-blur-2xl sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-violet-500/10" />

            <div className="relative">
              <p className="text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                RemoteForge uses local WiFi communication to discover compatible
                devices, securely pair with them, and send low-latency commands
                directly from your Android phone.
              </p>

              <p className="mt-5 text-base leading-7 text-white/50 sm:text-lg sm:leading-8">
                Fire TV control supports two connection paths: direct Fire TV
                ADB over WiFi, or Windows Companion ADB for users who want a
                desktop-assisted setup.
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
                    Icon: Flame,
                    label: "Fire TV ADB Support",
                  },
                  {
                    Icon: Cpu,
                    label: "Companion ADB Tools",
                  },
                ].map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex min-w-0 items-center gap-3 rounded-2xl border border-cyan-300/10 bg-black/30 px-4 py-4"
                  >
                    <Icon className="shrink-0 text-cyan-300" size={20} />

                    <span className="min-w-0 text-sm font-bold text-white/75">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] border border-orange-400/20 bg-orange-400/10 p-5 backdrop-blur-xl sm:mt-16 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-300/20 bg-orange-400/15">
              <Flame className="text-orange-300" size={26} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-200">
                Fire TV Connection Options
              </p>

              <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                Fire TV has 2 ways to connect
              </h3>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
                RemoteForge gives users a clear choice depending on their setup:
                connect directly to the Fire TV with ADB, or connect through the
                Windows Companion when they want desktop-assisted ADB control.
              </p>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                  <div className="flex items-center gap-3">
                    <Tv className="shrink-0 text-orange-300" size={24} />
                    <p className="font-black text-white">Direct Fire TV ADB</p>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-white/60">
                    Connect straight to your Fire TV over your local network
                    using the Fire TV device IP and ADB developer mode.
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-white/50">
                    <p>• No Windows PC required</p>
                    <p>• Uses Fire TV developer ADB mode</p>
                    <p>• Best for quick remote control setup</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                  <div className="flex items-center gap-3">
                    <MonitorSmartphone
                      className="shrink-0 text-violet-300"
                      size={24}
                    />
                    <p className="font-black text-white">
                      Windows Companion ADB
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-white/60">
                    Use the RemoteForge Windows Companion as the bridge for ADB
                    tools, advanced commands, setup help, and stronger desktop
                    control.
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-white/50">
                    <p>• Uses the Windows Companion app</p>
                    <p>• Helpful for advanced ADB control</p>
                    <p>• Best for power users and desktop-assisted setup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
                <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {steps.map(({ Icon, title, text, bullets, glow }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-cyan-300/20 sm:p-8"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${glow} opacity-0 transition duration-500 group-hover:opacity-100`}
              />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/15 bg-black/35 shadow-[0_0_35px_rgba(34,211,238,.16)] sm:h-16 sm:w-16">
                  <Icon className="text-cyan-300" size={28} />
                </div>

                <h3 className="mt-6 text-2xl font-black text-white sm:text-3xl">
                  {title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                  {text}
                </p>

                <div className="mt-7 space-y-3">
                  {bullets.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/25 px-4 py-4"
                    >
                      <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,.9)]" />

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

        <div className="mt-16 rounded-[2rem] border border-cyan-300/10 bg-black/30 p-5 backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              "Discover Devices",
              "Choose Fire TV Method",
              "Secure Pairing",
              "Control Screens",
            ].map((step, index) => (
              <div key={step} className="flex min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-500 text-base font-black text-black shadow-[0_0_30px_rgba(34,211,238,.35)] sm:h-14 sm:w-14 sm:text-lg">
                  0{index + 1}
                </div>

                <div className="min-w-0">
                  <p className="text-base font-black text-white sm:text-lg">
                    {step}
                  </p>

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