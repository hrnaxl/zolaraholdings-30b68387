import { useState, useEffect } from "react";
import shieldLogo from "@/assets/shield-logo.png";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setHasAnimated(true), 100);
    
    // Disable animation during scroll
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container-luxury">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3 group">
            <div className={`logo-reveal ${hasAnimated ? 'revealed' : ''} ${isScrolling ? 'no-shine' : ''}`}>
              <img 
                alt="Zolara Holdings Shield Logo" 
                className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110 logo-with-shadow" 
                src="/lovable-uploads/7f23685a-b0f1-4273-a27a-829ebbae7b29.png" 
              />
            </div>
            <span className="font-heading tracking-widest text-primary">
              <span className="text-3xl">ZOLARA</span>
              <span className="ml-1 text-base">HOLDINGS LTD </span>
            </span>
          </a>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300">
                About
              </a>
              <a href="#mission" className="text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300">
                Mission
              </a>
              <a href="#subsidiaries" className="text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300">
                Subsidiaries
              </a>
              <a href="#contact" className="text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300">
                Contact
              </a>
            </nav>
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;