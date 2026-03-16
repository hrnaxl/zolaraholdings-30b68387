import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Target, Eye, Shield } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Strategy",
    description: "Defining clear investment objectives and growth pathways for each subsidiary with disciplined capital allocation."
  },
  {
    icon: Eye,
    title: "Operational Oversight",
    description: "Continuous monitoring of business performance, ensuring alignment with corporate standards and best practices."
  },
  {
    icon: Shield,
    title: "Asset Protection",
    description: "Safeguarding company assets through robust risk management, compliance, and corporate governance frameworks."
  }
];

const GovernanceSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section className="section-padding bg-charcoal-light relative">
      <div className="absolute top-0 left-0 right-0 gold-line" />
      
      <div ref={ref} className="container-luxury">
        <div className="text-center mb-16">
          <span className={`inline-block text-xs tracking-[0.3em] text-primary uppercase mb-6 scroll-headline ${isVisible ? 'visible' : ''}`}>
            Corporate Structure
          </span>
          <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl tracking-wide mb-6 text-foreground heading-hover scroll-headline stagger-1 ${isVisible ? 'visible' : ''}`}>
            Governance Pillars
          </h2>
          <div className={`w-16 h-px bg-primary mx-auto mb-8 scroll-fade-in stagger-2 ${isVisible ? 'visible' : ''}`} />
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto font-light scroll-slide-up stagger-3 ${isVisible ? 'visible' : ''}`}>
            Our governance framework ensures sustainable growth and stakeholder value through three core pillars.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <div 
              key={pillar.title}
              className={`group bg-card p-8 rounded-lg border border-border/30 card-shadow hover:border-primary/40 transition-all duration-500 scroll-card-fade stagger-${index + 3} ${isVisible ? 'visible' : ''}`}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <pillar.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 heading-hover">{pillar.title}</h3>
              <p className="text-muted-foreground font-light leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GovernanceSection;
