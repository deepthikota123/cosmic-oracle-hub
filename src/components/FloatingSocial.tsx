import { Instagram, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const FloatingSocial = () => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
    >
      <a
        href="https://instagram.com/cosmoracle123"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:text-pink-500 social-icon group"
        aria-label="Instagram"
      >
        <Instagram size={22} />
        <span className="absolute right-14 bg-card px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          @cosmoracle123
        </span>
      </a>
      <a
        href="https://wa.me/916230016403"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:text-green-500 social-icon group"
        aria-label="WhatsApp"
      >
        <Phone size={22} />
        <span className="absolute right-14 bg-card px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          WhatsApp
        </span>
      </a>
      <a
        href="mailto:cosmorackle123@gmail.com"
        className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:text-accent social-icon group"
        aria-label="Email"
      >
        <Mail size={22} />
        <span className="absolute right-14 bg-card px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Email Us
        </span>
      </a>
    </motion.div>
  );
};
