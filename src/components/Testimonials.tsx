import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Punjab, India',
    rating: 5,
    text: 'XroneTech transformed our farming operations. The drone spraying is incredibly efficient and has reduced our pesticide costs by 40%. Highly recommended!',
  },
  {
    name: 'Arun Patel',
    location: 'Gujarat, India',
    rating: 5,
    text: 'Professional team, on-time service, and excellent results. Our cotton yield improved significantly after using their precision spraying services.',
  },
  {
    name: 'Suresh Reddy',
    location: 'Telangana, India',
    rating: 5,
    text: 'The field mapping service helped us identify problem areas we never knew existed. XroneTech is a game-changer for modern agriculture.',
  },
  {
    name: 'Vikram Singh',
    location: 'Haryana, India',
    rating: 5,
    text: 'Excellent customer support and follow-up. They truly care about farmer success. Our rice paddy has never looked better.',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelector('.testimonial-content'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Trusted by Farmers Across the Region
          </h2>
        </div>

        {/* Carousel */}
        <div className="testimonial-content max-w-4xl mx-auto">
          <div className="relative bg-card rounded-2xl shadow-card p-8 md:p-12">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <Quote className="w-6 h-6 text-primary" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-accent text-accent"
                />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
              "{testimonials[currentIndex].text}"
            </p>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading font-bold text-foreground text-lg">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-muted-foreground">
                  {testimonials[currentIndex].location}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-border hover:bg-primary/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
