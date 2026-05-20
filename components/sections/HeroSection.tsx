"use client";

import RemoteForgeWorld from "@/components/three/RemoteForgeWorld";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#03030a]">
      <RemoteForgeWorld />

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-[#03030a]/80" />
    </section>
  );
}