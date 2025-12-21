import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CEOSection from "@/components/CEOSection";
import MissionVisionSection from "@/components/MissionVisionSection";
import ExecutiveDirectorSection from "@/components/ExecutiveDirectorSection";
import TimelineSection from "@/components/TimelineSection";
import ValuesSection from "@/components/ValuesSection";
import SubsidiariesSection from "@/components/SubsidiariesSection";
import GovernanceSection from "@/components/GovernanceSection";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background">
      <Header />
      <HeroSection />
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <CEOSection />
      <div className="section-divider" />
      <MissionVisionSection />
      <div className="section-divider" />
      <ExecutiveDirectorSection />
      <div className="section-divider" />
      <TimelineSection />
      <div className="section-divider" />
      <ValuesSection />
      <div className="section-divider" />
      <SubsidiariesSection />
      <div className="section-divider" />
      <GovernanceSection />
      <div className="section-divider" />
      <NewsSection />
      <div className="section-divider" />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
