import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Contact() {
    return(
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 to-background">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Get In{' '}
                        <span className="bg-gradient-to-r from-cityserve-orange to-cityserve-pink bg-clip-text text-transparent">
                            Touch
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Have questions, suggestions, or want to partner with us? We'd love to hear from you. 
                        Reach out through any of the channels below.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-cityserve-teal/10 to-cityserve-green/10">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-6 flex items-center">
                                    <span className="w-8 h-8 bg-cityserve-teal rounded-full flex items-center justify-center text-white mr-3">
                                        📧
                                    </span>
                                    Contact Information
                                </h3>
                                <div className="space-y-6">
                                    <ContactMethod 
                                        icon="📧"
                                        title="Email Us"
                                        description="Drop us a line anytime"
                                        contact="stharamanlm10@gmail.com"
                                        href="mailto:stharamanlm10@gmail.com"
                                        color="cityserve-teal"
                                    />
                                    <ContactMethod 
                                        icon="📱"
                                        title="Follow Us"
                                        description="Stay updated with our latest news"
                                        contact="Connect on social media"
                                        href="#social"
                                        color="cityserve-orange"
                                    />
                                    <ContactMethod 
                                        icon="🌍"
                                        title="Location"
                                        description="Based in Nepal"
                                        contact="Serving communities nationwide"
                                        href="#"
                                        color="cityserve-green"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-8">
                                <h3 className="text-xl font-bold mb-6">Why Choose CityServe?</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 rounded-lg bg-cityserve-pink/10">
                                        <div className="text-2xl font-bold text-cityserve-pink">24/7</div>
                                        <div className="text-sm text-muted-foreground">Support</div>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-cityserve-teal/10">
                                        <div className="text-2xl font-bold text-cityserve-teal">100+</div>
                                        <div className="text-sm text-muted-foreground">Services</div>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-cityserve-orange/10">
                                        <div className="text-2xl font-bold text-cityserve-orange">1000+</div>
                                        <div className="text-sm text-muted-foreground">Happy Customers</div>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-cityserve-green/10">
                                        <div className="text-2xl font-bold text-cityserve-green">5★</div>
                                        <div className="text-sm text-muted-foreground">Average Rating</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Social Media Links */}
                    <div className="space-y-8">
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-6 flex items-center">
                                    <span className="w-8 h-8 bg-cityserve-orange rounded-full flex items-center justify-center text-white mr-3">
                                        🔗
                                    </span>
                                    Connect With Us
                                </h3>
                                <div className="space-y-4">
                                    <SocialLink 
                                        platform="Email"
                                        icon="📧"
                                        username="stharamanlm10@gmail.com"
                                        href="mailto:stharamanlm10@gmail.com"
                                        description="Send us an email anytime"
                                        color="cityserve-teal"
                                    />
                                    <SocialLink 
                                        platform="LinkedIn"
                                        icon="💼"
                                        username="Raman Shrestha"
                                        href="https://www.linkedin.com/in/raman-shrestha-23272a245?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                        description="Connect professionally"
                                        color="cityserve-pink"
                                    />
                                    <SocialLink 
                                        platform="Facebook"
                                        icon="📘"
                                        username="@xtha.raamann"
                                        href="https://www.facebook.com/xtha.raamann"
                                        description="Follow our updates"
                                        color="cityserve-orange"
                                    />
                                    <SocialLink 
                                        platform="Instagram"
                                        icon="📸"
                                        username="@cityserve"
                                        href="https://www.facebook.com/xtha.raamann"
                                        description="See our latest posts"
                                        color="cityserve-green"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Call to Action */}
                        <Card className="border-0 shadow-lg bg-gradient-to-r from-cityserve-pink/20 to-cityserve-teal/20">
                            <CardContent className="p-8 text-center">
                                <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
                                <p className="text-muted-foreground mb-6">
                                    Join thousands of satisfied customers and service providers on CityServe today.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ContactMethod({ icon, title, description, contact, href, color }) {
    return (
        <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-300">
            <div className={`w-10 h-10 bg-${color} rounded-full flex items-center justify-center text-white flex-shrink-0`}>
                {icon}
            </div>
            <div className="flex-1">
                <h4 className="font-semibold text-foreground">{title}</h4>
                <p className="text-sm text-muted-foreground mb-1">{description}</p>
                <a 
                    href={href} 
                    className={`text-sm text-${color} hover:underline`}
                    target={href.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                >
                    {contact}
                </a>
            </div>
        </div>
    );
}

function SocialLink({ platform, icon, username, href, description, color }) {
    return (
        <a 
            href={href} 
            target={href.startsWith('mailto:') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="block p-4 rounded-lg border border-border hover:border-current hover:shadow-md transition-all duration-300 group"
        >
            <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-${color} rounded-full flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                </div>
                <div className="flex-1">
                    <h4 className={`font-semibold text-${color} group-hover:text-current transition-colors duration-300`}>
                        {platform}
                    </h4>
                    <p className="text-sm text-foreground">{username}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <div className="text-muted-foreground group-hover:text-current transition-colors duration-300">
                    →
                </div>
            </div>
        </a>
    );
}