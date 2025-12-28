import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Users, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5, suffix: '+', label: 'Years Experience', icon: Calendar },
  { value: 300, suffix: '+', label: 'Happy Farmers', icon: Users },
  { value: 50000, suffix: '+', label: 'Acres Covered', icon: MapPin },
];

export function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const countRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    stats.forEach((stat, index) => {
      const element = countRefs.current[index];
      if (!element) return;

      const counter = { value: 0 };

      gsap.to(counter, {
        value: stat.value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          element.textContent = Math.floor(counter.value).toLocaleString() + stat.suffix;
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative -mt-12 md:-mt-20 z-20">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          className="bg-card rounded-2xl shadow-card-hover p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                <stat.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <span
                ref={(el) => (countRefs.current[index] = el)}
                className="text-4xl md:text-5xl font-heading font-bold text-foreground"
              >
                0
              </span>
              <span className="text-muted-foreground font-medium mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
