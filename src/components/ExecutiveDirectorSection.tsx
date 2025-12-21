import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ExecutiveDirectorSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="section-padding bg-background relative">
      <div className="absolute top-0 left-0 right-0 gold-line" />
      
      <div ref={ref} className="container-luxury">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className={`inline-block text-xs tracking-[0.3em] text-primary uppercase mb-6 scroll-headline ${isVisible ? 'visible' : ''}`}>
              Leadership
            </span>
            
            <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl tracking-wide text-foreground heading-hover scroll-headline stagger-1 ${isVisible ? 'visible' : ''}`}>
              Executive Director
            </h2>
            
            <div className={`w-16 h-px bg-primary mx-auto mt-8 scroll-fade-in stagger-2 ${isVisible ? 'visible' : ''}`} />
          </div>
          
          {/* Text content - centered */}
          <div className="space-y-8 text-center">
            {/* Name */}
            <div className={`scroll-slide-up stagger-3 ${isVisible ? 'visible' : ''}`}>
              <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl tracking-wide text-foreground">
                Haruna Salifu
              </h3>
            </div>
            
            {/* Position */}
            <div className={`scroll-slide-up stagger-4 ${isVisible ? 'visible' : ''}`}>
              <p className="text-lg md:text-xl text-foreground/90 font-light">
                Founder & Executive Director
              </p>
            </div>
            
            {/* Divider */}
            <div className={`w-20 h-px bg-primary/40 mx-auto scroll-fade-in stagger-4 ${isVisible ? 'visible' : ''}`} />
            
            {/* Biography */}
            <div className={`scroll-slide-up stagger-5 ${isVisible ? 'visible' : ''}`}>
              <p className="text-muted-foreground font-light leading-relaxed text-base md:text-lg">
                Haruna Salifu is the founder and Executive Director of Zolara Holdings Ltd. His strategic leadership and vision drive Zolara's mission to build high-value companies across beauty, real estate, wellness, and logistics in Ghana. With a focus on discipline and structured investment, he leads the company with long-term planning, growth development, and operational excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveDirectorSection;
