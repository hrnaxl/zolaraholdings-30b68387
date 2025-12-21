import { Button } from "@/components/ui/button";
import shieldLogo from "@/assets/shield-logo.png";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-charcoal-light" />
      
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(43_74%_49%/0.05)_0%,_transparent_70%)]" />
      
      {/* Decorative lines */}
      <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container-luxury relative z-10 text-center pt-20">
        {/* Shield emblem */}
        <div 
          className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <img 
            src={shieldLogo} 
            alt="Zolara Holdings Emblem" 
            className="w-24 h-24 mx-auto object-contain"
          />
        </div>
        
        {/* Main headline */}
        <h1 
          className={`font-heading text-4xl md:text-5xl lg:text-7xl tracking-wide mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.3s' }}
        >
          <span className="block text-foreground">Building Businesses</span>
          <span className="block gold-gradient-text mt-2">That Last</span>
        </h1>
        
        {/* Sub-headline */}
        <p 
          className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.5s' }}
        >
          Zolara Holdings is a strategic investment and operating company focused on investing, building, and scaling businesses across Ghana and Africa.
        </p>
        
        {/* CTA Button */}
        <div 
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0.7s' }}
        >
          <Button 
            variant="luxury" 
            size="xl"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Us
          </Button>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '1s' }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
