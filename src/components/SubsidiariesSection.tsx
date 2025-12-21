import { Sparkles, Heart, Building2, Truck, Hotel } from "lucide-react";

const subsidiaries = [
  {
    name: "Zolara Beauty Studio",
    description: "Luxury beauty services",
    icon: Sparkles,
  },
  {
    name: "Zolara Pharma & Wellness",
    description: "Pharmacy and wellness retail",
    icon: Heart,
  },
  {
    name: "Zolara Properties",
    description: "Real estate investment",
    icon: Building2,
  },
  {
    name: "Zolara Logistics",
    description: "Supply and distribution planning",
    icon: Truck,
  },
  {
    name: "Zolara Hospitality",
    description: "Future accommodation development",
    icon: Hotel,
  },
];

const SubsidiariesSection = () => {
  return (
    <section id="subsidiaries" className="section-padding bg-charcoal-light relative">
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 gold-line" />
      
      <div className="container-luxury">
        <div className="text-center mb-16">
          <span className="inline-block text-xs tracking-[0.3em] text-primary uppercase mb-6">
            Our Portfolio
          </span>
          
          <h2 className="font-heading text-3xl md:text-4xl tracking-wide text-foreground">
            Subsidiaries & Divisions
          </h2>
          
          <div className="w-16 h-px bg-primary mx-auto mt-8" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {subsidiaries.map((subsidiary, index) => (
            <div 
              key={subsidiary.name}
              className="group p-8 border border-border/50 bg-background/50 hover:border-primary/50 hover:bg-background transition-all duration-500"
            >
              <subsidiary.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
              
              <h4 className="font-heading text-xl tracking-wide text-foreground mb-3">
                {subsidiary.name}
              </h4>
              
              <p className="text-muted-foreground font-light">
                {subsidiary.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Why We Exist */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <div className="w-16 h-px bg-primary mx-auto mb-10" />
          
          <p className="text-lg text-muted-foreground font-light leading-relaxed italic">
            "We centralise finance, branding, and operations to reduce risk and help our businesses scale faster."
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubsidiariesSection;
