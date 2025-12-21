const values = [
  { title: "Integrity", description: "Honesty in every decision" },
  { title: "Focus", description: "Disciplined execution" },
  { title: "Leadership", description: "Guiding with vision" },
  { title: "Excellence", description: "Pursuing the highest standard" },
];

const ValuesSection = () => {
  return (
    <section className="section-padding bg-background relative">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <span className="inline-block text-xs tracking-[0.3em] text-primary uppercase mb-6">
            What Guides Us
          </span>
          
          <h2 className="font-heading text-3xl md:text-4xl tracking-wide text-foreground">
            Core Values
          </h2>
          
          <div className="w-16 h-px bg-primary mx-auto mt-8" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {values.map((value, index) => (
            <div 
              key={value.title}
              className="text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-6 border border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(43_74%_49%/0.2)] transition-all duration-500">
                <span className="font-heading text-2xl text-primary">
                  {value.title.charAt(0)}
                </span>
              </div>
              
              <h4 className="font-heading text-lg tracking-wide text-foreground mb-2">
                {value.title}
              </h4>
              
              <p className="text-sm text-muted-foreground font-light">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
