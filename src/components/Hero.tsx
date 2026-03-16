import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import cosmicBoy from '@/assets/cosmic-sage-boy.png';

interface HeroProps {
  onBookNow: () => void;
}

export const Hero = ({ onBookNow }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient background orbs */}
      <div className="ambient-orb w-[600px] h-[600px] top-[-10%] left-[-10%]" />
      <div className="ambient-orb w-[500px] h-[500px] bottom-[-10%] right-[-10%]" style={{ background: 'radial-gradient(circle, hsl(42 85% 55% / 0.08) 0%, transparent 70%)' }} />
      <div className="ambient-orb w-[400px] h-[400px] top-[40%] right-[20%]" style={{ background: 'radial-gradient(circle, hsl(220 70% 55% / 0.1) 0%, transparent 70%)' }} />

      {/* Cosmic Sage Boy - Ethereal floating character */}
      <motion.div
        className="absolute z-10 pointer-events-none"
        style={{ right: '-2%', bottom: '5%' }}
        animate={{
          y: [0, -15, 0, -8, 0],
          x: [0, 5, 0, -5, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.img
          src={cosmicBoy}
          alt="Cosmic Sage Guide"
          className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] object-contain opacity-40 sm:opacity-50 md:opacity-60"
          style={{
            filter: 'drop-shadow(0 0 40px hsl(270 60% 50% / 0.4)) drop-shadow(0 0 80px hsl(42 85% 55% / 0.2))',
          }}
          animate={{ rotate: [0, 1, -1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          {/* Luxury Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cosmic-gold/30 bg-card/40 backdrop-blur-md mb-10"
          >
            <Sparkles className="w-4 h-4 text-cosmic-gold" />
            <span className="text-xs font-body font-medium tracking-widest uppercase text-cosmic-gold/90">
              Premium Astrology Consultations
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            style={{
              background: 'linear-gradient(135deg, hsl(42 85% 60%), hsl(42 85% 50%), hsl(35 80% 45%), hsl(42 85% 60%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 30px hsl(42 85% 55% / 0.3))',
            }}
          >
            CosmOracle
          </motion.h1>

          {/* Subtitle - Kinetic Typography */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-display text-sm sm:text-base tracking-[0.25em] uppercase text-cosmic-gold/80 mb-3"
          >
            Unlock Your Destiny
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-heading text-2xl sm:text-3xl md:text-4xl italic text-foreground/90 font-medium mb-8"
            style={{
              textShadow: '0 2px 20px hsl(42 85% 55% / 0.2)',
            }}
          >
            Jeevan Ka GPS
          </motion.p>

          {/* Bio Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10 font-body"
          >
            From the fog of confusion to the light of cosmic clarity — personalized astrology 
            consultations that reveal your true path in career, love, timing, and life's biggest 
            decisions with ancient wisdom meets modern precision.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <button
              onClick={onBookNow}
              className="btn-gold px-8 py-4 rounded-full text-sm sm:text-base flex items-center gap-3 group w-full sm:w-auto justify-center"
            >
              Book Your Reading
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#services"
              className="px-8 py-4 rounded-full text-sm sm:text-base font-heading font-semibold border border-cosmic-gold/30 text-foreground/90 hover:border-cosmic-gold/60 hover:bg-cosmic-gold/5 transition-all w-full sm:w-auto text-center backdrop-blur-sm"
            >
              Explore Services
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm">
              <span className="text-cosmic-gold">★★★★★</span>
              <span className="text-foreground/70">200+ Happy Souls</span>
            </div>
            <div className="px-4 py-2 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm text-foreground/70">
              Same-Day Readings
            </div>
            <div className="px-4 py-2 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm text-foreground/70">
              Starting ₹199
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 border border-cosmic-gold/30 rounded-full flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 bg-cosmic-gold/60 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
