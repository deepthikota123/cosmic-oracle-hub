import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Phone, Mail, Instagram, Loader2, Send } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingSocial } from '@/components/FloatingSocial';
import { ParticleStars } from '@/components/ParticleStars';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: data.name,
        email: data.email,
        message: data.message,
      });

      if (error) throw error;

      toast.success('Message sent successfully! We\'ll get back to you soon. ✨');
      reset();
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <ParticleStars />
      <Header />
      <FloatingSocial />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="holographic-text">Contact Us</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to unlock your cosmic path? Reach out to us through any of these channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass-card p-6">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Get In Touch
                </h2>

                <div className="space-y-6">
                  <a
                    href="tel:+916230016403"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-cosmic flex items-center justify-center flex-shrink-0 group-hover:shadow-neon transition-shadow">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">Phone / WhatsApp</p>
                      <p className="text-muted-foreground group-hover:text-primary transition-colors">
                        +91 62300-16403
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:niyati.nivriti@gmail.com"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-cosmic flex items-center justify-center flex-shrink-0 group-hover:shadow-neon transition-shadow">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">Email</p>
                      <p className="text-muted-foreground group-hover:text-primary transition-colors">
                        niyati.nivriti@gmail.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://instagram.com/cosmoracle123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-cosmic flex items-center justify-center flex-shrink-0 group-hover:shadow-neon transition-shadow">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">Instagram</p>
                      <p className="text-muted-foreground group-hover:text-primary transition-colors">
                        @cosmoracle123
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="glass-card p-6 md:p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="Enter your name"
                      className="mt-1.5 bg-secondary/30 border-border/50 h-12 text-base"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="your@email.com"
                      className="mt-1.5 bg-secondary/30 border-border/50 h-12 text-base"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      placeholder="How can we help you?"
                      rows={5}
                      className="mt-1.5 bg-secondary/30 border-border/50 text-base"
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-glow py-5 text-base font-display font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
