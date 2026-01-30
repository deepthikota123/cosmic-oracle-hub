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
  { id: 'placement-job', label: 'Placement/Job Insights - ₹199' },
  { id: 'quick-clarity', label: 'Quick Clarity - ₹221' },
  { id: 'life-career', label: 'Life & Career - ₹351' },
  { id: 'future-timing', label: 'Future & Timing - ₹501' },
];

const bookingSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  gender: z.enum(['Male', 'Female', 'Other'], { required_error: 'Please select your gender' }),
  phone: z.string().min(10, 'Enter a valid phone number').max(15),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  timeOfBirth: z.string().optional(),
  placeOfBirth: z.string().optional(),
  questionConcern: z.string().min(10, 'Please describe your concern (min 10 characters)').max(1000),
  preferredPlan: z.string().min(1, 'Please select a plan'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

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
      timeOfBirth: '',
      placeOfBirth: '',
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
    setFileError(null);
    if (file) {
      // Validate file type and size
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setFileError('Please upload a JPG or PNG file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File size must be less than 5MB');
        return;
      }
      setUploadedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    // Validate file upload is required
    if (!uploadedFile) {
      setFileError('Payment screenshot is required');
      toast.error('Please upload payment screenshot');
      return;
    }

    setIsSubmitting(true);

    try {
      let paymentScreenshotUrl = null;

      // Upload payment screenshot
      const fileExt = uploadedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('payment-screenshots')
        .upload(fileName, uploadedFile);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error('Failed to upload payment screenshot');
      } else {
        const { data: urlData } = supabase.storage
          .from('payment-screenshots')
          .getPublicUrl(fileName);
        paymentScreenshotUrl = urlData.publicUrl;
      }

      // Insert booking into database
      const { error: insertError } = await supabase.from('bookings').insert({
        full_name: data.fullName,
        gender: data.gender,
        phone: data.phone,
        date_of_birth: data.dateOfBirth,
        time_of_birth: data.timeOfBirth || '00:00',
        place_of_birth: data.placeOfBirth || 'Not specified',
        question_concern: data.questionConcern,
        preferred_plan: data.preferredPlan,
        payment_screenshot_url: paymentScreenshotUrl,
        transaction_number: 'Screenshot uploaded',
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
            dateOfBirth: data.dateOfBirth,
            questionConcern: data.questionConcern,
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
      className="glass-card p-5 sm:p-6 md:p-10 max-w-2xl mx-auto relative z-30"
    >
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold holographic-text mb-2">
          Book Your Cosmic Session
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Fill in your details to begin your journey
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div className="relative z-40">
          <Label htmlFor="fullName" className="text-sm">Full Name *</Label>
          <Input
            id="fullName"
            {...register('fullName')}
            placeholder="Enter your full name"
            className="mt-1.5 bg-background border-border h-12 text-base relative z-40"
            autoComplete="name"
          />
          {errors.fullName && (
            <p className="text-destructive text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Gender */}
        <div className="relative z-50">
          <Label className="text-sm">Gender *</Label>
          <Select onValueChange={(value) => setValue('gender', value as 'Male' | 'Female' | 'Other')}>
            <SelectTrigger className="mt-1.5 bg-background border-border h-12 text-base relative z-50">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent className="z-[100] bg-background border-border">
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
        <div className="relative z-40">
          <Label htmlFor="phone" className="text-sm">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            {...register('phone')}
            placeholder="+91 XXXXX XXXXX"
            className="mt-1.5 bg-background border-border h-12 text-base relative z-40"
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="relative z-40">
          <Label htmlFor="dateOfBirth" className="text-sm">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            {...register('dateOfBirth')}
            className="mt-1.5 bg-background border-border h-12 text-base relative z-40"
          />
          {errors.dateOfBirth && (
            <p className="text-destructive text-sm mt-1">{errors.dateOfBirth.message}</p>
          )}
        </div>

        {/* Time and Place of Birth in grid on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-40">
          <div>
            <Label htmlFor="timeOfBirth" className="text-sm">Time of Birth (Optional)</Label>
            <Input
              id="timeOfBirth"
              type="time"
              {...register('timeOfBirth')}
              className="mt-1.5 bg-background border-border h-12 text-base"
            />
          </div>
          <div>
            <Label htmlFor="placeOfBirth" className="text-sm">Place of Birth (Optional)</Label>
            <Input
              id="placeOfBirth"
              {...register('placeOfBirth')}
              placeholder="City, State"
              className="mt-1.5 bg-background border-border h-12 text-base"
            />
          </div>
        </div>

        {/* Question/Concern */}
        <div className="relative z-40">
          <Label htmlFor="questionConcern" className="text-sm">Your Question / Concern *</Label>
          <Textarea
            id="questionConcern"
            {...register('questionConcern')}
            placeholder="Describe what you'd like clarity on..."
            rows={4}
            className="mt-1.5 bg-background border-border text-base min-h-[100px] relative z-40"
          />
          {errors.questionConcern && (
            <p className="text-destructive text-sm mt-1">{errors.questionConcern.message}</p>
          )}
        </div>

        {/* Preferred Plan */}
        <div className="relative z-50">
          <Label className="text-sm">Preferred Plan *</Label>
          <Select
            value={watch('preferredPlan')}
            onValueChange={(value) => setValue('preferredPlan', value)}
          >
            <SelectTrigger className="mt-1.5 bg-background border-border h-12 text-base relative z-50">
              <SelectValue placeholder="Select your consultation plan" />
            </SelectTrigger>
            <SelectContent className="z-[100] bg-background border-border">
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

        {/* Payment Screenshot Upload - Required */}
        <div className="relative z-30">
          <Label className="text-sm">Payment Screenshot *</Label>
          <p className="text-xs text-muted-foreground mb-2">
            Upload JPG/PNG, max 5MB
          </p>
          <div className="mt-1.5">
            <label className="flex flex-col items-center justify-center w-full h-36 sm:h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-background hover:bg-secondary/30 transition-colors active:bg-secondary/40 relative z-30">
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
                <div className="flex flex-col items-center justify-center py-6 px-4">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    Tap to upload payment screenshot
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
          {fileError && (
            <p className="text-destructive text-sm mt-1">{fileError}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-glow py-6 text-base sm:text-lg font-display font-semibold mt-6"
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
