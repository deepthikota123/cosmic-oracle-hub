-- Create reviews table for customer testimonials
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read reviews
CREATE POLICY "Anyone can read reviews"
ON public.reviews
FOR SELECT
USING (true);

-- Allow anyone to create reviews
CREATE POLICY "Anyone can create reviews"
ON public.reviews
FOR INSERT
WITH CHECK (true);

-- Insert initial sample reviews
INSERT INTO public.reviews (name, rating, text, created_at) VALUES
  ('Priya Sharma', 5, 'CosmOracle completely changed my perspective on career decisions. The insights were spot-on! 🌟', now() - interval '4 days'),
  ('Rahul Verma', 5, 'Got clarity on my job placement timing. Everything happened exactly as predicted. Highly recommend!', now() - interval '5 days'),
  ('Ananya Patel', 5, 'Best investment ever! The career guidance helped me land my dream job. Thank you Saurabh sir! ✨', now() - interval '6 days'),
  ('Vikram Singh', 4, 'Very accurate predictions about my future timing. The session was insightful and empowering.', now() - interval '7 days'),
  ('Sneha Kulkarni', 5, 'Amazing experience! The ₹199 job insights package gave me so much clarity about my career path.', now() - interval '8 days'),
  ('Arjun Deshmukh', 5, 'Jeevan Ka GPS indeed! Every prediction about my love life and career was incredibly accurate.', now() - interval '9 days'),
  ('Meera Joshi', 5, 'The quick clarity session was worth every rupee. Got exactly the direction I needed! 🔥', now() - interval '10 days'),
  ('Karan Malhotra', 4, 'Professional and insightful. The future timing predictions helped me plan my business moves.', now() - interval '11 days');