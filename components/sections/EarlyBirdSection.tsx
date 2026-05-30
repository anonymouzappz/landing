import {
  ArrowRight,
  CheckCircle2,
  Crown,
  Gift,
  Home,
  Mail,
  QrCode,
  ShieldCheck,
  Sparkles,
  Timer,
  Zap,
} from "lucide-react";

const plans = [
  {
    name: "Monthly",
    price: "$1.99",
    originalPrice: "$2.99",
    sub: "per month",
    tag: "Early Bird",
    icon: Zap,
    checkoutHref: "/api/stripe/monthly-checkout",
    featured: false,
    features: [
      "Unlimited saved devices",
      "No ads",
      "Windows Companion",
      "Home Assistant Remote",
      "Matter Direct features",
      "Rooms and favorites",
      "Restore with emailed code",
    ],
  },
  {
    name: "Yearly",
    price: "$9.99",
    originalPrice: "$19.99",
    sub: "per year",
    tag: "Best Value",
    icon: Sparkles,
    checkoutHref: "/api/stripe/yearly-checkout",
    featured: true,
    features: [
      "Everything in Monthly",
      "Best yearly savings",
      "Unlimited smart-home devices",
      "Advanced remotes",
      "Priority scanning",
      "Future premium tools",
      "Restore with emailed code",
    ],
  },
  {
    name: "Lifetime",
    price: "$14.99",
    originalPrice: "$29.99",
    sub: "one-time",
    tag: "50% Off",
    icon: Crown,
    checkoutHref: "/api/stripe/lifetime-checkout",
    featured: false,
    features: [
      "Lifetime premium",
      "No subscription",
      "All smart-home features",
      "Home Assistant Remote",
      "Matter Direct features",
      "Early supporter access",
      "Restore with emailed code",
    ],
  },
];

const included = [
  {
    icon: Home,
    title: "Home Assistant Remote",
    text: "Control lights, plugs, thermostats, speakers, scenes, sensors, and more from one smart-home remote.",
  },
  {
    icon: QrCode,
    title: "Matter Direct Ready",
    text: "Matter setup flow, QR scanning, and direct-control preparation for compatible Matter devices.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Unlock",
    text: "Unlimited devices, rooms, no ads, Windows Companion, Fire TV tools, and future premium features.",
  },
  {
    icon: Mail,
    title: "Restore Code by Email",
    text: "After checkout, you receive a RemoteForge restore code to redeem inside the Android app.",
  },
];

export default function EarlyBirdSection() {
  return (
    <section
      id="earlybird"
      className="relative overflow-hidden border-y border-cyan-300/10 bg-[#040816] px-5 py-24 text-white lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,.18),transparent_32%),radial-gradient(circle_at_80%_15%,rgba(168,85,247,.18),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(34,197,94,.10),transparent_35%)]" />

      <div className="absolute inset-0 opacity-[0.035]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:90px_90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
            <Timer size={15} />
            Pre-Launch Early Bird
          </div>

          <h2 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Lock in RemoteForge Premium before launch.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/60">
            Get early-bird pricing for RemoteForge Premium. Buyers receive a
            restore code by email that can be redeemed inside the Android app.
          </p>

          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 rounded-[1.5rem] border border-cyan-300/15 bg-white/[0.045] p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <Badge text="Monthly $1.99" />
            <Badge text="Yearly $9.99" />
            <Badge text="Lifetime $14.99" />
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className={[
                  "relative overflow-hidden rounded-[2rem] border p-6 shadow-2xl shadow-black/30 backdrop-blur-xl",
                  plan.featured
                    ? "border-cyan-300/50 bg-cyan-300/[0.075] ring-1 ring-cyan-300/30"
                    : "border-white/10 bg-white/[0.045]",
                ].join(" ")}
              >
                {plan.featured ? (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-blue-500 to-fuchsia-500" />
                ) : null}

                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    <Icon className="h-6 w-6 text-cyan-300" />
                  </div>

                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-cyan-200">
                    {plan.tag}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-black text-white">
                  {plan.name}
                </h3>

                <div className="mt-3 flex flex-wrap items-end gap-2">
                  <span className="text-5xl font-black text-white">
                    {plan.price}
                  </span>

                  <span className="pb-1 text-sm font-bold text-white/40 line-through">
                    {plan.originalPrice}
                  </span>

                  <span className="pb-1 text-sm font-bold text-white/50">
                    {plan.sub}
                  </span>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-sm font-bold text-white/75"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.checkoutHref}
                  className={[
                    "group mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-black transition hover:-translate-y-0.5",
                    plan.featured
                      ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white shadow-[0_0_35px_rgba(34,211,238,.25)]"
                      : "border border-white/10 bg-white/10 text-white hover:bg-white/15",
                  ].join(" ")}
                >
                  Claim Early Bird
                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {included.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                <Icon className="h-6 w-6 text-cyan-300" />
              </div>

              <h3 className="mt-5 text-lg font-black text-white">{title}</h3>

              <p className="mt-2 text-sm font-semibold leading-6 text-white/55">
                {text}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-white/[0.045] p-6 text-center shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
            <Gift className="h-7 w-7 text-cyan-300" />
          </div>

          <h3 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
            How early-bird restore codes work
          </h3>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/60">
            After Stripe checkout, RemoteForge will email you a restore code.
            Open the Android app, sign in, go to Premium or Account, and redeem
            the code to unlock your plan.
          </p>

          <div className="mt-6 grid gap-3 text-left md:grid-cols-3">
            <Step number="1" text="Buy early-bird plan on this section." />
            <Step number="2" text="Receive your code by email." />
            <Step number="3" text="Redeem inside RemoteForge." />
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-2xl border border-cyan-300/15 bg-black/25 px-4 py-3 text-sm font-black text-cyan-100">
      {text}
    </span>
  );
}

function Step({ number, text }: { number: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300 text-sm font-black text-black">
        {number}
      </div>

      <p className="mt-3 text-sm font-bold leading-6 text-white/65">{text}</p>
    </div>
  );
}