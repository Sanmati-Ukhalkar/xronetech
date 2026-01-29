import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const Terms = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow pt-32 md:pt-40 pb-16">
                <div className="container-custom px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">
                            Terms & Conditions
                        </h1>

                        <div className="prose prose-lg max-w-none text-muted-foreground">
                            <p className="mb-8 text-lg leading-relaxed">
                                By using the Xrone mobile applications or website, you agree to the following terms.
                            </p>

                            <section className="mb-10">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">1. Platform Role</h2>
                                <p className="mb-4">Xrone Tech Pvt Ltd is a technology marketplace platform.</p>
                                <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                    <li>Xrone does not own, operate, or control drones, nor does it provide drone services directly.</li>
                                    <li>All drone services are provided by independent service providers (pilots) listed on the platform.</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">2. Booking & Pricing</h2>
                                <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                    <li>Prices are calculated based on service type, location, pilot experience, and applicable taxes</li>
                                    <li>Final price is shown before payment</li>
                                    <li>Once payment is completed, prices do not change</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">3. Payments</h2>
                                <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                    <li>Payments are processed through secure third-party payment gateways</li>
                                    <li>Xrone does not store card or UPI details</li>
                                    <li>Payments are collected on behalf of pilots and settled after service completion</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">4. Pilot Responsibility</h2>
                                <p className="mb-4">Pilots are responsible for:</p>
                                <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                    <li>Holding applicable licenses and permissions</li>
                                    <li>Following DGCA and local aviation regulations</li>
                                    <li>Safe and lawful operation of drones</li>
                                </ul>
                                <p className="mt-4 text-sm italic">
                                    Xrone does not guarantee the outcome or suitability of any service.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">5. Cancellations & Refunds</h2>
                                <p>
                                    Cancellations and refunds are governed by the <Link to="/refund-policy" className="text-primary hover:underline font-medium">Refund & Cancellation Policy</Link>, available on the website and app.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">6. Limitation of Liability</h2>
                                <p className="mb-4">Xrone is not liable for:</p>
                                <ul className="list-disc pl-6 space-y-2 marker:text-destructive">
                                    <li>Service quality issues</li>
                                    <li>Regulatory denials</li>
                                    <li>Weather-related disruptions</li>
                                    <li>Third-party actions or omissions</li>
                                </ul>
                            </section>

                            <section className="mb-10 pt-6 border-t border-border">
                                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">7. Governing Law</h2>
                                <p className="mb-2">These terms are governed by the laws of India.</p>
                                <div className="p-4 bg-secondary/30 rounded-lg border border-border inline-block">
                                    <span className="font-bold text-foreground">Jurisdiction:</span> Courts of Nashik, Maharashtra
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

export default Terms;
