"use client";

import {
  CheckCircle2,
  Crown,
  Loader2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";

type PaidPlanKey = "monthly" | "yearly" | "lifetime";

type Plan = {
  name: string;
  key: "free" | PaidPlanKey;
  price: string;
  sub: string;
  tag: string;
  icon: typeof ShieldCheck;
  featured?: boolean;
  checkoutLabel: string;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Free",
    key: "free",
    price: "$0",
    sub: "Ads + limited control",
    tag: "Start here",
    icon: ShieldCheck,
    checkoutLabel: "Start In App",
    features: [
      "1 saved remote device",
      "Basic Roku controls",
      "Android TV / Google TV scanning",
      "Home Assistant preview",
      "Matter setup preview",
      "Ads supported",
    ],
  },
  {
    name: "Monthly",
    key: "monthly",
    price: "$2.99",
    sub: "per month",
    tag: "Most popular",
    icon: Zap,
    featured: true,
    checkoutLabel: "Checkout Monthly",
    features: [
      "Unlimited saved devices",
      "Windows Companion",
      "Fire TV Companion support",
      "Home Assistant Smart Home Remote",
      "Matter Direct Control prep",
      "Rooms and favorites",
      "No ads",
    ],
  },
  {
    name: "Yearly",
    key: "yearly",
    price: "$19.99",
    sub: "per year",
    tag: "Best value",
    icon: Sparkles,
    checkoutLabel: "Checkout Yearly",
    features: [
      "Everything in Monthly",
      "Save vs monthly",
      "Unlimited smart-home devices",
      "Advanced remotes",
      "Priority scanning",
      "Future premium tools",
    ],
  },
  {
    name: "Lifetime",
    key: "lifetime",
    price: "$29.99",
    sub: "one-time",
    tag: "Early supporter",
    icon: Crown,
    checkoutLabel: "Checkout Lifetime",
    features: [
      "Lifetime premium",
      "No subscription",
      "All smart-home features",
      "Home Assistant Remote",
      "Matter Direct features",
      "Early supporter access",
    ],
  },
];

export default function PricingSection() {
  const [loadingPlan, setLoadingPlan] = useState<string>("");
  const [error, setError] = useState("");

async function startCheckout(plan: Plan) {
  if (plan.key === "free") {
    document.getElementById("download")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    return;
  }

  setError("");
  setLoadingPlan(plan.key);

  try {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan: plan.key,
      }),
    });

    const data = (await res.json()) as {
      url?: string;
      error?: string;
    };

    if (!res.ok || !data.url) {
      throw new Error(data.error || "Could not start checkout.");
    }

    window.location.assign(data.url);
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Something went wrong starting checkout.",
    );
  } finally {
    setLoadingPlan("");
  }
}

  return (
    <section id="pricing" className="relative px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
            Pricing
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
            Start free. Upgrade when your remote needs more power.
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/60">
            Use RemoteForge for basic remote control, then unlock unlimited
            devices, Windows Companion, Home Assistant Smart Home Remote, Matter
            Direct Control features, rooms, and an ad-free experience.
          </p>

          {error && (
            <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-100">
              {error}
            </div>
          )}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isLoading = loadingPlan === plan.key;

            return (
              <div
                key={plan.name}
                className={[
                  "relative overflow-hidden rounded-[2rem] border p-6",
                  "bg-white/[0.045] shadow-2xl shadow-black/30 backdrop-blur-xl",
                  plan.featured
                    ? "border-cyan-300/50 ring-1 ring-cyan-300/30"
                    : "border-white/10",
                ].join(" ")}
              >
                {plan.featured && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-blue-500 to-fuchsia-500" />
                )}

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

                <div className="mt-3 flex items-end gap-2">
                  <span className="text-4xl font-black text-white">
                    {plan.price}
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

                <button
                  type="button"
                  onClick={() => startCheckout(plan)}
                  disabled={Boolean(loadingPlan)}
                  className={[
                    "mt-7 flex h-12 w-full items-center justify-center rounded-2xl text-sm font-black transition",
                    "disabled:cursor-not-allowed disabled:opacity-60",
                    plan.featured
                      ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white hover:brightness-110"
                      : "border border-white/10 bg-white/10 text-white hover:bg-white/15",
                  ].join(" ")}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Opening Checkout...
                    </>
                  ) : (
                    plan.checkoutLabel
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm font-semibold text-white/45">
          Website purchases are processed securely by Stripe. Android in-app
          purchases may still be managed through Google Play billing.
        </p>
      </div>
    </section>
  );
}