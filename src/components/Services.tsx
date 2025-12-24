import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Droplets, Bug, Wheat, Scan, Sprout, LineChart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Droplets,
    title: 'Precision Spraying',
    description: 'Advanced drone-based spraying with pinpoint accuracy, reducing chemical usage by up to 50%.',
  },
  {
    icon: Bug,
    title: 'Pest Control',
    description: 'Targeted pest management solutions that protect crops while preserving beneficial insects.',
  },
  {
    icon: Wheat,
    title: 'Fertilizer Application',
    description: 'Uniform fertilizer distribution ensuring optimal nutrient delivery across your fields.',
  },
  {
    icon: Scan,
    title: 'Crop Monitoring',
    description: 'Real-time aerial surveillance to detect issues early and optimize crop health.',
  },
  {
    icon: Sprout,
    title: 'Seed Spreading',
    description: 'Efficient aerial seeding for cover crops and hard-to-reach agricultural areas.',
  },
  {
    icon: LineChart,
    title: 'Field Mapping',
    description: 'Detailed NDVI mapping and analytics to guide your farming decisions.',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.service-card');

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
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
    <section ref={sectionRef} id="services" className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Complete Drone Solutions for Modern Farming
          </h2>
          <p className="text-muted-foreground text-lg">
            From precision spraying to crop monitoring, we offer a full range of
            agricultural drone services tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card group bg-card p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
