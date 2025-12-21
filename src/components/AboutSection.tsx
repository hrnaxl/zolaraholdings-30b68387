import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section id="about" className="section-padding bg-charcoal-light relative">
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 gold-line" />
      
      <div ref={ref} className="container-luxury">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section label */}
          <span className={`inline-block text-xs tracking-[0.3em] text-primary uppercase mb-6 scroll-headline ${isVisible ? 'visible' : ''}`}>
            Who We Are
          </span>
          
          <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl tracking-wide mb-8 text-foreground heading-hover scroll-headline stagger-1 ${isVisible ? 'visible' : ''}`}>
            About Zolara Holdings
          </h2>
          
          <div className={`w-16 h-px bg-primary mx-auto mb-10 scroll-fade-in stagger-2 ${isVisible ? 'visible' : ''}`} />
          
          <p className={`text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed mb-10 scroll-slide-up stagger-3 ${isVisible ? 'visible' : ''}`}>
            We are a Ghanaian holding company focused on developing, owning, and managing businesses across beauty, wellness, real estate, logistics, and hospitality sectors. Our role is to provide leadership, capital, and strategy—helping each business grow with strength and stability.
          </p>
          
          <div className={`scroll-fade-in stagger-4 ${isVisible ? 'visible' : ''}`}>
            <Button 
              variant="outline" 
              className="group border-primary/40 text-primary hover:bg-primary/10 hover:border-primary button-hover"
              onClick={() => window.open('#', '_blank')}
            >
              <Download className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              Download Company Profile
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
