import Footer from "@/components/ui/Footer";
import NavBar from "@/components/ui/NavBar";
import { Mail, MessageSquare, ShieldCheck } from "lucide-react";

const SUPPORT_EMAIL = "support@remoteforge.net";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050713] text-white">
      <NavBar />

      <section className="mx-auto max-w-5xl px-5 pb-20 pt-36">
        <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
          <MessageSquare size={14} />
          Contact
        </p>

        <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
          Contact RemoteForge
        </h1>

        <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-white/62">
          Questions about setup, subscriptions, privacy, app support, Windows
          Companion, or business inquiries can be sent to the RemoteForge team.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
          >
            <Mail className="text-cyan-300" size={28} />
            <h2 className="mt-4 text-2xl font-black">Email Support</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/55">
              {SUPPORT_EMAIL}
            </p>
          </a>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6">
            <ShieldCheck className="text-emerald-300" size={28} />
            <h2 className="mt-4 text-2xl font-black">Publisher</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/55">
              RemoteForge is operated by Anonymouz Appz. We review support,
              privacy, and app account requests as quickly as possible.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
