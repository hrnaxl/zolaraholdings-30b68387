import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ExecutiveDirectorSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="section-padding bg-background relative">
      <div className="absolute top-0 left-0 right-0 gold-line" />
      
      <div ref={ref} className="container-luxury">
        <div className="max-w-5xl mx-auto">
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
          
          {/* Profile layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            {/* Portrait container - left side */}
            <div className={`lg:col-span-2 scroll-card-fade stagger-2 ${isVisible ? 'visible' : ''}`}>
              <div className="relative">
                {/* Gold frame border */}
                <div className="absolute inset-0 border-2 border-primary/40 transform translate-x-3 translate-y-3" />
                
                {/* Portrait placeholder */}
                <div className="relative bg-card border border-border/50 aspect-[3/4] flex items-center justify-center overflow-hidden">
                  {/* Placeholder content */}
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 border border-primary/30 flex items-center justify-center">
                      <span className="font-heading text-3xl text-primary">HS</span>
                    </div>
                    <p className="text-xs text-muted-foreground/60 tracking-wider uppercase">
                      Portrait Coming Soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Text content - right side */}
            <div className="lg:col-span-3 space-y-8">
              {/* Name */}
              <div className={`scroll-slide-up stagger-3 ${isVisible ? 'visible' : ''}`}>
                <span className="text-xs tracking-[0.2em] text-primary/70 uppercase block mb-2">
                  Name
                </span>
                <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl tracking-wide text-foreground">
                  Haruna Salifu
                </h3>
              </div>
              
              {/* Position */}
              <div className={`scroll-slide-up stagger-4 ${isVisible ? 'visible' : ''}`}>
                <span className="text-xs tracking-[0.2em] text-primary/70 uppercase block mb-2">
                  Position
                </span>
                <p className="text-lg md:text-xl text-foreground/90 font-light">
                  Founder & Executive Director
                </p>
              </div>
              
              {/* Divider */}
              <div className={`w-20 h-px bg-primary/40 scroll-fade-in stagger-4 ${isVisible ? 'visible' : ''}`} />
              
              {/* Biography */}
              <div className={`scroll-slide-up stagger-5 ${isVisible ? 'visible' : ''}`}>
                <span className="text-xs tracking-[0.2em] text-primary/70 uppercase block mb-4">
                  Biography
                </span>
                <p className="text-muted-foreground font-light leading-relaxed text-base md:text-lg">
                  Haruna Salifu is the founder and Executive Director of Zolara Holdings Ltd. His strategic leadership and vision drive Zolara's mission to build high-value companies across beauty, real estate, wellness, and logistics in Ghana. With a focus on discipline and structured investment, he leads the company with long-term planning, growth development, and operational excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveDirectorSection;
