import { motion } from 'framer-motion';
import { Sparkles, Heart, Target, Shield, Zap, Users } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { FloatingSocial } from '@/components/FloatingSocial';
import { ParticleStars } from '@/components/ParticleStars';

const values = [
  { icon: Shield, label: 'Authenticity', desc: 'Genuine readings with no gimmicks' },
  { icon: Zap, label: 'Empowerment', desc: 'Guidance that strengthens you' },
  { icon: Heart, label: 'Positivity', desc: 'Focus on growth, not fear' },
  { icon: Target, label: 'Precision', desc: 'Accurate, specific insights' },
  { icon: Users, label: 'Inclusivity', desc: 'Welcoming all seekers' },
];

const About = () => {
  return (
    <div className="min-h-screen relative">
      <ParticleStars />
      <Header />
      <FloatingSocial />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="holographic-text">About CosmOracle</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empowering young souls with cosmic clarity since 2024
            </p>
          </motion.div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-cosmic flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                To empower young souls with accurate cosmic guidance, helping them navigate life's crossroads with confidence. We envision a world where everyone has access to meaningful astrological insights that inspire positive action and personal growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-cosmic flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                We blend the wisdom of Vedic astrology with psychic intuition and modern clarity to deliver consultations that are relevant, actionable, and empowering. Our mission is to make cosmic guidance accessible, practical, and genuinely helpful for the Gen-Z and millennial journey.
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="font-display text-3xl font-bold text-center mb-10">
              <span className="holographic-text">Our Values</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-card p-6 text-center group hover:border-primary/50 transition-colors"
                >
                  <value.icon className="w-10 h-10 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    {value.label}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="font-display text-3xl font-bold text-center mb-10">
              <span className="holographic-text">Meet Your Guide</span>
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="glass-card p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-cosmic p-1">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <span className="font-display text-4xl font-bold holographic-text">S</span>
                  </div>
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  Saurabh
                </h3>
                <p className="text-primary font-medium mb-4">
                  Lead Astrologer & Psychic Guide
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  With years of dedicated study in Vedic astrology and natural psychic abilities, Saurabh has guided 200+ clients through life's most important decisions. His approach combines traditional astrological wisdom with modern, practical insights tailored for today's generation. Based in Pimpri, Maharashtra, he's passionate about making cosmic guidance accessible and actionable for young adults seeking clarity in career, love, and life direction.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <TestimonialCarousel />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
