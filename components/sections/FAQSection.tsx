import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Do I need an account to use RemoteForge?",
    a: "You can try basic features first. An account is required to save devices, sync rooms, pair Windows Companion, and unlock premium features.",
  },
  {
    q: "What devices does RemoteForge support?",
    a: "The MVP focuses on Roku TVs and Windows PCs through RemoteForge Companion. More smart devices, casting, and advanced controls are planned.",
  },
  {
    q: "What is RemoteForge Companion?",
    a: "It is the native Windows app that lets your phone control mouse, keyboard, touchpad, and virtual controller features on your PC.",
  },
  {
    q: "Is control local or cloud-based?",
    a: "RemoteForge is designed around local network control for fast response. Your phone and device should be on the same WiFi network.",
  },
  {
    q: "What does Premium unlock?",
    a: "Premium unlocks unlimited devices, rooms, Windows Companion tools, casting, no ads, advanced layouts, and future premium features.",
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