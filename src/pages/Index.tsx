import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { PricingCards } from '@/components/PricingCards';
import { FloatingSocial } from '@/components/FloatingSocial';
import { ParticleStars } from '@/components/ParticleStars';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <ParticleStars />
      <Header />
      <FloatingSocial />
      <main>
        <Hero />
        <PricingCards />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
