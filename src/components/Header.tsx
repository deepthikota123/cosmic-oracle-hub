import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

interface HeaderProps {
  onBookNow?: () => void;
}

export const Header = ({ onBookNow }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.img
              src={logo}
              alt="Niyati-Nivriti Logo"
              className="h-9 sm:h-11 w-auto logo-holographic"
              whileHover={{ scale: 1.05 }}
            />
            <div className="hidden sm:block">
              <h1 className="font-display text-sm font-bold text-cosmic-gold text-glow-gold tracking-wider">
                CosmOracle
              </h1>
              <p className="text-[9px] text-muted-foreground tracking-widest uppercase">Jeevan Ka GPS</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="font-body font-medium text-xs tracking-widest uppercase text-foreground/60 hover:text-cosmic-gold transition-colors duration-300"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={onBookNow}
              className="btn-gold px-6 py-2.5 rounded-full text-xs tracking-wider"
            >
              Book Reading
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground/70 hover:text-cosmic-gold transition-colors"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden pb-6 border-t border-border/10"
          >
            <ul className="flex flex-col gap-3 pt-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="block py-2 font-body text-sm text-foreground/70 hover:text-cosmic-gold"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); onBookNow?.(); }}
                  className="btn-gold inline-block px-6 py-2.5 rounded-full text-xs tracking-wider mt-2"
                >
                  Book Reading
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};
