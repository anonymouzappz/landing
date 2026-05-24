"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { LockKeyhole, Loader2 } from "lucide-react";

import { auth } from "@/src/lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login() {
    if (loading) return;

    const cleanEmail = email.trim();

    if (!cleanEmail || !password.trim()) {
      setError("Enter your admin email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence,
      );

      const userCred = await signInWithEmailAndPassword(
        auth,
        cleanEmail,
        password,
      );

      const token = await userCred.user.getIdToken(true);

      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          token,
          rememberMe,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Admin login failed");
      }

      router.replace("/admin");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02030a] px-5 py-16 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,.18),transparent_40%)]" />

      <div className="relative mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
          <LockKeyhole className="text-cyan-300" size={30} />
        </div>

        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-300">
          RemoteForge
        </p>

        <h1 className="mt-3 text-3xl font-black">Admin Login</h1>

        <p className="mt-2 text-sm font-semibold text-white/50">
          Owner-only dashboard access.
        </p>

        <div className="mt-7 grid gap-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            type="email"
            autoComplete="email"
            className="h-14 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm font-bold text-white outline-none placeholder:text-white/30 focus:border-cyan-300/40"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            className="h-14 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm font-bold text-white outline-none placeholder:text-white/30 focus:border-cyan-300/40"
            onKeyDown={(e) => {
              if (e.key === "Enter") login();
            }}
          />

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-bold text-white/70">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 accent-cyan-300"
            />
            Remember login on this device
          </label>

          {error && (
            <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-bold text-red-200">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={login}
            disabled={loading}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 px-5 text-sm font-black text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Checking..." : "Enter Admin Panel"}
          </button>
        </div>
      </div>
    </main>
  );
}