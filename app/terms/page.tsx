import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  Ban,
  CreditCard,
  FileText,
  Globe,
  LockKeyhole,
  Monitor,
  ShieldCheck,
  UserCheck,
  Wifi,
} from "lucide-react";

const sections = [
  {
    Icon: UserCheck,
    title: "Authorized Use",
    text: "You may only use RemoteForge to control devices, computers, accounts, and networks that you own or have clear permission to access and control.",
  },
  {
    Icon: Ban,
    title: "Prohibited Use",
    text: "You may not use RemoteForge to access, control, monitor, disrupt, damage, bypass security, or interfere with any device, computer, system, account, or network without authorization.",
  },
  {
    Icon: Monitor,
    title: "Windows Companion",
    text: "The Windows Companion should only be installed on computers you own or are authorized to manage. You are responsible for keeping your device, local network, and pairing code secure.",
  },
  {
    Icon: CreditCard,
    title: "Subscriptions & Purchases",
    text: "Future premium features may include ad removal, unlimited devices, rooms, custom remotes, macros, AI features, advanced PC controls, and other paid features.",
  },
];

export default function TermsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040816] px-5 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,.16),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(168,85,247,.18),transparent_38%)]" />

      <div className="absolute inset-0 opacity-[0.035]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:90px_90px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl border border-cyan-300/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-white/65 backdrop-blur-xl transition hover:border-cyan-300/20 hover:text-cyan-200"
        >
          <ArrowLeft size={17} />
          Back home
        </Link>

        <section className="mt-10 rounded-[2.5rem] border border-cyan-300/10 bg-black/35 p-8 backdrop-blur-2xl md:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-cyan-200">
            <FileText size={16} />
            Terms & Conditions
          </div>

          <h1 className="mt-7 text-5xl font-black leading-[0.92] tracking-[-0.06em] md:text-7xl">
            Terms of
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Service.
            </span>
          </h1>

          <p className="mt-5 text-sm font-bold text-white/45">
            Last updated: 2026
          </p>

          <p className="mt-7 max-w-4xl text-lg leading-8 text-white/65">
            These Terms of Service govern your access to and use of RemoteForge,
            including the website, Android app, Windows Companion, downloads,
            account features, support services, and future paid or premium
            features operated by Anonymouz Appz.
          </p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {sections.map(({ Icon, title, text }) => (
            <div
              key={title}
              className="rounded-[2rem] border border-cyan-300/10 bg-white/[0.03] p-7 backdrop-blur-xl"
            >
              <Icon className="text-cyan-300" size={34} />
              <h2 className="mt-5 text-2xl font-black">{title}</h2>
              <p className="mt-3 leading-8 text-white/58">{text}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 space-y-6 rounded-[2.5rem] border border-cyan-300/10 bg-black/35 p-8 leading-8 text-white/62 backdrop-blur-2xl md:p-12">
          <h2 className="text-3xl font-black text-white">
            Device Compatibility & Availability
          </h2>
          <p>
            RemoteForge features may change, improve, or be removed over time.
            Device support may vary by brand, model, firmware, operating system,
            local network setup, app version, companion version, permissions, and
            third-party platform limitations.
          </p>

          <h2 className="text-3xl font-black text-white">
            Local Network Responsibility
          </h2>
          <p>
            RemoteForge is designed for local-first control. You are responsible
            for securing your WiFi network, devices, accounts, pairing codes,
            operating system permissions, firewall settings, and any users who
            have access to your devices.
          </p>

          <h2 className="text-3xl font-black text-white">
            Third-Party Services
          </h2>
          <p>
            RemoteForge may interact with third-party platforms, app stores,
            payment providers, analytics services, hosting providers, device
            manufacturers, and operating systems. We are not responsible for
            third-party outages, policy changes, device restrictions, or service
            limitations.
          </p>

          <h2 className="text-3xl font-black text-white">
            Worldwide Use
          </h2>
          <p>
            You are responsible for using RemoteForge in compliance with the
            laws, rules, and regulations that apply in your country, state,
            province, or region. RemoteForge may not be available or appropriate
            for use in every location.
          </p>

          <h2 className="text-3xl font-black text-white">
            No Misuse or Unauthorized Access
          </h2>
          <p>
            You may not use RemoteForge for hacking, spying, stalking,
            unauthorized monitoring, credential theft, malware activity,
            bypassing security protections, disrupting networks, or controlling
            any system without permission.
          </p>

          <h2 className="text-3xl font-black text-white">
            Disclaimer of Warranties
          </h2>
          <p>
            RemoteForge is provided “as is” and “as available.” We do not
            guarantee uninterrupted service, error-free operation, compatibility
            with every device, or that all features will work in every network
            environment.
          </p>

          <h2 className="text-3xl font-black text-white">
            Limitation of Liability
          </h2>
          <p>
            To the maximum extent allowed by law, RemoteForge and Anonymouz Appz
            are not responsible for misuse, unsupported devices, user error,
            network issues, service outages, device damage, data loss,
            unauthorized use, lost profits, or indirect, incidental, special, or
            consequential damages.
          </p>

          <h2 className="text-3xl font-black text-white">
            Changes to These Terms
          </h2>
          <p>
            We may update these Terms as RemoteForge grows. Continued use of
            RemoteForge after changes means you accept the updated Terms.
          </p>

          <h2 className="text-3xl font-black text-white">Contact</h2>
          <p>
            For questions about these Terms, contact us at{" "}
            <a
              href="mailto:support@remoteforge.com"
              className="font-bold text-cyan-300 hover:text-cyan-200"
            >
              support@remoteforge.com
            </a>
            .
          </p>

          <div className="rounded-3xl border border-violet-400/10 bg-violet-400/5 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 text-violet-300" size={22} />
              <p className="text-sm leading-7 text-white/50">
                These Terms are a strong starter template for a worldwide
                software launch, but you should have a qualified attorney review
                them before public release, especially before adding payments,
                subscriptions, ads, AI features, or broad international
                distribution.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              Icon: ShieldCheck,
              title: "Use With Permission",
              text: "Only control devices you own or are authorized to manage.",
            },
            {
              Icon: Wifi,
              title: "Secure Your Network",
              text: "Keep your WiFi, pairing code, and computer permissions protected.",
            },
            {
              Icon: Globe,
              title: "Follow Local Laws",
              text: "Use RemoteForge according to the rules that apply where you live.",
            },
          ].map(({ Icon, title, text }) => (
            <div
              key={title}
              className="rounded-[2rem] border border-cyan-300/10 bg-white/[0.03] p-7 backdrop-blur-xl"
            >
              <Icon className="text-cyan-300" size={32} />
              <h3 className="mt-5 text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-white/55">{text}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}