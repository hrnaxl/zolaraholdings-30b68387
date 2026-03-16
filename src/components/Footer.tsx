import shieldLogo from "@/assets/shield-logo.png";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
const Footer = () => {
  return <footer className="relative">
      {/* Elegant gold line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      
      <div className="py-10 bg-charcoal-light">
        <div className="container-luxury">
          <div className="flex flex-col gap-6">
            {/* Top row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Logo and company name */}
              <div className="flex items-center gap-3">
                <img alt="Zolara Holdings" className="w-8 h-8 object-contain opacity-60" src="/lovable-uploads/3b82dc33-96df-45f8-9e67-2223790513cd.png" />
                <p className="font-heading text-xs tracking-[0.3em] text-primary">
                  ZOLARA HOLDINGS LTD
                </p>
              </div>
              
              {/* SSL Badge */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-xs tracking-wide">SSL Secured • HTTPS Protected</span>
              </div>
            </div>
            
            {/* Middle row - Registration */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-light">
                Company Registration Number: ______________________
              </p>
            </div>
            
            {/* Bottom row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/30">
              {/* Copyright */}
              <p className="text-xs text-muted-foreground font-light">
                © 2025 Zolara Holdings Ltd. All Rights Reserved.
              </p>
              
              {/* Privacy Policy Link */}
              <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;