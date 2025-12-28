
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

// This data will eventually be moved to a separate file or CMS
const blogData: Record<string, {
    title: string;
    category: string;
    date: string;
    author: string;
    readTime: string;
    image: string;
    content: React.ReactNode;
}> = {
    'spraying-drones-guide': {
        title: 'How Spraying Drones Can Help Your Farm: A Simple Guide',
        category: 'Guide',
        date: 'Dec 28, 2024',
        author: 'XroneTech Team',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1530267981375-f0de93fe1e91?w=1200&auto=format&fit=crop&q=80',
        content: (
            <>
                <p className="lead text-xl text-muted-foreground mb-8">
                    Farming is getting smarter with new technology. One of the best tools for modern farmers is the spraying drone.
                    These drones can spray pesticides, fertilizers, and even water, making farming easier and more efficient.
                </p>
                <p>
                    In this blog, we will explain how spraying drones work and how they can benefit your farm.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">What Are Spraying Drones?</h2>
                <p>
                    Spraying drones are flying machines designed to spray liquids over crops. They work automatically and can cover large areas quickly.
                    These drones use GPS and smart sensors to spray the right amount of chemicals in the right place.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Benefits of Spraying Drones</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">1. Saves Time and Labor</h3>
                        <p>
                            Traditional spraying takes a lot of time and effort. Farmers have to walk through fields or use tractors, which can be slow.
                            Drones can finish spraying in minutes, reducing the need for extra labor.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">2. Covers Large Areas Quickly</h3>
                        <p>
                            Drones can fly over large fields and spray crops much faster than manual methods. This helps farmers complete their work quickly, even in big farms.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">3. Uses Less Pesticide and Fertilizer</h3>
                        <p>
                            Drones spray chemicals in a precise way, so there is less waste. This saves money on pesticides and fertilizers while protecting the environment.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">4. Protects Farmers from Harmful Chemicals</h3>
                        <p>
                            Manual spraying exposes farmers to dangerous chemicals, which can cause health problems. Drones allow spraying from a safe distance, keeping farmers healthy.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">5. Reaches Difficult Areas Easily</h3>
                        <p>
                            Some farms have uneven land, waterlogged fields, or steep hills where tractors and workers cannot go easily. Drones can reach these areas and spray without any problems.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">6. Improves Crop Health and Yield</h3>
                        <p>
                            With better spraying, crops receive the right amount of nutrients and protection from pests. This leads to healthier crops and a higher yield at harvest time.
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">How to Start Using Spraying Drones on Your Farm</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">1. Choose the Right Drone</h3>
                        <p>
                            Different drones have different capacities. Select a drone based on your farm size and needs. Popular options include DJI Agras, Garuda Aerospace, and Krishi Rakshak drones.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">2. Follow Government Rules</h3>
                        <p>
                            In India, the Directorate General of Civil Aviation (DGCA) has rules for using drones. Farmers need to register their drones and follow safety guidelines for spraying.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">3. Learn How to Use the Drone</h3>
                        <p>
                            Farmers can take training courses to understand how to fly and maintain the drone properly. Many agriculture centers offer training programs.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">4. Start with a Small Area</h3>
                        <p>
                            Before using the drone on the whole farm, test it on a small section to check the spray pattern and efficiency.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">5. Maintain the Drone Regularly</h3>
                        <p>
                            Cleaning the nozzles, checking the battery, and updating the software are important to keep the drone working well.
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                <p>
                    Spraying drones are a game-changer for farming. They save time, reduce costs, and improve crop yield. As more farmers start using drones, farming will become easier and more productive.
                </p>
                <p className="font-semibold text-primary mt-4">
                    If you are a farmer, consider investing in a spraying drone to improve your farm’s efficiency. The future of farming is in the sky!
                </p>
            </>
        )
    },
    'start-drone-service': {
        title: 'How to Start Your Drone Spraying Service: A Simple Guide for Farmers',
        category: 'Business',
        date: 'Dec 25, 2024',
        author: 'XroneTech Team',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=1200&auto=format&fit=crop&q=80',
        content: (
            <>
                <p className="lead text-xl text-muted-foreground mb-8">
                    Farming is changing with new technology. One of the best tools for farmers today is drones.
                    Many farmers are using drones for spraying pesticides, fertilizers, and even water.
                    If you want to start a drone spraying service, this guide will help you step by step.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Why Start a Drone Spraying Service?</h2>
                <p>
                    Many farmers still use manual spraying, which takes time and effort. A drone spraying service can help farmers spray faster,
                    save money on labor, and use chemicals more efficiently. This is a great business idea because the demand for drone spraying is growing.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Steps to Start a Drone Spraying Service</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">1. Learn About Agriculture Drones</h3>
                        <p>
                            Before starting, you need to understand how drone spraying works. Learn about different types of drones, how they spray chemicals,
                            and how to maintain them. You can take online courses or visit a drone training center.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">2. Check Government Rules and Get a License</h3>
                        <p>
                            In India, the use of drones is regulated by the Directorate General of Civil Aviation (DGCA). You need to:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
                            <li>Register your drone with DGCA.</li>
                            <li>Get a Remote Pilot Certificate (for large drones).</li>
                            <li>Follow the rules for spraying chemicals safely.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">3. Buy the Right Drone for Spraying</h3>
                        <p>
                            Not all drones are good for spraying. Choose a drone that has:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
                            <li>A strong battery for long flights.</li>
                            <li>A good spray system that spreads chemicals evenly.</li>
                            <li>GPS and smart controls for accurate spraying.</li>
                        </ul>
                        <p className="mt-2 text-sm italic">
                            Some popular agricultural drones in India include DJI Agras, Krishi Rakshak, and Garuda Aerospace drones.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">4. Get the Necessary Equipment</h3>
                        <p>
                            Apart from the drone, you will need:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
                            <li>Pesticides and fertilizers that work well with drones.</li>
                            <li>A GPS system to map the farm area.</li>
                            <li>A charging station for the drone battery.</li>
                            <li>A safety kit (gloves, mask, and protective clothing).</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">5. Find Your Customers</h3>
                        <p>
                            Your main customers will be local farmers. To get business, you can:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
                            <li>Visit farmers and explain the benefits of drone spraying.</li>
                            <li>Use WhatsApp and Facebook groups to advertise.</li>
                            <li>Talk to local farming cooperatives and agriculture offices.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">6. Decide Your Pricing</h3>
                        <p>
                            Check what other drone spraying services charge in your area. You can charge per acre or per hour. Offer discounts for large farms to attract more customers.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">7. Test and Improve Your Service</h3>
                        <p>
                            Before taking big projects, do test sprays on a small farm. This will help you:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
                            <li>Check if the spray system works well.</li>
                            <li>Learn how to handle the drone better.</li>
                            <li>Make improvements before working with paying customers.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">8. Expand Your Business</h3>
                        <p>
                            Once you start getting customers, think about growing your business. You can:
                        </p>
                        <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
                            <li>Buy more drones to cover larger areas.</li>
                            <li>Train a team to handle more farms.</li>
                            <li>Offer other services like crop monitoring with drones.</li>
                        </ul>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Final Thoughts</h2>
                <p>
                    Starting a drone spraying service is a great way to help farmers and earn money. With the right drone, knowledge, and marketing, you can build a successful business.
                </p>
                <p className="font-semibold text-primary mt-4">
                    If you are a farmer or entrepreneur, this is the best time to start!
                </p>
            </>
        )
    },
    'increase-farm-yield': {
        title: "How Can Agriculture Drones Increase My Farm's Yield?",
        category: 'Technology',
        date: 'Dec 22, 2024',
        author: 'XroneTech Team',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1625246333195-981d549e7293?w=1200&auto=format&fit=crop&q=80',
        content: (
            <>
                <p className="lead text-xl text-muted-foreground mb-8">
                    Farming in India is not easy. Farmers face many problems like low crop yield, pests, and high labor costs.
                    But now, new technology is helping farmers. One of the best innovations is agriculture drones.
                    These flying machines can help farmers grow more crops, save time, and reduce costs.
                </p>
                <p>
                    In this blog, we will see how drones can solve real problems for farmers and improve farm yield.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">What Are Agriculture Drones?</h2>
                <p>
                    Agriculture drones are small flying machines that help in farming. They can spray pesticides, check crop health, and even plant seeds.
                    With drones, farmers can work faster and smarter.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Real Problems Farmers Face</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-destructive mb-2">1. Pest Attacks Destroy Crops</h3>
                        <p>
                            Many farmers lose their crops because of pests. Spraying pesticides by hand is slow and uneven. Some areas get too much,
                            while others get too little. This wastes money and does not protect all plants.
                        </p>
                        <div className="bg-primary/10 p-4 rounded-lg mt-3">
                            <span className="font-bold text-primary block mb-1">How Drones Help:</span>
                            <p className="text-sm">
                                Drones spray pesticides evenly on all crops. They cover large fields in minutes, saving time and money.
                                This protects crops from pests and increases yield.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-destructive mb-2">2. High Cost of Labor</h3>
                        <p>
                            Finding workers for farming is hard and expensive. Manual spraying, checking crops, and planting take a lot of time and effort.
                        </p>
                        <div className="bg-primary/10 p-4 rounded-lg mt-3">
                            <span className="font-bold text-primary block mb-1">How Drones Help:</span>
                            <p className="text-sm">
                                Drones do these tasks much faster. One drone can do the work of many workers in less time. This reduces labor costs and makes farming easier.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-destructive mb-2">3. Water Wastage in Irrigation</h3>
                        <p>
                            Many farmers waste water by over-irrigating their fields. Some areas get too much water, while others stay dry. This harms crops and increases water bills.
                        </p>
                        <div className="bg-primary/10 p-4 rounded-lg mt-3">
                            <span className="font-bold text-primary block mb-1">How Drones Help:</span>
                            <p className="text-sm">
                                Drones with special cameras find dry spots in fields. Farmers can then water only where needed. This saves water and keeps crops healthy.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-destructive mb-2">4. Late Detection of Crop Diseases</h3>
                        <p>
                            Sometimes, farmers do not see crop diseases until it is too late. By then, much of the crop is already damaged.
                        </p>
                        <div className="bg-primary/10 p-4 rounded-lg mt-3">
                            <span className="font-bold text-primary block mb-1">How Drones Help:</span>
                            <p className="text-sm">
                                Drones take pictures of crops and detect problems early. Farmers can fix issues before they spread, saving crops and increasing production.
                            </p>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Are Drones Expensive for Farmers?</h2>
                <p>
                    Some drones are costly, but the Government of India gives subsidies under programs like Sub-Mission on Agricultural Mechanization (SMAM) to help farmers buy them.
                    Farmers can also rent drones if they cannot afford to buy one.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Future of Drones in Indian Farming</h2>
                <p>
                    Drones will soon be common in Indian farming. As technology improves, drones will become cheaper and better.
                    Many farmers are already using them, and in the future, more farmers will benefit from them.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                <p>
                    Agriculture drones solve real farming problems. They help in spraying, monitoring, and managing farms better.
                    With government support and growing awareness, more farmers will use this technology.
                </p>
                <p className="font-semibold text-primary mt-4">
                    If you are a farmer, think about using drones to improve your farm’s yield. The future of farming is in the sky!
                </p>
            </>
        )
    }
};

const BlogPost = () => {
    const { slug } = useParams();
    const post = blogData[slug as keyof typeof blogData];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
                    <Button asChild>
                        <Link to="/">Go Home</Link>
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1 pt-24 pb-16">
                {/* Article Header */}
                <div className="container-custom max-w-4xl mx-auto mb-12">
                    <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>

                    <div className="space-y-6">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-1.5">
                            {post.category}
                        </Badge>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold text-foreground leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border pb-8">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Article Content */}
                <div className="container-custom max-w-3xl mx-auto">
                    <article className="prose prose-lg prose-green max-w-none 
                prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:shadow-lg
                prose-li:text-muted-foreground
                prose-strong:text-foreground">
                        {post.content}
                    </article>

                    {/* Share / Footer of Article */}

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPost;
