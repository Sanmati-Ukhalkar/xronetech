import { Button } from '@/components/ui/button';
import { Phone, ArrowRight } from 'lucide-react';
import heroDrone from '@/assets/hero-drone.jpg';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroDrone}
          alt="Agricultural drone spraying crops over farmland"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom section-padding pt-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-primary-foreground leading-tight mb-6 text-balance">
            Farming Made Easier With Advanced Drone Technology
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl leading-relaxed">
            Smart agricultural drone spraying solutions that help farmers increase productivity and reduce costs
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="accent" size="xl" className="group">
              Request a Quote
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="heroOutline" size="xl">
              <Phone className="w-5 h-5" />
              Call Now
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-primary-foreground/70">
        <span className="text-sm font-medium">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/70 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
