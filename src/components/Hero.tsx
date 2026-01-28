import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-astrologer.jpg';

const floatingQuotes = [
  { text: 'Manifest Your Stars, Slay Your Fate 🔥', delay: 0 },
  { text: 'Vibe Check Your Universe 🌌', delay: 2 },
  { text: 'Cosmic Glow-Up Activated ✨', delay: 4 },
  { text: 'Orbit Your Dream Job 🌍✨', delay: 6 },
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Cosmic Astrologer"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
      </div>

      {/* Floating Star Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="star-particle"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 3 + 's',
          }}
        />
      ))}

      {/* Floating Quotes */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {floatingQuotes.map((quote, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: quote.delay * 0.5, duration: 0.8 }}
            className="quote-bubble absolute hidden lg:block text-sm"
            style={{
              top: 20 + i * 18 + '%',
              left: i % 2 === 0 ? '5%' : 'auto',
              right: i % 2 === 0 ? 'auto' : '5%',
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {quote.text}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black holographic-text mb-4"
          >
            CosmOracle
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-heading text-xl sm:text-2xl md:text-3xl text-cosmic-gold font-semibold mb-6 text-glow-gold"
          >
            Jeevan Ka GPS
          </motion.p>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8"
          >
            <span className="text-glow">WAYS TO BEGIN!</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Unlock your cosmic path with premium astrology & psychic consultations.
            Get clarity on life, career, love, and destiny.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/booking"
              className="btn-glow px-8 py-4 rounded-full text-lg font-display font-semibold text-primary-foreground flex items-center gap-2 group"
            >
              Book Your Reading Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about#testimonials"
              className="px-8 py-4 rounded-full text-lg font-heading font-medium border-2 border-primary/50 text-foreground hover:border-primary hover:bg-primary/10 transition-all"
            >
              See Reviews
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
