"use client";

import { useState } from "react";
import { Check, Loader2, X } from "lucide-react";

type AdminUserToggleProps = {
  uid: string;
  field: "isPremium" | "adsDisabled";
  initialValue?: boolean;
  label: string;
};

export default function AdminUserToggle({
  uid,
  field,
  initialValue = false,
  label,
}: AdminUserToggleProps) {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    if (loading) return;

    const previousValue = value;
    const nextValue = !value;

    setLoading(true);
    setValue(nextValue);

    try {
      const res = await fetch("/api/admin/users/update-flags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid,
          [field]: nextValue,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Update failed");
      }
    } catch (e) {
      setValue(previousValue);
      alert(e instanceof Error ? e.message : "Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      aria-pressed={value}
      aria-label={`${label} is ${value ? "on" : "off"}`}
      className={[
        "group flex w-full min-w-0 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition sm:w-fit sm:rounded-full sm:px-3 sm:py-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        value
          ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-200"
          : "border-white/10 bg-white/[0.045] text-white/55 hover:bg-white/10",
      ].join(" ")}
    >
      <span className="min-w-0">
        <span className="block truncate text-sm font-black sm:text-xs">
          {label}
        </span>

        <span className="mt-0.5 block text-xs font-bold opacity-60 sm:hidden">
          {value ? "Enabled" : "Disabled"}
        </span>
      </span>

      <span
        className={[
          "flex h-8 w-14 shrink-0 items-center rounded-full border p-1 transition",
          value
            ? "justify-end border-emerald-300/25 bg-emerald-300/15"
            : "justify-start border-white/10 bg-black/25",
        ].join(" ")}
      >
        <span
          className={[
            "flex h-6 w-6 items-center justify-center rounded-full transition",
            value ? "bg-emerald-300 text-black" : "bg-white/15 text-white/55",
          ].join(" ")}
        >
          {loading ? (
            <Loader2 size={13} className="animate-spin" />
          ) : value ? (
            <Check size={13} />
          ) : (
            <X size={13} />
          )}
        </span>
      </span>
    </button>
  );
}