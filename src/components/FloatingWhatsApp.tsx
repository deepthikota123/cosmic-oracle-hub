import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp = () => {
  const message = encodeURIComponent('Hi, I want to book a reading');

  return (
    <motion.a
      href={`https://wa.me/916230016403?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-cosmic-gold rounded-full animate-ping" />
    </motion.a>
  );
};
