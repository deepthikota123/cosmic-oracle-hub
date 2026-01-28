import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HelpCircle, TrendingUp, Clock, Briefcase, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingSocial } from '@/components/FloatingSocial';
import { ParticleStars } from '@/components/ParticleStars';

const services = [
  {
    id: 'quick-clarity',
    name: 'Quick Clarity',
    price: '₹221',
    description: 'One Question + Current Phase Analysis',
    details: 'Get honest direction and clarity on a single burning question. Perfect for quick decisions and immediate guidance.',
    features: ['One focused question', 'Current life phase analysis', 'Honest direction & clarity', 'Practical next steps'],
    duration: '8-10 minutes',
    icon: HelpCircle,
    gradient: 'from-purple-500 to-blue-500',
  },
  {
    id: 'life-career',
    name: 'Life & Career',
    price: '₹351',
    description: 'Career/Studies Growth Direction',
    details: 'Comprehensive guidance for your professional and academic journey. Understand your growth trajectory for the next 6-12 months.',
    features: ['Career path analysis', 'Academic guidance', '6-12 month forecast', 'Growth opportunities revealed'],
    duration: '15-18 minutes',
    icon: TrendingUp,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'future-timing',
    name: 'Future & Timing',
    price: '₹501',
    description: 'Career + Money Opportunity Period',
    details: 'Deep dive into your financial and career timing. Learn when opportunities will arise and what blocks to overcome.',
    features: ['Career opportunity timing', 'Financial period analysis', 'Major block explanation', 'Strategic planning insights'],
    duration: '25-30 minutes',
    icon: Clock,
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    id: 'placement-job',
    name: 'Placement/Job Insights',
    price: '₹199',
    description: 'Upcoming Job/Placement Guidance',
    details: 'Targeted guidance for job seekers and students. Get timing insights and preparation tips for your next opportunity.',
    features: ['Job/placement timing', 'Opportunity analysis', 'Preparation strategies', 'Interview timing'],
    duration: '10-12 minutes',
    icon: Briefcase,
    gradient: 'from-amber-500 to-orange-500',
  },
];

const Services = () => {
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
              <span className="holographic-text">Our Services</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the consultation package that aligns with your cosmic needs. Each session is personalized for your unique journey.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <div className="pricing-card h-full flex flex-col lg:flex-row gap-6">
                  {/* Icon Section */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-neon group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                      <h2 className="font-heading text-2xl font-bold text-foreground">
                        {service.name}
                      </h2>
                      <span className="font-display text-3xl font-black text-cosmic-gold text-glow-gold">
                        {service.price}
                      </span>
                    </div>

                    <p className="text-foreground/90 font-medium mb-2">
                      {service.description}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4">
                      {service.details}
                    </p>

                    {/* Features */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Duration & CTA */}
                    <div className="flex items-center justify-between flex-wrap gap-4 mt-auto pt-4 border-t border-border/30">
                      <span className="px-3 py-1.5 rounded-full bg-secondary/50 text-xs font-medium text-foreground/80">
                        ⏱️ {service.duration}
                      </span>
                      <Link
                        to={`/booking?plan=${service.id}`}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-cosmic text-white font-heading font-semibold text-sm hover:shadow-neon transition-all group/btn"
                      >
                        Book Now
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="glass-card inline-block px-8 py-6">
              <p className="text-foreground font-medium mb-2">
                💫 All sessions are conducted via phone/video call
              </p>
              <p className="text-muted-foreground text-sm">
                Contact us on WhatsApp: +91 62300-16403 for scheduling
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
