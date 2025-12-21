import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CEOSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="section-padding bg-background relative">
      <div ref={ref} className={`container-luxury scroll-fade-in ${isVisible ? 'visible' : ''}`}>
        <div className="max-w-4xl mx-auto">
          {/* Section label */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs tracking-[0.3em] text-primary uppercase mb-6">
              Leadership
            </span>
            
            <h2 className="font-heading text-3xl md:text-4xl tracking-wide text-foreground">
              Message From The Executive Director
            </h2>
            
            <div className="w-16 h-px bg-primary mx-auto mt-8" />
          </div>
          
          {/* Quote content */}
          <div className="relative">
            {/* Opening quote mark */}
            <span className="absolute -top-8 -left-4 text-8xl text-primary/20 font-heading font-semibold select-none">
              "
            </span>
            
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed pl-8 md:pl-12">
              <p className="text-lg md:text-xl lg:text-2xl">
                As the founder and Executive Director, I built Zolara Holdings with one purpose—to create businesses that last. Our goal is not just to open companies, but to build strong, disciplined brands that will serve communities and stand the test of time.
              </p>
              
              <p className="text-lg md:text-xl lg:text-2xl">
                Zolara Holdings is built on structure and vision. We believe in protecting assets, developing people, and creating opportunities. Every business we launch is part of a bigger plan: long-term growth, wealth creation, and excellence.
              </p>
              
              <p className="text-lg md:text-xl lg:text-2xl">
                I am proud of where we are, and even more excited about where we are going.
              </p>
            </div>
            
            {/* Signature */}
            <div className="mt-12 pl-8 md:pl-12">
              <div className="w-24 h-px bg-primary/50 mb-6" />
              <p className="font-heading text-xl text-primary tracking-wide">
                Haruna Salifu
              </p>
              <p className="text-sm text-muted-foreground tracking-wide mt-1">
                Executive Director
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;
