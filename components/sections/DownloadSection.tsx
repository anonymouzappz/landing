import Link from "next/link";
import {
  ArrowRight,
  Download,
  Home,
  Monitor,
  PlayCircle,
  QrCode,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.anonymouzappz.remoteforge&hl=en_US";

export default function DownloadSection() {
  return (
    <section id="download" className="relative px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,.18),transparent_35%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
                <Sparkles size={15} />
                Now Live on Google Play
              </div>

              <h2 className="mt-5 text-4xl font-black tracking-tight text-white md:text-6xl">
                Download RemoteForge and control more from one app.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
                RemoteForge is now available on Google Play. Control supported
                Roku devices, Android TV, Google TV, Fire TV setup, Windows
                Companion, Home Assistant smart-home devices, and Matter setup
                preparation from one powerful remote app.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 px-6 text-sm font-black text-black shadow-[0_0_35px_rgba(34,211,238,.35)] transition hover:-translate-y-0.5"
                >
                  <PlayCircle size={19} />
                  Download on Google Play
                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </a>

                <Link
                  href="/download"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/15"
                >
                  <Download size={18} />
                  Windows Companion
                </Link>
              </div>

              <p className="mt-4 text-sm font-semibold text-white/45">
                RemoteForge is available through Google Play. Some advanced
                features may require Premium. Windows Companion is downloaded
                separately from the RemoteForge website.
              </p>
            </div>

            <div className="grid gap-4">
              <FeatureCard
                icon={Smartphone}
                title="Android Remote App"
                text="Download RemoteForge directly from Google Play."
              />
              <FeatureCard
                icon={Monitor}
                title="Windows Companion"
                text="Pair your PC for touchpad, keyboard, controller, and Fire TV bridge features."
              />
              <FeatureCard
                icon={Home}
                title="Home Assistant Remote"
                text="Control lights, plugs, thermostats, speakers, scenes, sensors, and more."
              />
              <FeatureCard
                icon={QrCode}
                title="Matter Setup Ready"
                text="Matter QR scanning and direct-control preparation are built into the app."
              />
              <FeatureCard
                icon={ShieldCheck}
                title="Secure Local Control"
                text="RemoteForge is designed around local network control, pairing, and user-owned devices."
              />
              <FeatureCard
                icon={Sparkles}
                title="Premium Smart Home"
                text="Unlock unlimited devices, smart-home remotes, Matter features, rooms, and no ads."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
          <Icon size={21} className="text-cyan-300" />
        </div>

        <div>
          <h3 className="font-black text-white">{title}</h3>
          <p className="mt-1 text-sm font-semibold leading-6 text-white/50">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}