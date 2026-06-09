import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type Props = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function PricingSuccessPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#070B14] px-5 py-24 text-white">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 text-center shadow-2xl shadow-black/30">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-300/20 bg-cyan-300/10">
          <CheckCircle2 className="h-10 w-10 text-cyan-300" />
        </div>

        <h1 className="mt-6 text-4xl font-black">Payment successful</h1>

        <p className="mt-4 text-white/60">
          Thanks for supporting RemoteForge. Your checkout was completed
          successfully.
        </p>

        {params.session_id && (
          <p className="mt-4 break-all rounded-2xl border border-white/10 bg-black/20 p-3 text-xs font-bold text-white/40">
            Session: {params.session_id}
          </p>
        )}

        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 text-sm font-black text-white"
        >
          Back to RemoteForge
        </Link>
      </div>
    </main>
  );
}