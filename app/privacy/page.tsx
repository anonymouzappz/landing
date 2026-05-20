import {
  ArrowLeft,
  Database,
  Globe,
  LockKeyhole,
  Router,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

const sections = [
  {
    Icon: Database,
    title: "Information We Collect",
    text: "We may collect account details such as name, email address, authentication ID, saved devices, device names, device type, IP address, port, room settings, premium status, crash logs, analytics events, and app usage data.",
  },
  {
    Icon: Router,
    title: "Local Network & Windows Companion",
    text: "RemoteForge is designed for devices you own or have permission to control. The Windows Companion may display a local IP address, port, and pairing code so your Android device can pair with your Windows computer on the same trusted network.",
  },
  {
    Icon: LockKeyhole,
    title: "How We Use Data",
    text: "We use data to provide account features, saved devices, pairing, app reliability, analytics, crash reporting, customer support, premium features, fraud prevention, security, and product improvement.",
  },
  {
    Icon: Globe,
    title: "Worldwide Privacy Rights",
    text: "Depending on your location, you may have rights to access, correct, delete, export, restrict, object to, or withdraw consent for certain personal information. These rights may apply under laws such as GDPR, UK GDPR, CCPA/CPRA, LGPD, PIPEDA, and similar privacy laws.",
  },
];

export default function PrivacyPage() {
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
            <ShieldCheck size={16} />
            Privacy & Data Protection
          </div>

          <h1 className="mt-7 text-5xl font-black leading-[0.92] tracking-[-0.06em] md:text-7xl">
            Privacy
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Policy.
            </span>
          </h1>

          <p className="mt-5 text-sm font-bold text-white/45">
            Last updated: 2026
          </p>

          <p className="mt-7 max-w-4xl text-lg leading-8 text-white/65">
            This Privacy Policy explains how RemoteForge, operated by Anonymouz
            Appz, collects, uses, stores, protects, and shares information when
            you use our website, Android app, Windows Companion, downloads,
            support services, and related features.
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
          <h2 className="text-3xl font-black text-white">Data Sharing</h2>
          <p>
            We do not sell personal information. We may share limited data with
            trusted service providers that help operate RemoteForge, such as
            authentication, hosting, analytics, crash reporting, app
            distribution, payment processing, security, email, and customer
            support providers.
          </p>

          <h2 className="text-3xl font-black text-white">
            International Users
          </h2>
          <p>
            RemoteForge may be used by people in different countries. If your
            information is processed outside your country, we take reasonable
            steps to protect it according to applicable privacy and data
            protection requirements.
          </p>

          <h2 className="text-3xl font-black text-white">Children’s Privacy</h2>
          <p>
            RemoteForge is not intended for children under the age required by
            applicable law. We do not knowingly collect personal information
            from children without appropriate consent.
          </p>

          <h2 className="text-3xl font-black text-white">Data Security</h2>
          <p>
            We use reasonable technical and organizational measures to help
            protect information. No online service is fully secure, so users
            should only pair devices they own or have permission to control.
          </p>

          <h2 className="text-3xl font-black text-white">Contact</h2>
          <p>
            For privacy requests or questions, contact us at{" "}
            <a
              href="mailto:anonyumouzappz@gmail.com"
              className="font-bold text-cyan-300 hover:text-cyan-200"
            >
              anonymouzappz@gmail.com
            </a>
            .
          </p>

          <div className="rounded-3xl border border-violet-400/10 bg-violet-400/5 p-5">
            <div className="flex items-start gap-3">
              <UserCheck className="mt-1 text-violet-300" size={22} />
              <p className="text-sm leading-7 text-white/50">
                This is a strong starter privacy policy for worldwide launch,
                but you should have a qualified attorney review it before public
                release, especially if you launch payments, ads, subscriptions,
                or collect analytics from users in multiple regions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
