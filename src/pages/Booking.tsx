import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookingForm } from '@/components/BookingForm';
import { FloatingSocial } from '@/components/FloatingSocial';
import { ParticleStars } from '@/components/ParticleStars';

const Booking = () => {
  return (
    <div className="min-h-screen relative">
      <ParticleStars />
      <Header />
      <FloatingSocial />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <BookingForm />

          {/* Payment Info */}
          <div className="mt-10 max-w-2xl mx-auto text-center">
            <div className="glass-card p-5 sm:p-6">
              <h3 className="font-heading font-semibold text-foreground mb-3">
                💳 Payment Instructions
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Make payment via UPI/Google Pay/PhonePe to:
              </p>
              <div className="bg-secondary/30 rounded-lg p-4 mb-4">
                <p className="font-mono text-lg text-cosmic-gold font-bold">
                  +91 62300-16403
                </p>
              </div>
              <p className="text-muted-foreground text-xs">
                After payment, upload the screenshot in the form above and submit your booking.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
