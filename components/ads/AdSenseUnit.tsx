"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

function normalizedAdClient() {
  const raw = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim();

  if (!raw) return "";
  return raw.startsWith("ca-") ? raw : `ca-${raw}`;
}

export default function AdSenseUnit({
  slot,
  className = "",
  format = "auto",
}: {
  slot?: string;
  className?: string;
  format?: string;
}) {
  const adClient = normalizedAdClient();
  const adSlot = slot?.trim();

  useEffect(() => {
    if (!adClient || !adSlot) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers and pre-approval states can block the script.
    }
  }, [adClient, adSlot]);

  if (!adClient || !adSlot) return null;

  return (
    <div
      aria-label="Advertisement"
      className={[
        "mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-4",
        className,
      ].join(" ")}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
