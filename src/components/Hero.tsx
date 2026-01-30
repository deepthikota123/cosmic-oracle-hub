import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-astrologer.jpg';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={heroImage}
          alt="Cosmic Astrologer"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {/* Brand Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-primary/40 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Premium Astrology Consultations</span>
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-black mb-4 drop-shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--cosmic-gold)), hsl(var(--primary)))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 20px hsl(var(--primary) / 0.4))',
            }}
          >
            CosmOracle
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-heading text-2xl sm:text-3xl text-cosmic-gold font-bold mb-6 drop-shadow-lg"
            style={{
              textShadow: '0 2px 20px hsl(var(--cosmic-gold) / 0.5)',
            }}
          >
            Jeevan Ka GPS
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base sm:text-lg text-foreground/90 max-w-lg mx-auto mb-10 leading-relaxed bg-background/50 backdrop-blur-sm rounded-lg px-4 py-3"
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
              className="px-8 py-4 rounded-full text-base sm:text-lg font-heading font-medium border-2 border-primary/50 text-foreground hover:border-primary hover:bg-primary/10 transition-all w-full sm:w-auto text-center backdrop-blur-sm bg-background/30"
            >
              See Reviews
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm bg-background/60 backdrop-blur-sm rounded-full px-6 py-3 mx-auto w-fit"
          >
            <div className="flex items-center gap-2">
              <span className="text-cosmic-gold">★★★★★</span>
              <span className="text-foreground/80">200+ Clients</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="text-foreground/80">Starting ₹199</div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="text-foreground/80">Same Day Readings</div>
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
