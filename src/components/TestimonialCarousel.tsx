import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const initialReviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    rating: 5,
    text: 'CosmOracle completely changed my perspective on career decisions. The insights were spot-on! 🌟',
    date: '2026-01-25',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    rating: 5,
    text: 'Got clarity on my job placement timing. Everything happened exactly as predicted. Highly recommend!',
    date: '2026-01-24',
  },
  {
    id: 3,
    name: 'Ananya Patel',
    rating: 5,
    text: 'Best investment ever! The career guidance helped me land my dream job. Thank you Saurabh sir! ✨',
    date: '2026-01-23',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    rating: 4,
    text: 'Very accurate predictions about my future timing. The session was insightful and empowering.',
    date: '2026-01-22',
  },
  {
    id: 5,
    name: 'Sneha Kulkarni',
    rating: 5,
    text: 'Amazing experience! The ₹199 job insights package gave me so much clarity about my career path.',
    date: '2026-01-21',
  },
  {
    id: 6,
    name: 'Arjun Deshmukh',
    rating: 5,
    text: 'Jeevan Ka GPS indeed! Every prediction about my love life and career was incredibly accurate.',
    date: '2026-01-20',
  },
  {
    id: 7,
    name: 'Meera Joshi',
    rating: 5,
    text: 'The quick clarity session was worth every rupee. Got exactly the direction I needed! 🔥',
    date: '2026-01-19',
  },
  {
    id: 8,
    name: 'Karan Malhotra',
    rating: 4,
    text: 'Professional and insightful. The future timing predictions helped me plan my business moves.',
    date: '2026-01-18',
  },
];

export const TestimonialCarousel = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Simulate dynamic review updates
  useEffect(() => {
    const shuffled = [...initialReviews].sort(() => Math.random() - 0.5);
    setReviews(shuffled);
  }, []);

  const nextReview = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextReview, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const currentReview = reviews[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            <span className="holographic-text">200+ Satisfied Clients</span>
          </h2>
          <p className="text-muted-foreground">
            Real stories from our cosmic community
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground hover:text-primary transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground hover:text-primary transition-colors"
            aria-label="Next review"
          >
            <ChevronRight size={24} />
          </button>

          {/* Review Card */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentReview.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="glass-card p-8 md:p-12 text-center"
              >
                <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={24}
                      className={i < currentReview.rating ? 'text-cosmic-gold fill-cosmic-gold' : 'text-muted'}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-lg md:text-xl text-foreground font-medium mb-6 leading-relaxed">
                  "{currentReview.text}"
                </p>

                {/* Author */}
                <div>
                  <p className="font-heading font-semibold text-foreground">
                    {currentReview.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(currentReview.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? 'w-6 bg-primary'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
