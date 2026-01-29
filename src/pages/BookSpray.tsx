import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookingForm } from '@/components/BookingForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, Award, ShieldCheck } from 'lucide-react';

const trustIndicators = [
  { icon: Users, text: '300+ Happy Farmers' },
  { icon: Award, text: 'Professional Drone Operators' },
  { icon: ShieldCheck, text: 'Safe & Certified Spraying' },
];

const BookSpray = () => {


  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="pt-32 pb-12 bg-secondary/30">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              Book Drone Spray Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Schedule agricultural drone spraying quickly and easily. Fill out the form below and our team will contact you to confirm.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <BookingForm />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Trust Indicators */}
              <div className="bg-card rounded-2xl shadow-card p-6 sticky top-24">
                <h3 className="text-lg font-heading font-bold text-foreground mb-6">
                  Why Choose XroneTech?
                </h3>
                <div className="space-y-4">
                  {trustIndicators.map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">
                    Need help with booking?
                  </p>
                  <a
                    href="tel:+918007700522"
                    className="text-primary font-semibold hover:underline"
                  >
                    +91-8007700522
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Mobile */}
      <section className="section-padding !pt-0 lg:hidden">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {trustIndicators.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-full"
              >
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BookSpray;
