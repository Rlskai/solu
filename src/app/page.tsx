import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import DeprecationsSection from "@/components/DeprecationsSection";
import TracingSection from "@/components/TracingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <DeprecationsSection />
      <TracingSection />
      <Footer />
    </div>
  );
}
