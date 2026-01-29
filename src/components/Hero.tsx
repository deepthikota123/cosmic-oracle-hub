import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-astrologer.jpg';

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
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Floating Star Particles - reduced for cleaner look */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="star-particle"
          style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 3 + 's',
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Brand Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Premium Astrology Consultations</span>
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black holographic-text mb-3"
          >
            CosmOracle
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-heading text-xl sm:text-2xl md:text-3xl text-cosmic-gold font-semibold mb-8 text-glow-gold"
          >
            Jeevan Ka GPS
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base sm:text-lg text-foreground/80 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Get clarity on career, relationships, and life decisions with personalized cosmic guidance from expert astrologers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/booking"
              className="btn-glow px-8 py-4 rounded-full text-base sm:text-lg font-display font-semibold text-primary-foreground flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              Book Your Reading
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about#testimonials"
              className="px-8 py-4 rounded-full text-base sm:text-lg font-heading font-medium border-2 border-primary/50 text-foreground hover:border-primary hover:bg-primary/10 transition-all w-full sm:w-auto text-center"
            >
              See Reviews
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="text-cosmic-gold">★★★★★</span>
              <span>200+ Clients</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div>Starting ₹199</div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div>Same Day Readings</div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
