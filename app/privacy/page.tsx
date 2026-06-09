import {
  ArrowLeft,
  Baby,
  CalendarDays,
  Database,
  FileText,
  Globe,
  LockKeyhole,
  Mail,
  Router,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

const LAST_UPDATED = "June 9, 2026";
const CONTACT_EMAIL = "anonymouzappz@gmail.com";

const summaryCards = [
  {
    Icon: Database,
    title: "Data We Collect",
    text: "Account information, authentication identifiers, saved devices, local network device details, premium status, app usage data, crash logs, diagnostics, support messages, and payment-related status from our payment providers.",
  },
  {
    Icon: Router,
    title: "Local Network Use",
    text: "RemoteForge uses local network information only to discover, pair with, and control supported devices that you own or have permission to use, including streaming devices, smart-home devices, and Windows Companion connections.",
  },
  {
    Icon: LockKeyhole,
    title: "How We Use Data",
    text: "We use information to provide app features, save devices, sync settings, support pairing, improve reliability, prevent abuse, provide premium features, troubleshoot issues, and respond to support requests.",
  },
  {
    Icon: Globe,
    title: "Your Privacy Rights",
    text: "Depending on where you live, you may have rights to access, correct, delete, export, restrict, object to, or withdraw consent for certain personal information.",
  },
];

const policySections = [
  {
    title: "1. Who We Are",
    body: [
      "RemoteForge is operated by Anonymouz Appz. This Privacy Policy explains how we collect, use, disclose, retain, and protect information when you use RemoteForge, including our website, Android app, Windows Companion app, downloads, support services, premium features, and related services.",
      "When this policy says “RemoteForge,” “we,” “us,” or “our,” it means Anonymouz Appz and the RemoteForge services. When this policy says “you” or “user,” it means a person using RemoteForge.",
    ],
  },
  {
    title: "2. Information We Collect",
    body: [
      "Account information: We may collect your name, email address, display name, authentication provider, user ID, profile image, and account settings when you create or use an account.",
      "Device and remote-control information: We may collect saved device names, device type, brand, platform, IP address, port, room name, room icon, favorite status, pairing status, and connection settings. This helps RemoteForge reconnect to your devices and organize them inside the app.",
      "Local network and pairing information: RemoteForge may scan your local network to find supported devices. The Windows Companion may show or use a local IP address, port, and pairing code so your phone can connect to your computer on the same trusted network.",
      "Premium and purchase information: If you buy a subscription or lifetime purchase, we may receive purchase status, entitlement status, product ID, renewal status, expiration status, and customer identifiers from app stores or payment providers. We do not directly collect or store full payment card numbers.",
      "Usage, analytics, and diagnostics: We may collect app events, feature usage, device type, operating system, app version, crash logs, error logs, performance data, and diagnostic information to improve reliability and fix bugs.",
      "Support information: If you contact us, we may collect your email address, message content, screenshots, logs, and other information you choose to provide.",
      "Website information: When you visit our website, we may collect basic technical information such as browser type, device type, pages visited, referring pages, and general usage data through hosting, analytics, or security tools.",
    ],
  },
  {
    title: "3. How We Use Information",
    body: [
      "We use information to provide and maintain RemoteForge, create and manage accounts, save your devices, sync app settings, enable pairing, connect to supported devices, provide premium features, process subscription status, improve app performance, fix crashes, respond to support requests, prevent fraud or abuse, protect security, comply with legal obligations, and develop new features.",
      "We may also use limited analytics and diagnostic information to understand how RemoteForge is used, which features need improvement, and whether the app is working correctly across supported devices.",
    ],
  },
  {
    title: "4. Local Network, Device Discovery, and Companion Apps",
    body: [
      "RemoteForge is intended only for devices you own or have permission to control. You should not use RemoteForge to access, pair with, or control devices without authorization.",
      "Local network discovery may identify compatible devices on your Wi-Fi network. This may include device names, IP addresses, ports, device types, and supported connection methods. This information is used to show available devices, pair with them, and send commands when you choose to control them.",
      "The Windows Companion is designed to help your Android device connect to your Windows computer over your trusted local network. Pairing codes and local connection details are intended to reduce unauthorized access.",
    ],
  },
  {
    title: "5. Data Sharing",
    body: [
      "We do not sell your personal information for money.",
      "We may share limited information with service providers that help us operate RemoteForge. These may include authentication providers, cloud hosting providers, database providers, analytics providers, crash reporting providers, app distribution platforms, payment and subscription providers, email providers, customer support tools, and security services.",
      "We may disclose information if required by law, legal process, or government request; to protect the rights, property, and safety of RemoteForge, users, or others; to investigate fraud, abuse, or security issues; or as part of a business transfer such as a merger, acquisition, restructuring, or sale of assets.",
      "Some privacy laws define certain advertising or analytics disclosures as “sharing.” If RemoteForge uses advertising or analytics tools that qualify as sale or sharing under applicable law, we will provide required choices where legally required.",
    ],
  },
  {
    title: "6. Ads, Analytics, and Crash Reporting",
    body: [
      "RemoteForge may use analytics, crash reporting, diagnostics, and advertising tools to operate and improve the app. These tools may collect device identifiers, app events, crash data, approximate location derived from network information, device type, operating system, and interaction data.",
      "If ads are shown in the app, advertising partners may use information to deliver, measure, or limit ads. Where required, we will request consent or provide opt-out options for personalized advertising.",
      "You may be able to limit ad tracking or reset advertising identifiers through your device settings. Premium users may receive reduced ads or ad-free features depending on the plan purchased.",
    ],
  },
  {
    title: "7. Payments and Subscriptions",
    body: [
      "Purchases may be processed by app stores, RevenueCat, Stripe, or other payment providers. These providers process payment information according to their own privacy policies and terms.",
      "RemoteForge may receive payment status, subscription status, entitlement status, product identifiers, renewal dates, expiration dates, refund status, and customer identifiers so we can unlock premium features, manage access, prevent fraud, and provide support.",
      "We do not directly collect or store complete credit card numbers through the RemoteForge app.",
    ],
  },
  {
    title: "8. Data Retention",
    body: [
      "We keep personal information only as long as reasonably necessary for the purposes described in this policy, including providing the service, maintaining your account, saving your devices, complying with legal obligations, resolving disputes, enforcing agreements, improving security, and maintaining business records.",
      "Saved devices and account settings may remain stored until you delete them, reset your account, request deletion, or until we no longer need them to provide the service.",
      "Crash logs, analytics, and diagnostic information may be retained for a limited period for troubleshooting, security, and product improvement. Some information may be retained longer if needed for legal, tax, security, fraud-prevention, or compliance reasons.",
    ],
  },
  {
    title: "9. Your Choices and Controls",
    body: [
      "You may update certain account information, remove saved devices, change app settings, disable certain permissions, unsubscribe from marketing emails, or contact us to request help with your information.",
      "You can control local network permissions, notification permissions, and other app permissions through your device settings. Some RemoteForge features may not work correctly if required permissions are disabled.",
      "You can stop using RemoteForge at any time. You may also request deletion of your account or certain personal information by contacting us.",
    ],
  },
  {
    title: "10. Privacy Rights by Region",
    body: [
      "Depending on your location, you may have rights to request access to personal information, correction of inaccurate information, deletion of information, a copy of information, restriction of processing, objection to processing, withdrawal of consent, or appeal of a privacy decision.",
      "California residents may have rights under the CCPA/CPRA, including the right to know, delete, correct, opt out of certain sale or sharing, limit certain uses of sensitive personal information, and not be discriminated against for exercising privacy rights.",
      "Users in the European Economic Area, United Kingdom, and similar regions may have rights under applicable data protection laws, including rights of access, rectification, erasure, restriction, portability, objection, and withdrawal of consent where processing is based on consent.",
      "To exercise privacy rights, contact us using the email address in this policy. We may need to verify your identity before completing certain requests.",
    ],
  },
  {
    title: "11. Legal Bases for International Users",
    body: [
      "Where GDPR, UK GDPR, or similar laws apply, we process personal information based on one or more legal bases, including performance of a contract, legitimate interests, consent, and compliance with legal obligations.",
      "Examples include using account and device information to provide RemoteForge features, using diagnostics to improve reliability and security, using purchase status to provide premium access, and using support information to respond to your requests.",
    ],
  },
  {
    title: "12. Children’s Privacy",
    body: [
      "RemoteForge is not intended for children under the age required by applicable law. We do not knowingly collect personal information from children without appropriate parental or legal consent.",
      "If you believe a child has provided personal information to RemoteForge without appropriate consent, contact us and we will take reasonable steps to delete the information where required.",
    ],
  },
  {
    title: "13. Security",
    body: [
      "We use reasonable technical, organizational, and administrative safeguards designed to protect personal information. These may include authentication controls, database security rules, access controls, encryption in transit, monitoring, and limited access to personal information.",
      "No online service, app, or network connection can be guaranteed to be completely secure. You are responsible for using RemoteForge only on trusted networks and only with devices you own or have permission to control.",
    ],
  },
  {
    title: "14. International Transfers",
    body: [
      "RemoteForge may be operated using service providers located in different countries. Your information may be processed in the United States or other locations where our service providers operate.",
      "When required, we take reasonable steps to protect international transfers of personal information according to applicable law.",
    ],
  },
  {
    title: "15. Third-Party Links and Services",
    body: [
      "RemoteForge may link to third-party websites, app stores, payment providers, device manufacturers, or support resources. We are not responsible for the privacy practices of third parties.",
      "Your use of third-party services may be governed by their own privacy policies, terms, and settings.",
    ],
  },
  {
    title: "16. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. When we make changes, we will update the “Last updated” date above. If changes are significant, we may provide additional notice through the app, website, email, or other reasonable methods.",
      "Your continued use of RemoteForge after an updated policy becomes effective means you accept the updated policy, where permitted by law.",
    ],
  },
  {
    title: "17. Contact Us",
    body: [
      `For privacy questions, account deletion requests, or data rights requests, contact Anonymouz Appz at ${CONTACT_EMAIL}.`,
      "Please include enough information for us to understand and respond to your request. Do not send passwords, full payment card numbers, or sensitive information through email.",
    ],
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

          <p className="mt-5 flex flex-wrap items-center gap-2 text-sm font-bold text-white/45">
            <CalendarDays size={16} />
            Last updated: {LAST_UPDATED}
          </p>

          <p className="mt-7 max-w-4xl text-lg leading-8 text-white/65">
            This Privacy Policy explains how RemoteForge, operated by Anonymouz
            Appz, collects, uses, stores, protects, and shares information when
            you use our website, Android app, Windows Companion, downloads,
            support services, premium features, and related services.
          </p>

          <div className="mt-8 rounded-3xl border border-cyan-300/10 bg-cyan-400/[0.06] p-5">
            <div className="flex items-start gap-3">
              <FileText className="mt-1 shrink-0 text-cyan-300" size={22} />
              <p className="text-sm leading-7 text-white/58">
                This policy is written to be user-friendly and transparent, but
                it is not legal advice. Have a qualified attorney review it
                before launch, especially if you enable ads, analytics,
                subscriptions, international users, or new device permissions.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {summaryCards.map(({ Icon, title, text }) => (
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

        <section className="mt-8 rounded-[2.5rem] border border-cyan-300/10 bg-black/35 p-8 backdrop-blur-2xl md:p-12">
          <div className="space-y-10">
            {policySections.map((section) => (
              <article key={section.title}>
                <h2 className="text-2xl font-black text-white md:text-3xl">
                  {section.title}
                </h2>

                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-8 text-white/62"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-violet-400/10 bg-violet-400/5 p-5">
              <div className="flex items-start gap-3">
                <UserCheck className="mt-1 shrink-0 text-violet-300" size={22} />
                <div>
                  <h3 className="font-black text-white">
                    Your account and data
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-white/50">
                    You may contact us to request access, correction, deletion,
                    or help with your RemoteForge account data.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-400/10 bg-cyan-400/5 p-5">
              <div className="flex items-start gap-3">
                <Baby className="mt-1 shrink-0 text-cyan-300" size={22} />
                <div>
                  <h3 className="font-black text-white">Children’s privacy</h3>
                  <p className="mt-2 text-sm leading-7 text-white/50">
                    RemoteForge is not intended for children under the age
                    required by applicable law without appropriate consent.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-black text-white">
                  Privacy Contact
                </h3>
                <p className="mt-1 text-sm text-white/45">
                  For privacy requests, account deletion, or policy questions.
                </p>
              </div>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-5 py-3 text-sm font-black text-cyan-200 transition hover:border-cyan-300/40 hover:bg-cyan-400/15"
              >
                <Mail size={17} />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}