import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Leaf, Zap, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: Leaf, text: 'Eco-friendly precision spraying' },
  { icon: Zap, text: '10x faster than traditional methods' },
  { icon: ShieldCheck, text: 'Reduced chemical exposure' },
  { icon: CheckCircle2, text: 'GPS-guided accuracy' },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll('.animate-item');

    gsap.fromTo(
      elements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-secondary/30"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="animate-item inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              About XroneTech
            </span>
            <h2 className="animate-item text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Why Choose Our Drone Spraying Services?
            </h2>
            <p className="animate-item text-muted-foreground text-lg leading-relaxed mb-8">
              XroneTech is a leading agricultural technology company dedicated to
              revolutionizing farming practices through advanced drone solutions.
              Our team of certified pilots and agronomists work together to
              deliver precision spraying services that maximize crop yield while
              minimizing environmental impact.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.text}
                  className="animate-item flex items-center gap-3 p-4 bg-card rounded-xl shadow-soft hover:shadow-card transition-shadow duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground text-sm">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="animate-item relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card-hover">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80"
                alt="Farmer using drone technology in field"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-card-hover hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-lg">5+</span>
                </div>
                <div>
                  <p className="font-bold text-foreground">Years of Excellence</p>
                  <p className="text-sm text-muted-foreground">Trusted by farmers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
