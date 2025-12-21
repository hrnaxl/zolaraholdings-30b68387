import shieldLogo from "@/assets/shield-logo.png";
import ThemeToggle from "./ThemeToggle";
const Header = () => {
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container-luxury">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3 group">
            <img alt="Zolara Holdings Shield Logo" className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110" src="/lovable-uploads/7f23685a-b0f1-4273-a27a-829ebbae7b29.png" />
            <span className="font-heading text-lg tracking-widest text-primary">
              ZOLARA
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
    </header>;
};
export default Header;