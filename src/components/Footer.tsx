import shieldLogo from "@/assets/shield-logo.png";

const Footer = () => {
  return (
    <footer className="relative">
      {/* Elegant gold line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      
      <div className="py-8 bg-charcoal-light">
        <div className="container-luxury">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo and company name */}
            <div className="flex items-center gap-3">
              <img 
                src={shieldLogo} 
                alt="Zolara Holdings" 
                className="w-8 h-8 object-contain opacity-60"
              />
              <p className="font-heading text-xs tracking-[0.3em] text-primary">
                ZOLARA HOLDINGS LTD
              </p>
            </div>
            
            {/* Copyright */}
            <p className="text-xs text-muted-foreground font-light">
              © 2025 Zolara Holdings Ltd. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
