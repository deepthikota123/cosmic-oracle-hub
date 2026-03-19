import { motion } from 'framer-motion';
import { ArrowRight, HelpCircle, TrendingUp, Clock, Briefcase, Sparkles } from 'lucide-react';

const plans = [
  {
    id: 'karmasthana-guide',
    name: 'Karmasthana Guide',
    subtitle: 'Placement Focus',
    price: '₹199',
    description: 'Upcoming Job/Placement Guidance',
    details: 'Opportunity Timing & Prep Tips',
    duration: '10-12 min',
    icon: Briefcase,
    popular: false,
  },
  {
    id: 'prashna-marg',
    name: 'Prashna Marg Insight',
    subtitle: 'Career & Business',
    price: '₹279',
    description: 'One Question + Current Phase',
    details: 'Honest Direction & Clarity',
    duration: '12-15 min',
    icon: HelpCircle,
    popular: true,
  },
  {
    id: 'bhavishya-phal',
    name: 'Bhavishya Phal Forecast',
    subtitle: 'Career, Business & Relationships',
    price: '₹349',
    description: 'Career/Studies Growth Direction',
    details: 'Next 6-12 Months Forecast',
    duration: '18-22 min',
    icon: TrendingUp,
    popular: false,
  },
  {
    id: 'sampoorna-kundali',
    name: 'Sampoorna Kundali Analysis',
    subtitle: 'Career, Relationships, Health & Business',
    price: '₹420',
    description: 'Career + Money Opportunity Period',
    details: 'One Major Block Explained',
    duration: '25-30 min',
    icon: Clock,
    popular: false,
  },
];

interface PricingCardsProps {
  onBookNow: (planId: string) => void;
}

export const PricingCards = ({ onBookNow }: PricingCardsProps) => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="ambient-orb w-[500px] h-[500px] top-0 left-[-10%]" />
      <div className="ambient-orb w-[400px] h-[400px] bottom-0 right-[-5%]" style={{ background: 'radial-gradient(circle, hsl(42 85% 55% / 0.06) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cosmic-gold/20 bg-card/30 backdrop-blur-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
            <span className="text-xs font-body tracking-widest uppercase text-cosmic-gold/80">Our Premium Services</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Choose Your <span className="text-glow-gold text-cosmic-gold">Path</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body text-sm sm:text-base">
            Select the consultation that resonates with your cosmic journey. Each reading is crafted to give you clarity and direction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="relative group"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1 text-[10px] font-display font-bold tracking-wider uppercase bg-gradient-gold text-background rounded-full shadow-gold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`service-card h-full flex flex-col ${plan.popular ? 'ring-1 ring-cosmic-gold/40' : ''}`}>
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-cosmic flex items-center justify-center mb-4 group-hover:shadow-neon transition-shadow duration-500">
                  <plan.icon className="w-6 h-6 text-primary-foreground" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-foreground mb-2 italic">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <span className="font-display text-3xl font-bold text-cosmic-gold text-glow-gold">
                    {plan.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-foreground/80 text-sm font-medium mb-1">{plan.description}</p>
                <p className="text-muted-foreground text-xs mb-4">{plan.details}</p>

                {/* Duration & CTA */}
                <div className="mt-auto">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary/50 text-xs text-foreground/60 mb-4">
                    ⏱️ {plan.duration}
                  </span>

                  <button
                    onClick={() => onBookNow(plan.id)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-cosmic text-primary-foreground font-display text-xs font-semibold tracking-wider uppercase hover:shadow-neon transition-all duration-300 group/btn"
                  >
                    Book Now
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
