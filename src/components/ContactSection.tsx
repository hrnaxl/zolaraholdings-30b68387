import { Mail, Phone, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section id="contact" className="section-padding bg-background relative">
      <div ref={ref} className="container-luxury">
        <div className="max-w-2xl mx-auto text-center">
          <span className={`inline-block text-xs tracking-[0.3em] text-primary uppercase mb-6 scroll-headline ${isVisible ? 'visible' : ''}`}>
            Get In Touch
          </span>
          
          <h2 className={`font-heading text-3xl md:text-4xl tracking-wide text-foreground mb-4 scroll-headline stagger-1 ${isVisible ? 'visible' : ''}`}>
            Contact Us
          </h2>
          
          <div className={`w-16 h-px bg-primary mx-auto mt-8 mb-12 scroll-fade-in stagger-2 ${isVisible ? 'visible' : ''}`} />
          
          <div className="space-y-8">
            {/* Email */}
            <a 
              href="mailto:info@zolaraholdings.com"
              className={`flex items-center justify-center gap-4 text-muted-foreground hover:text-primary transition-colors duration-300 group scroll-slide-up stagger-3 ${isVisible ? 'visible' : ''}`}
            >
              <Mail className="w-5 h-5 text-primary/70 group-hover:text-primary" />
              <span className="text-lg md:text-xl font-light">info@zolaraholdings.com</span>
            </a>
            
            {/* Phone 1 */}
            <a 
              href="tel:+233594922679"
              className={`flex items-center justify-center gap-4 text-muted-foreground hover:text-primary transition-colors duration-300 group scroll-slide-up stagger-4 ${isVisible ? 'visible' : ''}`}
            >
              <Phone className="w-5 h-5 text-primary/70 group-hover:text-primary" />
              <span className="text-lg md:text-xl font-light">+233 594 922 679</span>
            </a>
            
            {/* Phone 2 */}
            <a 
              href="tel:+233249978750"
              className={`flex items-center justify-center gap-4 text-muted-foreground hover:text-primary transition-colors duration-300 group scroll-slide-up stagger-4 ${isVisible ? 'visible' : ''}`}
            >
              <Phone className="w-5 h-5 text-primary/70 group-hover:text-primary" />
              <span className="text-lg md:text-xl font-light">+233 249 978 750</span>
            </a>
            
            {/* Address */}
            <div className={`flex items-center justify-center gap-4 text-muted-foreground scroll-slide-up stagger-5 ${isVisible ? 'visible' : ''}`}>
              <MapPin className="w-5 h-5 text-primary/70" />
              <span className="text-lg md:text-xl font-light">Tamale, Ghana</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
