import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const timelineData = [
  { year: "2025", title: "Group Formation", description: "Establishment of Zolara Holdings Ltd as the parent company" },
  { year: "2026", title: "Real Estate Expansion", description: "Launch of real estate development and property management arm" },
  { year: "2027", title: "Pharma Establishment", description: "Entry into pharmaceutical distribution and healthcare sector" },
];

const TimelineSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section className="section-padding bg-background relative">
      <div className="absolute top-0 left-0 right-0 gold-line" />
      
      <div ref={ref} className="container-luxury">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className={`inline-block text-xs tracking-[0.3em] text-primary uppercase mb-6 scroll-headline ${isVisible ? 'visible' : ''}`}>
              Our Journey
            </span>
            <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl tracking-wide mb-6 text-foreground heading-hover scroll-headline stagger-1 ${isVisible ? 'visible' : ''}`}>
              Strategic Timeline
            </h2>
            <div className={`w-16 h-px bg-primary mx-auto scroll-fade-in stagger-2 ${isVisible ? 'visible' : ''}`} />
          </div>
          
          <div className="relative">
            {/* Vertical line */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/50 via-primary/30 to-transparent hidden md:block scroll-fade-in stagger-2 ${isVisible ? 'visible' : ''}`} />
            
            <div className="space-y-12 md:space-y-0">
              {timelineData.map((item, index) => (
                <div 
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 scroll-card-fade stagger-${index + 2} ${isVisible ? 'visible' : ''} ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } md:mb-16`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-card p-6 rounded-lg border border-border/30 card-shadow hover:border-primary/30 transition-all duration-300">
                      <span className="text-primary font-heading text-2xl md:text-3xl font-bold">{item.year}</span>
                      <h3 className="font-heading text-xl md:text-2xl text-foreground mt-2 mb-3">{item.title}</h3>
                      <p className="text-muted-foreground font-light">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Center dot */}
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/30 z-10 hidden md:block" />
                  
                  {/* Empty space for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
