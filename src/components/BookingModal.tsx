import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const plans = [
  { id: 'placement-job', label: 'Placement/Job Insights – ₹199' },
  { id: 'quick-clarity', label: 'Quick Clarity – ₹221' },
  { id: 'life-career', label: 'Life & Career – ₹351' },
  { id: 'future-timing', label: 'Future & Timing – ₹501' },
];

const bookingSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  gender: z.enum(['Male', 'Female', 'Other'], { required_error: 'Please select your gender' }),
  phone: z.string().min(10, 'Enter a valid phone number').max(15),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  timeOfBirth: z.string().optional(),
  placeOfBirth: z.string().optional(),
  questionConcern: z.string().min(10, 'Please describe your concern (min 10 characters)').max(1000),
  preferredPlan: z.string().min(1, 'Please select a plan'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

export const BookingModal = ({ isOpen, onClose, selectedPlan }: BookingModalProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultPlan = selectedPlan
    ? plans.find((p) => p.id === selectedPlan)?.label || ''
    : '';

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      preferredPlan: defaultPlan,
      timeOfBirth: '',
      placeOfBirth: '',
      email: '',
    },
  });

  // Update plan when selectedPlan changes
  useState(() => {
    if (selectedPlan) {
      const plan = plans.find((p) => p.id === selectedPlan);
      if (plan) setValue('preferredPlan', plan.label);
    }
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const { error: insertError } = await supabase.from('bookings').insert({
        full_name: data.fullName,
        gender: data.gender,
        phone: data.phone,
        date_of_birth: data.dateOfBirth,
        time_of_birth: data.timeOfBirth || '00:00',
        place_of_birth: data.placeOfBirth || 'Not specified',
        question_concern: data.questionConcern,
        preferred_plan: data.preferredPlan,
        payment_screenshot_url: null,
        transaction_number: 'N/A',
      });

      if (insertError) throw insertError;

      try {
        await supabase.functions.invoke('send-booking-notification', {
          body: {
            fullName: data.fullName,
            phone: data.phone,
            preferredPlan: data.preferredPlan,
            dateOfBirth: data.dateOfBirth,
            questionConcern: data.questionConcern,
          },
        });
      } catch (notifyError) {
        console.error('Notification error:', notifyError);
      }

      reset();
      onClose();
      navigate('/thank-you');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto glass-card p-5 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-cosmic-gold text-glow-gold mb-1">
                Book Your Session
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm font-body">
                Fill in your details to begin your cosmic journey
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div>
                <Label htmlFor="modalFullName" className="text-xs text-foreground/80">Full Name *</Label>
                <Input
                  id="modalFullName"
                  {...register('fullName')}
                  placeholder="Your full name"
                  className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm"
                  autoComplete="name"
                />
                {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName.message}</p>}
              </div>

              {/* Phone & Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="modalPhone" className="text-xs text-foreground/80">Phone/WhatsApp *</Label>
                  <Input
                    id="modalPhone"
                    type="tel"
                    inputMode="tel"
                    {...register('phone')}
                    placeholder="+91 XXXXX XXXXX"
                    className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm"
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <Label htmlFor="modalEmail" className="text-xs text-foreground/80">Email (Optional)</Label>
                  <Input
                    id="modalEmail"
                    type="email"
                    {...register('email')}
                    placeholder="your@email.com"
                    className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="relative z-50">
                <Label className="text-xs text-foreground/80">Gender *</Label>
                <Select onValueChange={(value) => setValue('gender', value as 'Male' | 'Female' | 'Other')}>
                  <SelectTrigger className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="z-[200] bg-popover border-border">
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-destructive text-xs mt-1">{errors.gender.message}</p>}
              </div>

              {/* DOB, Time, Place row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="modalDob" className="text-xs text-foreground/80">Date of Birth *</Label>
                  <Input id="modalDob" type="date" {...register('dateOfBirth')} className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm" />
                  {errors.dateOfBirth && <p className="text-destructive text-xs mt-1">{errors.dateOfBirth.message}</p>}
                </div>
                <div>
                  <Label htmlFor="modalTime" className="text-xs text-foreground/80">Birth Time</Label>
                  <Input id="modalTime" type="time" {...register('timeOfBirth')} className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm" />
                </div>
                <div>
                  <Label htmlFor="modalPlace" className="text-xs text-foreground/80">Birth Place</Label>
                  <Input id="modalPlace" {...register('placeOfBirth')} placeholder="City" className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm" />
                </div>
              </div>

              {/* Preferred Plan */}
              <div className="relative z-40">
                <Label className="text-xs text-foreground/80">Preferred Service *</Label>
                <Select value={watch('preferredPlan')} onValueChange={(value) => setValue('preferredPlan', value)}>
                  <SelectTrigger className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent className="z-[200] bg-popover border-border">
                    {plans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.label}>{plan.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.preferredPlan && <p className="text-destructive text-xs mt-1">{errors.preferredPlan.message}</p>}
              </div>

              {/* Question */}
              <div>
                <Label htmlFor="modalQuestion" className="text-xs text-foreground/80">Your Question / Concern *</Label>
                <Textarea
                  id="modalQuestion"
                  {...register('questionConcern')}
                  placeholder="What would you like clarity on..."
                  rows={3}
                  className="mt-1 bg-secondary/30 border-border/50 text-sm min-h-[80px]"
                />
                {errors.questionConcern && <p className="text-destructive text-xs mt-1">{errors.questionConcern.message}</p>}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-gold py-5 text-sm font-display font-semibold tracking-wider mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  'Book Consultation'
                )}
              </Button>

              <p className="text-center text-[10px] text-muted-foreground">
                Payment details will be shared after booking confirmation via WhatsApp
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
