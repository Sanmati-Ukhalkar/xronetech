import { useLenis } from '@/hooks/useLenis';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { BlogPreview } from '@/components/BlogPreview';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';

const Index = () => {
  // Initialize smooth scrolling
  useLenis();

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Process />
      <Testimonials />
      <BlogPreview />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
