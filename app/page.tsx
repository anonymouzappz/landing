import DownloadSection from "@/components/sections/DownloadSection";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import SecuritySection from "@/components/sections/SecuritySection";
import VisionSection from "@/components/sections/VisionSection";
import Footer from "@/components/ui/Footer";
import NavBar from "@/components/ui/NavBar";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#02030a] text-white">
      {/* GLOBAL BACKGROUND */}
      <div className="fixed inset-0 -z-50 bg-[#02030a]" />

      {/* CYBER GRID */}
      <div
        className="
          pointer-events-none fixed inset-0 -z-40 opacity-[0.05]
          [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)]
          [background-size:80px_80px]
        "
      />

      {/* TOP BLUE GLOW */}
      <div className="pointer-events-none fixed left-[-12rem] top-[-8rem] -z-30 h-[34rem] w-[34rem] rounded-full bg-cyan-500/20 blur-[140px]" />

      {/* PURPLE GLOW */}
      <div className="pointer-events-none fixed bottom-[-12rem] right-[-10rem] -z-30 h-[36rem] w-[36rem] rounded-full bg-violet-600/20 blur-[150px]" />

      {/* NAV */}
      <div className="relative z-50">
        <NavBar />
      </div>

      {/* HERO */}
      <section className="relative z-10">
        <HeroSection />
      </section>

      {/* CONTENT */}
      <div className="relative z-20">
        <VisionSection />
        <HowItWorksSection />
        <SecuritySection />
        <DownloadSection />
        <Footer />
      </div>
    </main>
  );
}