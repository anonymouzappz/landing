"use client";

import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  AlertTriangle,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { auth } from "@/src/lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return email.trim().length > 4 && password.trim().length > 5 && !loading;
  }, [email, password, loading]);

  async function login() {
    if (!canSubmit) {
      setError("Enter your admin email and password.");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

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
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token, rememberMe }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Admin login failed");
      }

      router.replace("/admin");
      router.refresh();
    } catch (e: unknown) {
      console.error("Admin login error:", e);

      const message = e instanceof Error ? e.message : "Login failed";

      if (message.includes("auth/invalid-credential")) {
        setError("Wrong email/password or this account does not exist.");
      } else if (message.includes("auth/configuration-not-found")) {
        setError("Firebase Email/Password sign-in is not enabled.");
      } else if (message.includes("auth/too-many-requests")) {
        setError("Too many attempts. Reset the password or wait a few minutes.");
      } else if (message.includes("Not authorized")) {
        setError("This account is not allowed to access the admin dashboard.");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03040b] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,.22),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,.22),transparent_36%),linear-gradient(135deg,#02030a_0%,#07111f_48%,#120720_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:54px_54px] opacity-20" />

      <section className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-5 py-10 lg:grid-cols-[1.05fr_.95fr]">
        <div className="hidden lg:block">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-200">
            <Sparkles size={14} />
            RemoteForge Admin
          </div>

          <h1 className="max-w-xl text-5xl font-black tracking-tight xl:text-6xl">
            Control your app from one secure dashboard.
          </h1>

          <p className="mt-5 max-w-lg text-base font-semibold leading-7 text-white/55">
            Manage users, premium access, support messages, app updates,
            notifications, devices, and RemoteForge system settings.
          </p>

          <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-2">
            {[
              "Owner-only access",
              "Secure Firebase session",
              "Premium user controls",
              "Admin analytics ready",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-xl shadow-black/20 backdrop-blur"
              >
                <ShieldCheck className="mb-3 text-cyan-300" size={22} />
                <p className="text-sm font-black text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="rounded-[2.25rem] border border-white/10 bg-white/[0.06] p-2 shadow-2xl shadow-black/50 backdrop-blur-2xl">
            <div className="rounded-[2rem] border border-white/10 bg-[#080b14]/90 p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 shadow-lg shadow-cyan-500/10">
                  <LockKeyhole className="text-cyan-300" size={30} />
                </div>

                <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-200">
                  SECURE
                </div>
              </div>

              <p className="mt-7 text-xs font-black uppercase tracking-[0.4em] text-cyan-300">
                RemoteForge
              </p>

              <h2 className="mt-3 text-3xl font-black">Admin Login</h2>

              <p className="mt-2 text-sm font-semibold leading-6 text-white/50">
                Sign in with an approved Firebase admin account.
              </p>

              <div className="mt-7 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
                    Email
                  </span>

                  <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 transition focus-within:border-cyan-300/50 focus-within:bg-black/45">
                    <Mail size={18} className="text-white/35" />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@email.com"
                      type="email"
                      autoComplete="email"
                      className="h-full flex-1 bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/25"
                    />
                  </div>
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
                    Password
                  </span>

                  <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 transition focus-within:border-cyan-300/50 focus-within:bg-black/45">
                    <LockKeyhole size={18} className="text-white/35" />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className="h-full flex-1 bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/25"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") login();
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="rounded-xl p-2 text-white/45 transition hover:bg-white/10 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-bold text-white/70">
                  <span>Remember login on this device</span>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 accent-cyan-300"
                  />
                </label>

                {error && (
                  <div className="flex gap-3 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-bold text-red-200">
                    <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={login}
                  disabled={!canSubmit}
                  className="group relative mt-1 flex h-14 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 px-5 text-sm font-black text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="absolute inset-0 translate-x-[-120%] bg-white/30 transition duration-700 group-hover:translate-x-[120%]" />
                  {loading && <Loader2 className="animate-spin" size={18} />}
                  <span className="relative">
                    {loading ? "Checking access..." : "Enter Admin Panel"}
                  </span>
                </button>

                <p className="text-center text-xs font-semibold leading-5 text-white/35">
                  Unauthorized access is blocked and logged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}