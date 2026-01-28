import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const colors = ['#8B5CF6', '#3B82F6', '#06B6D4', '#FBBF24', '#EC4899'];

interface ConfettiParticle {
  id: number;
  x: number;
  color: string;
  delay: number;
}

export const ConfettiAnimation = () => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    const newParticles: ConfettiParticle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
      });
    }
    setParticles(newParticles);

    // Clear after animation
    const timer = setTimeout(() => setParticles([]), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: `${particle.x}vw`,
              y: -20,
              rotate: 0,
              scale: 1,
            }}
            animate={{
              y: '100vh',
              rotate: 720,
              scale: [1, 1.2, 0.8, 1],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: particle.delay,
              ease: 'easeOut',
            }}
            className="absolute w-3 h-3 rounded-sm"
            style={{ backgroundColor: particle.color }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
