import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Plus, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  created_at: string;
}

export const TestimonialCarousel = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });

  // Fetch reviews from database
  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const nextReview = () => {
    if (reviews.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    if (reviews.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-advance
  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(nextReview, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.name.trim() || !newReview.text.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('reviews').insert({
        name: newReview.name.trim(),
        rating: newReview.rating,
        text: newReview.text.trim(),
      });

      if (error) throw error;

      toast.success('Thank you for your review! ✨');
      setNewReview({ name: '', rating: 5, text: '' });
      setIsOpen(false);
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 relative overflow-hidden">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

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
          <p className="text-muted-foreground mb-6">
            Real stories from our cosmic community
          </p>
          
          {/* Add Review Button */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus size={18} />
                Share Your Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Share Your Review</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="reviewName">Your Name</Label>
                  <Input
                    id="reviewName"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="Enter your name"
                    className="mt-1.5"
                  />
                </div>
                
                <div>
                  <Label>Rating</Label>
                  <div className="flex gap-1 mt-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1"
                      >
                        <Star
                          size={28}
                          className={star <= newReview.rating ? 'text-cosmic-gold fill-cosmic-gold' : 'text-muted'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="reviewText">Your Review</Label>
                  <Textarea
                    id="reviewText"
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    placeholder="Share your experience..."
                    rows={4}
                    className="mt-1.5"
                  />
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Review'
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        {reviews.length > 0 && currentReview && (
          <div className="max-w-3xl mx-auto relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 md:-translate-x-12 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground hover:text-primary transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 md:translate-x-12 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground hover:text-primary transition-colors"
              aria-label="Next review"
            >
              <ChevronRight size={24} />
            </button>

            {/* Review Card */}
            <div className="overflow-hidden px-4 sm:px-0">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentReview.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="glass-card p-6 sm:p-8 md:p-12 text-center"
                >
                  <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-primary/30 mx-auto mb-4 sm:mb-6" />

                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-4 sm:mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < currentReview.rating ? 'text-cosmic-gold fill-cosmic-gold' : 'text-muted'}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-base sm:text-lg md:text-xl text-foreground font-medium mb-4 sm:mb-6 leading-relaxed">
                    "{currentReview.text}"
                  </p>

                  {/* Author */}
                  <div>
                    <p className="font-heading font-semibold text-foreground">
                      {currentReview.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(currentReview.created_at).toLocaleDateString('en-IN', {
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
            <div className="flex justify-center gap-2 mt-6 flex-wrap">
              {reviews.slice(0, 10).map((_, i) => (
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
              {reviews.length > 10 && (
                <span className="text-xs text-muted-foreground ml-2">+{reviews.length - 10} more</span>
              )}
            </div>
          </div>
        )}

        {reviews.length === 0 && (
          <div className="text-center text-muted-foreground">
            <p>Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </section>
  );
};
