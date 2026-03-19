ALTER TABLE public.bookings DROP CONSTRAINT bookings_preferred_plan_check;
ALTER TABLE public.bookings ADD CONSTRAINT bookings_preferred_plan_check CHECK (preferred_plan = ANY (ARRAY[
  'Karmasthana Guide - ₹199'::text,
  'Prashna Marg Insight - ₹279'::text,
  'Bhavishya Phal Forecast - ₹349'::text,
  'Sampoorna Kundali Analysis - ₹420'::text,
  'Quick Clarity - ₹221'::text,
  'Life & Career - ₹351'::text,
  'Future & Timing - ₹501'::text,
  'Placement/Job Insights - ₹199'::text
]));