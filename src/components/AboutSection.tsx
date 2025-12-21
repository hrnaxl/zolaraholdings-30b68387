import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="about" className="section-padding bg-charcoal-light relative">
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 gold-line" />
      
      <div ref={ref} className={`container-luxury scroll-fade-in ${isVisible ? 'visible' : ''}`}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Section label */}
          <span className="inline-block text-xs tracking-[0.3em] text-primary uppercase mb-6">
            Who We Are
          </span>
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl tracking-wide mb-8 text-foreground">
            About Zolara Holdings
          </h2>
          
          <div className="w-16 h-px bg-primary mx-auto mb-10" />
          
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed">
            We are a Ghanaian holding company focused on developing, owning, and managing businesses across beauty, wellness, real estate, logistics, and hospitality sectors. Our role is to provide leadership, capital, and strategy—helping each business grow with strength and stability.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
