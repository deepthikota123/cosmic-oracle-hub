import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { PricingCards } from '@/components/PricingCards';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { ContactSection } from '@/components/ContactSection';
import { BookingModal } from '@/components/BookingModal';
import { AmbientSound } from '@/components/AmbientSound';
import { ParticleStars } from '@/components/ParticleStars';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>();

  const openBooking = useCallback((planId?: string) => {
    setSelectedPlan(planId);
    setIsBookingOpen(true);
  }, []);

  return (
    <div className="min-h-screen relative">
      <ParticleStars />
      <Header onBookNow={() => openBooking()} />
      <AmbientSound />

      <main>
        <Hero onBookNow={() => openBooking()} />
        <div className="section-divider" />
        <PricingCards onBookNow={(planId) => openBooking(planId)} />
        <div className="section-divider" />
        <TestimonialCarousel />
        <div className="section-divider" />
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export default Index;
