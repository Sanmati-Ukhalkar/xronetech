import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Phone } from "lucide-react";

const RefundPolicy = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow pt-32 md:pt-40 pb-16">
                <div className="container-custom px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
                            Refund & Cancellation Policy
                        </h1>

                        <div className="prose prose-lg max-w-none text-muted-foreground">
                            <p className="mb-8 text-lg leading-relaxed">
                                Xrone Tech Pvt Ltd ("Xrone") is a technology platform that connects customers with independent drone service providers ("Pilots"). Xrone does not operate drones or provide drone services directly.
                            </p>

                            <section className="mb-10">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">1. Cancellation by Customer</h2>
                                <p className="mb-4">
                                    Customers may cancel a booking from the app before the scheduled service time.
                                </p>

                                <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm my-6">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-secondary/50 border-b border-border">
                                                <th className="p-4 font-bold text-foreground">Time of Cancellation</th>
                                                <th className="p-4 font-bold text-foreground">Refund Applicable</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            <tr>
                                                <td className="p-4">More than 24 hours before service</td>
                                                <td className="p-4 font-medium text-primary">100% refund</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4">12 to 24 hours before service</td>
                                                <td className="p-4 font-medium text-primary">50% refund</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4">Less than 12 hours before service</td>
                                                <td className="p-4 font-medium text-destructive">No refund</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <p className="text-sm italic">
                                    Refunds are calculated on the total amount paid, excluding non-refundable convenience fees (if applicable).
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">2. Cancellation by Pilot</h2>
                                <p className="mb-4">If a pilot cancels a confirmed booking:</p>
                                <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                    <li>The customer will receive a <strong>100% refund</strong>, or</li>
                                    <li>The customer may choose <strong>free rescheduling</strong> (subject to availability).</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">3. No-Show Policy</h2>
                                <div className="space-y-4">
                                    <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                                        <span className="font-bold text-foreground block mb-1">Pilot no-show:</span>
                                        <span>100% refund or free rescheduling</span>
                                    </div>
                                    <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                                        <span className="font-bold text-foreground block mb-1">Customer unavailable at service location:</span>
                                        <span>Booking may be marked as completed and no refund will be issued</span>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">4. Weather & Regulatory Restrictions</h2>
                                <p className="mb-4">Drone operations are subject to weather conditions and government regulations.</p>

                                <div className="grid md:grid-cols-2 gap-6 my-6">
                                    <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                                        <h3 className="font-bold text-foreground mb-3 text-lg">If service cannot be completed due to:</h3>
                                        <ul className="list-disc pl-5 space-y-1 marker:text-destructive">
                                            <li>Rain, strong winds, or unsafe weather</li>
                                            <li>DGCA / ATC / local authority restrictions</li>
                                            <li>Restricted or denied flying permissions</li>
                                        </ul>
                                    </div>

                                    <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                                        <h3 className="font-bold text-foreground mb-3 text-lg">The customer will be offered:</h3>
                                        <ul className="list-disc pl-5 space-y-1 marker:text-primary">
                                            <li>A full refund, or</li>
                                            <li>Free rescheduling</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">5. Refund Processing Timeline</h2>
                                <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                    <li>Refunds are initiated within <strong>3–5 business days</strong></li>
                                    <li>Amount will be credited to the original payment method</li>
                                    <li>Bank or payment provider processing time may vary</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">6. Taxes & Fees</h2>
                                <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                    <li>GST charged on completed services is <strong>non-refundable</strong></li>
                                    <li>Platform convenience fees (if any) are <strong>non-refundable</strong> once service has started</li>
                                </ul>
                            </section>

                            <section className="mb-10 pt-6 border-t border-border">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">7. Contact Us</h2>
                                <p className="mb-4">For refund or cancellation support:</p>
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                                    <a href="mailto:support@xronetech.com" className="flex items-center gap-2 text-primary hover:underline font-medium">
                                        <Mail className="w-5 h-5" />
                                        support@xronetech.com
                                    </a>
                                    <a href="tel:+918007700522" className="flex items-center gap-2 text-primary hover:underline font-medium">
                                        <Phone className="w-5 h-5" />
                                        +91-8007700522
                                    </a>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RefundPolicy;
