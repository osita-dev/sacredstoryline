import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhySupportSection from "@/components/WhySupportSection";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <WhySupportSection />
      <DonationSection />
      <Footer />
    </div>
  );
};

export default Index;
