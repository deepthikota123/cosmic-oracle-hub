import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo.png';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-border/30 bg-background/50 backdrop-blur-lg">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-cosmic opacity-50" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Niyati-Nivriti Logo"
                className="h-10 w-auto logo-holographic"
              />
              <div>
                <h3 className="font-display text-lg font-bold holographic-text">
                  CosmOracle
                </h3>
                <p className="text-xs text-muted-foreground">by Niyati-Nivriti</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Unlock Your Cosmic Path with premium astrology & psychic consultations.
              Jeevan Ka GPS – Your guide to life, career, love & destiny.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'Services', 'Book Now', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-').replace('book-now', 'booking').replace('about-us', 'about')}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Quick Clarity – ₹221</li>
              <li>Life & Career – ₹351</li>
              <li>Future & Timing – ₹501</li>
              <li>Placement/Job Insights – ₹199</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Connect With Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={16} className="text-primary" />
                <a href="tel:+916230016403" className="hover:text-primary transition-colors">
                  +91 62300-16403
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={16} className="text-primary" />
                <a href="mailto:cosmorackle123@gmail.com" className="hover:text-primary transition-colors">
                  cosmorackle123@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Instagram size={16} className="text-primary" />
                <a
                  href="https://instagram.com/cosmoracle123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  @cosmoracle123
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={16} className="text-primary mt-0.5" />
                <span>Pimpri, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {currentYear} CosmOracle by Niyati-Nivriti | Pimpri, Maharashtra | All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/cosmoracle123"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon text-muted-foreground hover:text-pink-500"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://wa.me/916230016403"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon text-muted-foreground hover:text-green-500"
            >
              <Phone size={20} />
            </a>
            <a
              href="mailto:cosmorackle123@gmail.com"
              className="social-icon text-muted-foreground hover:text-accent"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
