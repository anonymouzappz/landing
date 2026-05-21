"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function AdminUserToggle({
  uid,
  field,
  initialValue,
  label,
}: {
  uid: string;
  field: "isPremium" | "adsDisabled";
  initialValue: boolean;
  label: string;
}) {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    if (loading) return;

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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Update failed");
      }
    } catch (e) {
      setValue(value);
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
      className={[
        "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-black transition",
        value
          ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-300"
          : "border-white/10 bg-white/5 text-white/45 hover:bg-white/10",
      ].join(" ")}
    >
      {loading ? <Loader2 size={13} className="animate-spin" /> : null}
      {label}: {value ? "ON" : "OFF"}
    </button>
  );
}