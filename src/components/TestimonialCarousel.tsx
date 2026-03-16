import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Plus, Loader2, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AnimatePresence } from 'framer-motion';
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

// Placeholder reviews for when DB is empty
const placeholderReviews: Review[] = [
  { id: 'p1', name: 'Priya M.', rating: 5, text: 'Transformed my career vision — the clarity I received was absolutely life-changing. Thank you CosmOracle!', created_at: '2026-02-15' },
  { id: 'p2', name: 'Rahul S.', rating: 5, text: 'Skeptical at first, but the timing predictions for my job placement were spot on. Truly GPS for life.', created_at: '2026-02-20' },
  { id: 'p3', name: 'Ananya K.', rating: 5, text: 'The best ₹221 I ever spent. Got honest answers to my relationship concerns with no sugar-coating.', created_at: '2026-03-01' },
  { id: 'p4', name: 'Vikram J.', rating: 5, text: 'CosmOracle helped me understand my career blocks and gave me a clear 6-month roadmap. Highly recommended!', created_at: '2026-03-05' },
  { id: 'p5', name: 'Sneha D.', rating: 5, text: 'Same-day reading that gave me peace of mind about a major life decision. This is premium service at its best.', created_at: '2026-03-10' },
];

export const TestimonialCarousel = () => {
  const [reviews, setReviews] = useState<Review[]>(placeholderReviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      if (data && data.length > 0) setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const nextReview = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
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
      toast.error('Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentReview = reviews[currentIndex];

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 200 : -200, opacity: 0 }),
  };

  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      <div className="ambient-orb w-[400px] h-[400px] top-[20%] right-[-10%]" style={{ background: 'radial-gradient(circle, hsl(42 85% 55% / 0.06) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cosmic-gold/20 bg-card/30 backdrop-blur-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
            <span className="text-xs font-body tracking-widest uppercase text-cosmic-gold/80">Testimonials</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Voices of <span className="text-cosmic-gold text-glow-gold">Transformation</span>
          </h2>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base font-body">
            Real stories from our cosmic community
          </p>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 border-cosmic-gold/20 text-foreground/80 hover:border-cosmic-gold/40">
                <Plus size={16} />
                Share Your Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-popover border-border">
              <DialogHeader>
                <DialogTitle className="font-display text-lg">Share Your Review</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="reviewName">Your Name</Label>
                  <Input id="reviewName" value={newReview.name} onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} placeholder="Enter your name" className="mt-1 bg-secondary/30" />
                </div>
                <div>
                  <Label>Rating</Label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setNewReview({ ...newReview, rating: star })} className="p-1">
                        <Star size={24} className={star <= newReview.rating ? 'text-cosmic-gold fill-cosmic-gold' : 'text-muted'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="reviewText">Your Review</Label>
                  <Textarea id="reviewText" value={newReview.text} onChange={(e) => setNewReview({ ...newReview, text: e.target.value })} placeholder="Share your experience..." rows={3} className="mt-1 bg-secondary/30" />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</> : 'Submit Review'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        {currentReview && (
          <div className="max-w-2xl mx-auto relative">
            <button onClick={prevReview} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-10 z-10 w-9 h-9 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-center text-foreground/60 hover:text-cosmic-gold transition-colors" aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextReview} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-10 z-10 w-9 h-9 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-center text-foreground/60 hover:text-cosmic-gold transition-colors" aria-label="Next">
              <ChevronRight size={20} />
            </button>

            <div className="overflow-hidden px-4 sm:px-0">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentReview.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="glass-card p-8 sm:p-12 text-center"
                >
                  <Quote className="w-8 h-8 text-cosmic-gold/20 mx-auto mb-4" />
                  <div className="flex justify-center gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className={i < currentReview.rating ? 'text-cosmic-gold fill-cosmic-gold' : 'text-muted'} />
                    ))}
                  </div>
                  <p className="text-base sm:text-lg font-heading italic text-foreground/90 mb-6 leading-relaxed">
                    "{currentReview.text}"
                  </p>
                  <p className="font-display text-xs tracking-widest uppercase text-cosmic-gold/80">
                    {currentReview.name}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {reviews.slice(0, 8).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'w-5 bg-cosmic-gold' : 'bg-muted-foreground/20'}`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
