import shieldLogo from "@/assets/shield-logo.png";

const Footer = () => {
  return (
    <footer className="py-12 bg-charcoal-light border-t border-border/30">
      <div className="container-luxury">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <img 
            src={shieldLogo} 
            alt="Zolara Holdings" 
            className="w-12 h-12 object-contain opacity-60 mb-6"
          />
          
          {/* Company name */}
          <p className="font-heading text-sm tracking-[0.3em] text-primary mb-4">
            ZOLARA HOLDINGS LTD
          </p>
          
          {/* Divider */}
          <div className="w-24 h-px bg-primary/30 mb-6" />
          
          {/* Copyright */}
          <p className="text-sm text-muted-foreground font-light">
            © 2025 Zolara Holdings Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
