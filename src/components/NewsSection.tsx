import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Calendar } from "lucide-react";

const newsItems = [
  {
    date: "Coming Soon",
    title: "Zolara Holdings Official Launch",
    excerpt: "Details of our official group formation and strategic vision announcement.",
  },
  {
    date: "Coming Soon",
    title: "Zolara Beauty Studio Grand Opening",
    excerpt: "Celebrating the launch of our flagship beauty and wellness subsidiary.",
  },
  {
    date: "Coming Soon",
    title: "Real Estate Expansion Plans",
    excerpt: "Upcoming announcements regarding property development initiatives.",
  },
];

const NewsSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="section-padding bg-background relative">
      <div className="absolute top-0 left-0 right-0 gold-line" />
      
      <div ref={ref} className="container-luxury">
        <div className="text-center mb-16">
          <span className={`inline-block text-xs tracking-[0.3em] text-primary uppercase mb-6 scroll-headline ${isVisible ? 'visible' : ''}`}>
            Stay Informed
          </span>
          
          <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl tracking-wide mb-6 text-foreground heading-hover scroll-headline stagger-1 ${isVisible ? 'visible' : ''}`}>
            News & Announcements
          </h2>
          
          <div className={`w-16 h-px bg-primary mx-auto mb-8 scroll-fade-in stagger-2 ${isVisible ? 'visible' : ''}`} />
          
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto font-light scroll-slide-up stagger-3 ${isVisible ? 'visible' : ''}`}>
            Stay updated with the latest developments from Zolara Holdings and our subsidiaries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {newsItems.map((item, index) => (
            <div 
              key={item.title}
              className={`group bg-card p-6 sm:p-8 border border-border/30 card-shadow hover:border-primary/40 transition-all duration-500 scroll-card-fade stagger-${index + 3} ${isVisible ? 'visible' : ''}`}
            >
              <div className="flex items-center gap-2 text-primary/70 mb-4">
                <Calendar className="w-4 h-4" />
                <span className="text-xs tracking-wider uppercase font-light">{item.date}</span>
              </div>
              
              <h3 className="font-heading text-lg sm:text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="text-muted-foreground font-light text-sm leading-relaxed">
                {item.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
