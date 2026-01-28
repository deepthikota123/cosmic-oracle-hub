import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload, Loader2, Check } from 'lucide-react';
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
  { id: 'quick-clarity', label: 'Quick Clarity - ₹221' },
  { id: 'life-career', label: 'Life & Career - ₹351' },
  { id: 'future-timing', label: 'Future & Timing - ₹501' },
  { id: 'placement-job', label: 'Placement/Job Insights - ₹199' },
];

const bookingSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  gender: z.enum(['Male', 'Female', 'Other'], { required_error: 'Please select your gender' }),
  phone: z.string().min(10, 'Enter a valid phone number').max(15),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  timeOfBirth: z.string().min(1, 'Time of birth is required'),
  placeOfBirth: z.string().min(2, 'Place of birth is required').max(200),
  questionConcern: z.string().min(10, 'Please describe your concern (min 10 characters)').max(1000),
  preferredPlan: z.string().min(1, 'Please select a plan'),
  transactionNumber: z.string().min(4, 'Transaction number is required').max(50),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const planFromUrl = searchParams.get('plan');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      preferredPlan: planFromUrl
        ? plans.find((p) => p.id === planFromUrl)?.label || ''
        : '',
    },
  });

  useEffect(() => {
    if (planFromUrl) {
      const plan = plans.find((p) => p.id === planFromUrl);
      if (plan) {
        setValue('preferredPlan', plan.label);
      }
    }
  }, [planFromUrl, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast.error('Please upload a JPG or PNG file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setUploadedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      let paymentScreenshotUrl = null;

      // Upload payment screenshot if provided
      if (uploadedFile) {
        const fileExt = uploadedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('payment-screenshots')
          .upload(fileName, uploadedFile);

        if (uploadError) {
          console.error('Upload error:', uploadError);
        } else {
          const { data: urlData } = supabase.storage
            .from('payment-screenshots')
            .getPublicUrl(fileName);
          paymentScreenshotUrl = urlData.publicUrl;
        }
      }

      // Insert booking into database
      const { error: insertError } = await supabase.from('bookings').insert({
        full_name: data.fullName,
        gender: data.gender,
        phone: data.phone,
        date_of_birth: data.dateOfBirth,
        time_of_birth: data.timeOfBirth,
        place_of_birth: data.placeOfBirth,
        question_concern: data.questionConcern,
        preferred_plan: data.preferredPlan,
        payment_screenshot_url: paymentScreenshotUrl,
        transaction_number: data.transactionNumber,
      });

      if (insertError) {
        throw insertError;
      }

      // Send notification via edge function
      try {
        await supabase.functions.invoke('send-booking-notification', {
          body: {
            fullName: data.fullName,
            phone: data.phone,
            preferredPlan: data.preferredPlan,
            transactionNumber: data.transactionNumber,
          },
        });
      } catch (notifyError) {
        console.error('Notification error:', notifyError);
      }

      navigate('/thank-you');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 md:p-10 max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold holographic-text mb-2">
          Book Your Cosmic Session
        </h2>
        <p className="text-muted-foreground">
          Fill in your details to begin your journey
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            {...register('fullName')}
            placeholder="Enter your full name"
            className="mt-1.5 bg-secondary/30 border-border/50"
          />
          {errors.fullName && (
            <p className="text-destructive text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <Label>Gender *</Label>
          <Select onValueChange={(value) => setValue('gender', value as 'Male' | 'Female' | 'Other')}>
            <SelectTrigger className="mt-1.5 bg-secondary/30 border-border/50">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-destructive text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="+91 XXXXX XXXXX"
            className="mt-1.5 bg-secondary/30 border-border/50"
          />
          {errors.phone && (
            <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              type="date"
              {...register('dateOfBirth')}
              className="mt-1.5 bg-secondary/30 border-border/50"
            />
            {errors.dateOfBirth && (
              <p className="text-destructive text-sm mt-1">{errors.dateOfBirth.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="timeOfBirth">Time of Birth *</Label>
            <Input
              id="timeOfBirth"
              type="time"
              {...register('timeOfBirth')}
              className="mt-1.5 bg-secondary/30 border-border/50"
            />
            {errors.timeOfBirth && (
              <p className="text-destructive text-sm mt-1">{errors.timeOfBirth.message}</p>
            )}
          </div>
        </div>

        {/* Place of Birth */}
        <div>
          <Label htmlFor="placeOfBirth">Place of Birth *</Label>
          <Input
            id="placeOfBirth"
            {...register('placeOfBirth')}
            placeholder="City, State, Country"
            className="mt-1.5 bg-secondary/30 border-border/50"
          />
          {errors.placeOfBirth && (
            <p className="text-destructive text-sm mt-1">{errors.placeOfBirth.message}</p>
          )}
        </div>

        {/* Question/Concern */}
        <div>
          <Label htmlFor="questionConcern">Your Question / Concern *</Label>
          <Textarea
            id="questionConcern"
            {...register('questionConcern')}
            placeholder="Describe what you'd like clarity on..."
            rows={4}
            className="mt-1.5 bg-secondary/30 border-border/50"
          />
          {errors.questionConcern && (
            <p className="text-destructive text-sm mt-1">{errors.questionConcern.message}</p>
          )}
        </div>

        {/* Preferred Plan */}
        <div>
          <Label>Preferred Plan *</Label>
          <Select
            value={watch('preferredPlan')}
            onValueChange={(value) => setValue('preferredPlan', value)}
          >
            <SelectTrigger className="mt-1.5 bg-secondary/30 border-border/50">
              <SelectValue placeholder="Select your consultation plan" />
            </SelectTrigger>
            <SelectContent>
              {plans.map((plan) => (
                <SelectItem key={plan.id} value={plan.label}>
                  {plan.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.preferredPlan && (
            <p className="text-destructive text-sm mt-1">{errors.preferredPlan.message}</p>
          )}
        </div>

        {/* Payment Screenshot Upload */}
        <div>
          <Label>Payment Screenshot (Optional)</Label>
          <p className="text-xs text-muted-foreground mb-2">
            Upload JPG/PNG, max 5MB
          </p>
          <div className="mt-1.5">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border/50 rounded-lg cursor-pointer bg-secondary/20 hover:bg-secondary/30 transition-colors">
              {filePreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={filePreview}
                    alt="Payment screenshot"
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                    <Check size={16} />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload payment screenshot
                  </p>
                </div>
              )}
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Transaction Number */}
        <div>
          <Label htmlFor="transactionNumber">Transaction Number *</Label>
          <Input
            id="transactionNumber"
            {...register('transactionNumber')}
            placeholder="Enter your payment transaction ID"
            className="mt-1.5 bg-secondary/30 border-border/50"
          />
          {errors.transactionNumber && (
            <p className="text-destructive text-sm mt-1">{errors.transactionNumber.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-glow py-6 text-lg font-display font-semibold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Booking...
            </>
          ) : (
            'Submit Booking'
          )}
        </Button>
      </form>
    </motion.div>
  );
};
