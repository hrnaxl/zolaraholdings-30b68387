import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const MissionVisionSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="mission" className="section-padding bg-charcoal-light relative">
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 gold-line" />
      
      <div ref={ref} className={`container-luxury scroll-fade-in ${isVisible ? 'visible' : ''}`}>
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {/* Mission */}
          <div className="text-center md:text-left">
            <span className="inline-block text-xs tracking-[0.3em] text-primary uppercase mb-6">
              Our Mission
            </span>
            
            <h3 className="font-heading text-3xl md:text-4xl font-semibold tracking-wide mb-6 text-foreground">
              Strategic Growth
            </h3>
            
            <div className="w-12 h-px bg-primary mb-8 mx-auto md:mx-0" />
            
            <p className="text-muted-foreground font-light leading-relaxed text-lg md:text-xl">
              To grow high-value businesses through smart investment and disciplined leadership.
            </p>
          </div>
          
          {/* Vision */}
          <div className="text-center md:text-left">
            <span className="inline-block text-xs tracking-[0.3em] text-primary uppercase mb-6">
              Our Vision
            </span>
            
            <h3 className="font-heading text-3xl md:text-4xl font-semibold tracking-wide mb-6 text-foreground">
              African Leadership
            </h3>
            
            <div className="w-12 h-px bg-primary mb-8 mx-auto md:mx-0" />
            
            <p className="text-muted-foreground font-light leading-relaxed text-lg md:text-xl">
              To become one of Africa's leading holding companies, known for strong brands and long-term success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
