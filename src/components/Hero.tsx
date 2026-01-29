import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, ArrowRight } from 'lucide-react';
import heroDrone from '@/assets/hero-drone.jpg';
import heroVideo from '@/assets/hero-video.mp4';
import gsap from 'gsap';

export function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        textRef.current?.children || [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 0.5 }
      )
        .fromTo(
          buttonsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 select-none">
        {/* Poster/Fallback Image */}
        <img
          src={heroDrone}
          alt="Agricultural drone spraying crops over farmland"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />

        {/* Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroDrone}
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient-overlay z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 container-custom section-padding pt-28 md:pt-32 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div ref={textRef} className="flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-[1.1] mb-6 tracking-tight drop-shadow-md">
              Farming Made Easier With <br className="hidden md:block" />
              <span className="text-accent">Advanced Drone Technology</span>
            </h1>

            <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl leading-relaxed drop-shadow-sm font-light">
              Smart agricultural drone spraying solutions that help farmers increase productivity and reduce costs
            </p>
          </div>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Button variant="accent" size="xl" className="group min-w-[180px] text-lg h-14" asChild>
              <a href="/book-spray">
                Book Drone Service
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <Button variant="heroOutline" size="xl" className="group min-w-[180px] text-lg h-14 border-white/30 hover:bg-white/10 backdrop-blur-sm" asChild>
              <a href="tel:+918007700522">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-white/60 animate-fade-in delay-1000">
        <span className="text-sm font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/80 animate-slide-down"></div>
        </div>
      </div>
    </section>
  );
}
