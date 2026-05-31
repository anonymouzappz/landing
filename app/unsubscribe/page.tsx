import { FieldValue } from "firebase-admin/firestore";
import Link from "next/link";

import { adminDb } from "@/src/lib/firebase-admin";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function subscriberDocId(email: string) {
  return Buffer.from(email.toLowerCase().trim()).toString("base64url");
}

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  const email = String(params.email || "").trim().toLowerCase();

  let message = "Missing email address.";

  if (isValidEmail(email)) {
    await adminDb.collection("emailSubscribers").doc(subscriberDocId(email)).set(
      {
        email,
        status: "unsubscribed",
        marketingOptIn: false,
        unsubscribedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    message = "You have been unsubscribed from RemoteForge emails.";
  }

  return (
    <main className="min-h-screen bg-[#040816] px-5 py-24 text-white">
      <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center shadow-2xl shadow-black/30">
        <h1 className="text-4xl font-black">Unsubscribe</h1>

        <p className="mt-4 leading-7 text-white/60">{message}</p>

        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-300 to-violet-500 px-6 text-sm font-black text-black"
        >
          Back to RemoteForge
        </Link>
      </div>
    </main>
  );
}