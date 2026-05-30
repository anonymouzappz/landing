import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Do I need an account to use RemoteForge?",
    a: "You can try basic features first. An account is required to save devices, sync rooms, connect Home Assistant, pair Windows Companion, and unlock premium features.",
  },
  {
    q: "What devices does RemoteForge support?",
    a: "RemoteForge supports Roku TV discovery, Android TV / Google TV scanning, Fire TV setup, Windows Companion pairing, Home Assistant Bridge, and Matter Direct Control preparation.",
  },
  {
    q: "What is the Home Assistant Remote?",
    a: "The Home Assistant Remote lets you control lights, plugs, switches, thermostats, speakers, scenes, scripts, sensors, fans, covers, and other Home Assistant entities from one RemoteForge screen.",
  },
  {
    q: "Does RemoteForge support AiDot bulbs?",
    a: "AiDot bulbs can be controlled through Home Assistant when they are added to Home Assistant as lights. RemoteForge is also preparing Matter Direct Control for compatible Matter devices.",
  },
  {
    q: "What is Matter Direct Control?",
    a: "Matter Direct Control is RemoteForge's long-term smart-home path for Matter bulbs, plugs, switches, thermostats, sensors, fans, and more. The app now includes Matter setup UI, QR scanning, and native channel preparation.",
  },
  {
    q: "What is RemoteForge Companion?",
    a: "RemoteForge Companion is the Windows app that lets your phone control mouse, keyboard, touchpad, media, controller-style actions, and Fire TV bridge features through your local network.",
  },
  {
    q: "Is control local or cloud-based?",
    a: "RemoteForge is designed around local network control for fast response. Your phone and device should usually be on the same WiFi network. Home Assistant can also work through your Home Assistant remote URL if you configure one.",
  },
  {
    q: "What does Premium unlock?",
    a: "Premium unlocks unlimited devices, rooms, Windows Companion, Fire TV Companion tools, Home Assistant Smart Home Remote, Matter Direct Control features, casting, advanced layouts, no ads, and future premium tools.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Monthly and yearly subscriptions are managed through Google Play, so you can cancel through your Google Play account settings.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="relative px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
            <HelpCircle className="h-7 w-7 text-cyan-300" />
          </div>

          <p className="mt-5 text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
            FAQ
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
            Questions before you connect?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/60">
            RemoteForge is growing from a universal TV remote into a local-first
            smart-home remote for screens, PCs, and connected devices.
          </p>
        </div>

        <div className="grid gap-4">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
            >
              <h3 className="text-lg font-black text-white">{item.q}</h3>
              <p className="mt-3 leading-7 text-white/60">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}