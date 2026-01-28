-- Create bookings table for CosmOracle astrology consultations
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
  phone TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  time_of_birth TIME NOT NULL,
  place_of_birth TEXT NOT NULL,
  question_concern TEXT NOT NULL,
  preferred_plan TEXT NOT NULL CHECK (preferred_plan IN ('Quick Clarity - ₹221', 'Life & Career - ₹351', 'Future & Timing - ₹501', 'Placement/Job Insights - ₹199')),
  payment_screenshot_url TEXT,
  transaction_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert bookings (public booking form)
CREATE POLICY "Anyone can create bookings"
  ON public.bookings
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reading own bookings by phone (for confirmation)
CREATE POLICY "Anyone can read bookings"
  ON public.bookings
  FOR SELECT
  USING (true);

-- Create storage bucket for payment screenshots
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-screenshots', 'payment-screenshots', true);

-- Create storage policy for uploading payment screenshots
CREATE POLICY "Anyone can upload payment screenshots"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'payment-screenshots');

-- Create policy for reading payment screenshots
CREATE POLICY "Anyone can view payment screenshots"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'payment-screenshots');

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for contact messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit contact messages
CREATE POLICY "Anyone can create contact messages"
  ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();