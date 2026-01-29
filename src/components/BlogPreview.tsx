import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import blogImage1 from '@/assets/blog_spraying_drone_guide.png';
import blogImage2 from '@/assets/blog_start_drone_service.png';
import blogImage3 from '@/assets/blog_increase_farm_yield.png';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    slug: 'spraying-drones-guide',
    image: blogImage1,
    title: 'How Spraying Drones Can Help Your Farm: A Simple Guide',
    excerpt: 'Farming is getting smarter with new technology. One of the best tools for modern farmers is the spraying drone. These drones can spray pesticides, fertilizers, and even water, making farming easier and more efficient. In this...',
    date: 'Dec 28, 2024',
  },
  {
    slug: 'start-drone-service',
    image: blogImage2,
    title: 'How to Start Your Drone Spraying Service: A Simple Guide for Farmers',
    excerpt: 'Farming is changing with new technology. One of the best tools for farmers today is drones. Many farmers are using drones for spraying pesticides, fertilizers, and even water. If you want to start a drone spraying service, this guide will help you step by step. Why...',
    date: 'Dec 25, 2024',
  },
  {
    slug: 'increase-farm-yield',
    image: blogImage3,
    title: "How Can Agriculture Drones Increase My Farm's Yield?",
    excerpt: 'Farming in India is not easy. Farmers face many problems like low crop yield, pests, and high labor costs. But now, new technology is helping farmers. One of the best innovations is agriculture drones. These flying machines can help farmers grow more crops, save time,...',
    date: 'Dec 22, 2024',
  },
];

export function BlogPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.blog-card');

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
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
    <section ref={sectionRef} className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Latest Insights
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Agricultural Drone News & Tips
          </h2>
          <p className="text-muted-foreground text-lg">
            Stay updated with the latest trends and insights in agricultural
            drone technology.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.title}
              to={`/blog/${post.slug}`}
              className="blog-card group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 cursor-pointer block"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-sm text-muted-foreground">{post.date}</span>
                <h3 className="text-xl font-heading font-bold text-foreground mt-2 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
