import DownloadSection from "@/components/sections/DownloadSection";
import FAQSection from "@/components/sections/FAQSection";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import SecuritySection from "@/components/sections/SecuritySection";
import VisionSection from "@/components/sections/VisionSection";
import Footer from "@/components/ui/Footer";
import NavBar from "@/components/ui/NavBar";
import PricingSection from "@/components/sections/PricingSection";
import AdSenseUnit from "@/components/ads/AdSenseUnit";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050713] text-white">
      <div className="fixed inset-0 -z-50 bg-[#050713]" />
      <div className="pointer-events-none fixed inset-0 -z-40 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:96px_96px]" />

      <div className="relative z-50">
        <NavBar />
      </div>

      <section className="relative z-10">
        <HeroSection />
      </section>

      <div className="relative z-20">
        <VisionSection />
        <HowItWorksSection />
        <SecuritySection />
        <AdSenseUnit slot={process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT} />
        <PricingSection />
        <DownloadSection />
        <FAQSection />
        <Footer />
      </div>
    </main>
  );
}
