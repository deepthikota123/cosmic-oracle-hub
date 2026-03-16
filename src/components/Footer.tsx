import { Instagram, Mail, Phone, MessageCircle } from 'lucide-react';
import logo from '@/assets/logo.png';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/20 bg-background/60 backdrop-blur-lg">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmic-gold/20 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Niyati-Nivriti" className="h-10 w-auto logo-holographic" />
              <div>
                <h3 className="font-display text-base font-bold text-cosmic-gold text-glow-gold">CosmOracle</h3>
                <p className="text-[10px] text-muted-foreground tracking-wider uppercase">by Niyati-Nivriti</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Unlock Your Cosmic Path with premium astrology consultations.
              Jeevan Ka GPS — Your guide to life, career, love & destiny.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-xs tracking-widest uppercase text-cosmic-gold/80 mb-4">Services</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>Placement/Job Insights – ₹199</li>
              <li>Quick Clarity – ₹221</li>
              <li>Life & Career – ₹351</li>
              <li>Future & Timing – ₹501</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xs tracking-widest uppercase text-cosmic-gold/80 mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="tel:+916230016403" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-cosmic-gold transition-colors">
                  <Phone size={12} /> +91 62300-16403
                </a>
              </li>
              <li>
                <a href="mailto:niyati.nivriti@gmail.com" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-cosmic-gold transition-colors">
                  <Mail size={12} /> niyati.nivriti@gmail.com
                </a>
              </li>
              <li>
                <a href="https://instagram.com/cosmoracle123" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-cosmic-gold transition-colors">
                  <Instagram size={12} /> @cosmoracle123
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-muted-foreground/60">
            © {currentYear} CosmOracle by Niyati-Nivriti. All Rights Reserved. | Privacy Policy
          </p>
          <div className="flex items-center gap-3">
            <a href="https://instagram.com/cosmoracle123" target="_blank" rel="noopener noreferrer" className="social-icon text-muted-foreground/50 hover:text-cosmic-gold">
              <Instagram size={16} />
            </a>
            <a href="https://wa.me/916230016403" target="_blank" rel="noopener noreferrer" className="social-icon text-muted-foreground/50 hover:text-cosmic-gold">
              <MessageCircle size={16} />
            </a>
            <a href="mailto:niyati.nivriti@gmail.com" className="social-icon text-muted-foreground/50 hover:text-cosmic-gold">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
