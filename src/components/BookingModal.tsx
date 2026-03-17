import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, X, CheckCircle2, Sparkles } from 'lucide-react';
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
  { id: 'placement-job', label: 'Placement/Job Insights – ₹199', duration: '10-12 min' },
  { id: 'quick-clarity', label: 'Quick Clarity – ₹221', duration: '8-10 min' },
  { id: 'life-career', label: 'Life & Career – ₹351', duration: '15-18 min' },
  { id: 'future-timing', label: 'Future & Timing – ₹501', duration: '25-30 min' },
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
      preferredPlan: '',
      timeOfBirth: '',
      placeOfBirth: '',
      email: '',
      phone: '+91 ',
    },
  });

  // Update plan when selectedPlan changes
  useEffect(() => {
    if (selectedPlan) {
      const plan = plans.find((p) => p.id === selectedPlan);
      if (plan) setValue('preferredPlan', plan.label);
    }
  }, [selectedPlan, setValue]);

  // Reset success state when modal opens
  useEffect(() => {
    if (isOpen) setShowSuccess(false);
  }, [isOpen]);

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
      setShowSuccess(true);
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
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
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>

            {showSuccess ? (
              <SuccessView onClose={handleClose} />
            ) : (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-cosmic-gold" />
                    <span className="text-[10px] tracking-widest uppercase text-cosmic-gold/80 font-body">Premium Consultation</span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-cosmic-gold text-glow-gold mb-1">
                    Book Your Session
                  </h2>
                  <p className="text-muted-foreground text-xs sm:text-sm font-body">
                    Fill in your details to begin your cosmic journey
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Full Name */}
                  <FieldWrapper label="Full Name *" error={errors.fullName?.message}>
                    <Input
                      {...register('fullName')}
                      placeholder="Your full name"
                      className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm"
                      autoComplete="name"
                    />
                  </FieldWrapper>

                  {/* Phone & Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FieldWrapper label="WhatsApp Number *" error={errors.phone?.message}>
                      <Input
                        type="tel"
                        inputMode="tel"
                        {...register('phone')}
                        placeholder="+91 XXXXX XXXXX"
                        className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm"
                        autoComplete="tel"
                      />
                    </FieldWrapper>
                    <FieldWrapper label="Email (Optional)">
                      <Input
                        type="email"
                        {...register('email')}
                        placeholder="your@email.com"
                        className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm"
                        autoComplete="email"
                      />
                    </FieldWrapper>
                  </div>

                  {/* Gender */}
                  <FieldWrapper label="Gender *" error={errors.gender?.message}>
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
                  </FieldWrapper>

                  {/* DOB, Time, Place row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <FieldWrapper label="Date of Birth *" error={errors.dateOfBirth?.message}>
                      <Input type="date" {...register('dateOfBirth')} className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm" />
                    </FieldWrapper>
                    <FieldWrapper label="Birth Time">
                      <Input type="time" {...register('timeOfBirth')} className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm" />
                    </FieldWrapper>
                    <FieldWrapper label="Birth Place">
                      <Input {...register('placeOfBirth')} placeholder="City" className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm" />
                    </FieldWrapper>
                  </div>

                  {/* Preferred Plan */}
                  <FieldWrapper label="Preferred Service *" error={errors.preferredPlan?.message}>
                    <Select value={watch('preferredPlan')} onValueChange={(value) => setValue('preferredPlan', value)}>
                      <SelectTrigger className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm">
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                      <SelectContent className="z-[200] bg-popover border-border">
                        {plans.map((plan) => (
                          <SelectItem key={plan.id} value={plan.label}>
                            {plan.label} • ⏱️ {plan.duration}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FieldWrapper>

                  {/* Question */}
                  <FieldWrapper label="Your Question / Concern *" error={errors.questionConcern?.message}>
                    <Textarea
                      {...register('questionConcern')}
                      placeholder="What would you like clarity on..."
                      rows={3}
                      className="mt-1 bg-secondary/30 border-border/50 text-sm min-h-[80px]"
                    />
                  </FieldWrapper>

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
                      '✨ Confirm Booking'
                    )}
                  </Button>

                  <p className="text-center text-[10px] text-muted-foreground">
                    Payment details will be shared after booking confirmation via WhatsApp
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ---------- Sub-components ---------- */

const FieldWrapper = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div className="relative z-40">
    <Label className={`text-xs ${error ? 'text-destructive' : 'text-foreground/80'}`}>{label}</Label>
    {children}
    {error && <p className="text-destructive text-xs mt-1">{error}</p>}
  </div>
);

const SuccessView = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-8"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
      className="w-20 h-20 rounded-full bg-gradient-gold mx-auto flex items-center justify-center mb-6"
    >
      <CheckCircle2 className="w-10 h-10 text-background" />
    </motion.div>
    <h3 className="font-display text-2xl font-bold text-cosmic-gold text-glow-gold mb-3">
      Booking Received! ✨
    </h3>
    <p className="text-foreground/80 text-sm font-body leading-relaxed max-w-sm mx-auto mb-2">
      Our team will contact you on <strong className="text-cosmic-gold">WhatsApp within 30 minutes</strong> to confirm your slot and payment details.
    </p>
    <p className="text-muted-foreground text-xs mb-8">
      Thank you for choosing CosmOracle — your cosmic journey begins soon!
    </p>
    <Button onClick={onClose} className="btn-gold px-8 py-3 rounded-full text-sm font-display tracking-wider">
      Close
    </Button>
  </motion.div>
);
