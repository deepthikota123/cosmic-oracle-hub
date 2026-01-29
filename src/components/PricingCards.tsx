import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle, TrendingUp, Clock, Briefcase } from 'lucide-react';

const plans = [
  {
    id: 'placement-job',
    name: 'Placement/Job Insights',
    price: '₹199',
    description: 'Upcoming Job/Placement Guidance',
    details: 'Opportunity Timing & Prep Tips',
    duration: '10-12 min only',
    icon: Briefcase,
    popular: false,
  },
  {
    id: 'quick-clarity',
    name: 'Quick Clarity',
    price: '₹221',
    description: 'One Question + Current Phase',
    details: 'Honest Direction',
    duration: '8-10 min only',
    icon: HelpCircle,
    popular: false,
  },
  {
    id: 'life-career',
    name: 'Life & Career',
    price: '₹351',
    description: 'Career/Studies Growth Direction',
    details: 'Next 6-12 Months',
    duration: '15-18 min only',
    icon: TrendingUp,
    popular: true,
  },
  {
    id: 'future-timing',
    name: 'Future & Timing',
    price: '₹501',
    description: 'Career + Money Opportunity Period',
    details: 'One Major Block Explained',
    duration: '25-30 min only',
    icon: Clock,
    popular: false,
  },
];

export const PricingCards = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="holographic-text">Choose Your Path</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select the consultation that resonates with your cosmic journey. Each reading is crafted to give you clarity and direction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1 text-xs font-display font-bold bg-gradient-cosmic text-white rounded-full shadow-neon">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className={`pricing-card h-full flex flex-col ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-cosmic flex items-center justify-center mb-4 shadow-neon group-hover:scale-110 transition-transform duration-300">
                  <plan.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title & Price */}
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-display text-4xl font-black text-cosmic-gold text-glow-gold">
                    {plan.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-foreground/90 font-medium mb-1">
                  {plan.description}
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.details}
                </p>

                {/* Duration */}
                <div className="mt-auto">
                  <span className="inline-block px-3 py-1.5 rounded-full bg-secondary/50 text-xs font-medium text-foreground/80 mb-4">
                    ⏱️ {plan.duration}
                  </span>

                  <Link
                    to={`/booking?plan=${plan.id}`}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-cosmic text-white font-heading font-semibold text-sm hover:shadow-neon transition-all duration-300 group/btn"
                  >
                    Book Now
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
