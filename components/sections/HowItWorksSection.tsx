import {
  Computer,
  Flame,
  Home,
  KeyRound,
  MousePointer2,
  QrCode,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Tv,
  Wifi,
} from "lucide-react";

const steps = [
  {
    Icon: Tv,
    title: "TV Discovery",
    text: "RemoteForge scans your local network for Roku, Android TV, Google TV, and compatible smart TV devices.",
    bullets: [
      "Auto-detect supported devices on local WiFi",
      "Load friendly names, IP addresses, and ports",
      "Send remote commands through supported local protocols",
    ],
    glow: "from-cyan-400/20 to-blue-500/10",
  },
  {
    Icon: Flame,
    title: "Fire TV Setup",
    text: "Fire TV can connect through direct ADB setup or through the RemoteForge Windows Companion for a more stable bridge.",
    bullets: [
      "Direct Fire TV ADB connection over local WiFi",
      "Windows Companion bridge option",
      "Clear ADB status and setup prompts",
    ],
    glow: "from-orange-400/20 to-red-500/10",
  },
  {
    Icon: Computer,
    title: "Windows Companion",
    text: "The Windows Companion securely pairs your Android device to your PC using local IP and pairing code setup.",
    bullets: [
      "Connect using local IP + pairing code",
      "Touchpad, keyboard, media, and controller tools",
      "Secure pairing before device access",
    ],
    glow: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    Icon: Home,
    title: "Home Assistant Remote",
    text: "Connect your Home Assistant bridge and control smart-home entities from one RemoteForge remote screen.",
    bullets: [
      "Lights, plugs, switches, and fans",
      "Thermostats, speakers, scenes, and scripts",
      "Sensors and smart-home status in one place",
    ],
    glow: "from-emerald-400/20 to-cyan-500/10",
  },
  {
    Icon: QrCode,
    title: "Matter Setup",
    text: "Matter Direct Control preparation adds QR scanning, manual setup code entry, and native Android channel support.",
    bullets: [
      "Scan Matter QR codes",
      "Paste manual setup codes",
      "Prepare devices for direct Matter remote control",
    ],
    glow: "from-fuchsia-500/20 to-violet-500/10",
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

            <p className="mt-6 max-w-xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
              RemoteForge connects your phone to TVs, PCs, smart-home bridges,
              and Matter-ready devices through a clean remote experience.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <MiniStat icon={Wifi} label="Local WiFi" />
              <MiniStat icon={ShieldCheck} label="Secure Pairing" />
              <MiniStat icon={Home} label="Smart Home" />
              <MiniStat icon={RadioTower} label="Matter Ready" />
            </div>
          </div>

          <div className="grid gap-5">
            {steps.map(({ Icon, title, text, bullets, glow }, index) => (
              <div
                key={title}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-6"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${glow}`}
                />

                <div className="relative flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                    <Icon className="h-6 w-6 text-cyan-300" />
                  </div>

                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300/70">
                      Step {index + 1}
                    </div>

                    <h3 className="mt-1 text-xl font-black text-white">
                      {title}
                    </h3>

                    <p className="mt-2 leading-7 text-white/55">{text}</p>

                    <ul className="mt-4 grid gap-2">
                      {bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-2 text-sm font-bold text-white/60"
                        >
                          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
      <Icon className="h-5 w-5 text-cyan-300" />
      <span className="text-sm font-black text-white/70">{label}</span>
    </div>
  );
}