import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Phone, Mail, Instagram, Loader2, Send, Sparkles, MessageCircle } from 'lucide-react';
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

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
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
      toast.success('Message sent successfully! ✨');
      reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="ambient-orb w-[500px] h-[500px] bottom-0 left-[-10%]" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cosmic-gold/20 bg-card/30 backdrop-blur-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
            <span className="text-xs font-body tracking-widest uppercase text-cosmic-gold/80">Get In Touch</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Contact <span className="text-cosmic-gold text-glow-gold">Us</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base font-body">
            Ready to unlock your cosmic path? Reach out through any of these channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <a href="https://wa.me/916230016403" target="_blank" rel="noopener noreferrer" className="glass-card p-5 flex items-center gap-4 group hover:border-cosmic-gold/30 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-gradient-cosmic flex items-center justify-center flex-shrink-0 group-hover:shadow-neon transition-shadow">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground text-lg italic">WhatsApp</p>
                <p className="text-muted-foreground text-sm">+91 62300-16403</p>
              </div>
            </a>

            <a href="tel:+916230016403" className="glass-card p-5 flex items-center gap-4 group hover:border-cosmic-gold/30 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-gradient-cosmic flex items-center justify-center flex-shrink-0 group-hover:shadow-neon transition-shadow">
                <Phone className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground text-lg italic">Phone</p>
                <p className="text-muted-foreground text-sm">+91 62300-16403</p>
              </div>
            </a>

            <a href="mailto:niyati.nivriti@gmail.com" className="glass-card p-5 flex items-center gap-4 group hover:border-cosmic-gold/30 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-gradient-cosmic flex items-center justify-center flex-shrink-0 group-hover:shadow-neon transition-shadow">
                <Mail className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground text-lg italic">Email</p>
                <p className="text-muted-foreground text-sm">niyati.nivriti@gmail.com</p>
              </div>
            </a>

            <a href="https://instagram.com/cosmoracle123" target="_blank" rel="noopener noreferrer" className="glass-card p-5 flex items-center gap-4 group hover:border-cosmic-gold/30 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-gradient-cosmic flex items-center justify-center flex-shrink-0 group-hover:shadow-neon transition-shadow">
                <Instagram className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground text-lg italic">Instagram</p>
                <p className="text-muted-foreground text-sm">@cosmoracle123</p>
              </div>
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-6 sm:p-8">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-5 italic">Send a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="contactName" className="text-xs text-foreground/80">Name *</Label>
                  <Input id="contactName" {...register('name')} placeholder="Your name" className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm" />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="contactEmail" className="text-xs text-foreground/80">Email *</Label>
                  <Input id="contactEmail" type="email" {...register('email')} placeholder="your@email.com" className="mt-1 bg-secondary/30 border-border/50 h-11 text-sm" />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="contactMessage" className="text-xs text-foreground/80">Message *</Label>
                  <Textarea id="contactMessage" {...register('message')} placeholder="How can we help you?" rows={4} className="mt-1 bg-secondary/30 border-border/50 text-sm" />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full btn-glow py-4 text-sm font-display font-semibold tracking-wider">
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</> : <><Send className="mr-2 h-4 w-4" />Send Message</>}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
