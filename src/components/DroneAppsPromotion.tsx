
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import promoBooking from '@/assets/promo-booking.png';
import promoPilot from '@/assets/promo-pilot-indian-v2.png';
import logo from '@/assets/logo.png';
import googlePlayLogo from '@/assets/vecteezy_google-play-store-icon-logo-symbol_22484501.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function DroneAppsPromotion() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.promo-content',
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            );

            gsap.fromTo(
                '.promo-image',
                { scale: 0.95, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
            <div className="container-custom space-y-24">

                {/* Feature 1: Booking App */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="promo-content order-2 lg:order-1">
                        <Badge className="mb-6 bg-green-100 text-green-700 hover:bg-green-100 px-4 py-1 text-sm font-semibold tracking-wide uppercase border-green-200">
                            For Farmers
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-6 leading-tight">
                            Book your Drone Spray Service in <span className="text-green-600">Seconds!</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                            AgriWings App lets you book professional drone spray services in 60 seconds flat.
                        </p>

                        <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                            <h4 className="font-bold text-lg mb-4 text-slate-800">How to Book?</h4>
                            <ul className="space-y-3">
                                {[
                                    "1. Download the App",
                                    "2. Register yourself",
                                    "3. Enter your details",
                                    "4. Confirm & Relax"
                                ].map((step, i) => (
                                    <li key={i} className="flex items-center text-slate-600 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold mr-3">
                                            {i + 1}
                                        </div>
                                        {step.slice(3)}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button className="h-14 px-8 text-lg bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200 rounded-full transition-transform hover:-translate-y-1" asChild>
                            <a href="https://play.google.com/store/apps/details?id=com.xrone.user" target="_blank" rel="noopener noreferrer">
                                <img src={googlePlayLogo} alt="Google Play" className="w-6 h-6 mr-3 object-contain" />
                                Download Customer App
                            </a>
                        </Button>
                    </div>
                    <div className="promo-image order-1 lg:order-2 relative group overflow-hidden rounded-3xl">
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent transform rotate-2 pointer-events-none z-10"></div>
                        <div className="absolute top-6 right-6 z-20 opacity-80 group-hover:opacity-100 transition-opacity">
                            <img src={logo} alt="Xrone Logo" className="w-16 h-auto drop-shadow-lg" />
                        </div>
                        <img
                            src={promoBooking}
                            alt="Farmer booking drone service"
                            className="relative rounded-3xl shadow-2xl w-full object-cover transform transition-transform hover:scale-[1.02] duration-500"
                        />
                    </div>
                </div>

                {/* Feature 2: Pilot App */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="promo-image relative group overflow-hidden rounded-3xl">
                        <div className="absolute inset-0 bg-gradient-to-bl from-green-500/20 to-transparent transform -rotate-2 pointer-events-none z-10"></div>
                        <div className="absolute top-6 right-6 z-20 opacity-80 group-hover:opacity-100 transition-opacity">
                            <img src={logo} alt="Xrone Logo" className="w-16 h-auto drop-shadow-lg" />
                        </div>
                        <img
                            src={promoPilot}
                            alt="Drone pilot controlling drone"
                            className="relative rounded-3xl shadow-2xl w-full object-cover transform transition-transform hover:scale-[1.02] duration-500"
                        />
                    </div>
                    <div className="promo-content">
                        <Badge className="mb-6 bg-green-100 text-green-700 hover:bg-green-100 px-4 py-1 text-sm font-semibold tracking-wide uppercase border-green-200">
                            For Pilots
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-6 leading-tight">
                            Start your Career as a <span className="text-green-600">Drone Pilot!</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                            Join our network of certified pilots. Get trained, get certified, and start earning.
                        </p>

                        <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                            <h4 className="font-bold text-lg mb-4 text-slate-800">How to Join?</h4>
                            <ul className="space-y-3">
                                {[
                                    "1. Download Pilot App",
                                    "2. Complete Profile",
                                    "3. Submit Documents",
                                    "4. Get Verified & Fly"
                                ].map((step, i) => (
                                    <li key={i} className="flex items-center text-slate-600 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold mr-3">
                                            {i + 1}
                                        </div>
                                        {step.slice(3)}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button className="h-14 px-8 text-lg bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200 rounded-full transition-transform hover:-translate-y-1" asChild>
                            <a href="https://play.google.com/store/apps/details?id=com.xrone.pilot" target="_blank" rel="noopener noreferrer">
                                <img src={googlePlayLogo} alt="Google Play" className="w-6 h-6 mr-3 object-contain" />
                                Download Pilot App
                            </a>
                        </Button>
                    </div>
                </div>

            </div>
        </section>
    );
}
