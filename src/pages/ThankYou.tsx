import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Home, ArrowRight } from 'lucide-react';
import { ConfettiAnimation } from '@/components/ConfettiAnimation';
import { ParticleStars } from '@/components/ParticleStars';
import logo from '@/assets/logo.png';

const ThankYou = () => {
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <ParticleStars />
      <ConfettiAnimation />

      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Logo */}
          <motion.img
            src={logo}
            alt="CosmOracle"
            className="h-20 w-auto mx-auto mb-8 logo-holographic"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          />

          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-cosmic flex items-center justify-center shadow-neon"
          >
            <Sparkles className="w-12 h-12 text-white" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl font-bold mb-4"
          >
            <span className="holographic-text">Cosmic Session Booked!</span>
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-foreground/90 mb-2"
          >
            Your cosmic session is booked! 🌟
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-muted-foreground mb-8"
          >
            We'll connect with you soon to schedule your reading.
          </motion.p>

          {/* Info Box */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="glass-card p-6 mb-8"
          >
            <h3 className="font-heading font-semibold text-foreground mb-3">
              What happens next?
            </h3>
            <ul className="text-left text-muted-foreground space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                We'll verify your payment within 24 hours
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                You'll receive a WhatsApp message to schedule your session
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                Prepare your questions for a meaningful reading
              </li>
            </ul>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary/50 text-foreground hover:border-primary hover:bg-primary/10 transition-all font-heading font-medium"
            >
              <Home size={18} />
              Back to Home
            </Link>
            <a
              href="https://wa.me/916230016403"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow flex items-center gap-2 px-6 py-3 rounded-full text-primary-foreground font-heading font-semibold"
            >
              Contact on WhatsApp
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYou;
