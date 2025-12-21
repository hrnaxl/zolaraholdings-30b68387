import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CEOSection from "@/components/CEOSection";
import MissionVisionSection from "@/components/MissionVisionSection";
import ValuesSection from "@/components/ValuesSection";
import SubsidiariesSection from "@/components/SubsidiariesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <CEOSection />
      <MissionVisionSection />
      <ValuesSection />
      <SubsidiariesSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
