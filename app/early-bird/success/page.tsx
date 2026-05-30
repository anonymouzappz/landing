import Link from "next/link";
import { CheckCircle2, Mail, Smartphone } from "lucide-react";

export default function EarlyBirdSuccessPage() {
  return (
    <main className="min-h-screen bg-[#040816] px-5 py-24 text-white">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
          <CheckCircle2 className="h-9 w-9 text-cyan-300" />
        </div>

        <p className="mt-6 text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
          Early Bird Claimed
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
          You’re locked in.
        </h1>

        <p className="mt-5 leading-8 text-white/60">
          Thanks for supporting RemoteForge before launch. Your restore code
          will be emailed after Stripe confirms the payment.
        </p>

        <div className="mt-7 grid gap-4 text-left">
          <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
            <Mail className="h-6 w-6 text-cyan-300" />
            <h2 className="mt-3 font-black">Check your email</h2>
            <p className="mt-1 text-sm font-semibold leading-6 text-white/55">
              Your RemoteForge restore code will be sent to the email used at
              checkout.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
            <Smartphone className="h-6 w-6 text-cyan-300" />
            <h2 className="mt-3 font-black">Redeem inside the app</h2>
            <p className="mt-1 text-sm font-semibold leading-6 text-white/55">
              Open RemoteForge, sign in, then redeem your code from Premium or
              Account.
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300 to-violet-500 px-6 text-sm font-black text-black"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}