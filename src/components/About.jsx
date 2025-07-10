import { Card, CardContent } from '@/components/ui/card';

export default function AboutSection() {
    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/30">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        About{' '}
                        <span className="bg-gradient-to-r from-cityserve-pink to-cityserve-teal bg-clip-text text-transparent">
                            CityServe
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                        We're building the future of local services - connecting communities with trusted professionals 
                        to make everyday tasks simple and accessible for everyone.
                    </p>
                </div>

                {/* Mission Statement */}
                <div className="mb-20">
                    <Card className="border-0 shadow-lg bg-gradient-to-r from-cityserve-pink/10 to-cityserve-teal/10">
                        <CardContent className="p-8 md:p-12 text-center">
                            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Our Mission</h3>
                            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                                To revolutionize how people access local services by creating a seamless platform that 
                                empowers service providers to grow their businesses while helping customers find reliable, 
                                high-quality services in their neighborhood.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Team Section */}
                <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                        Meet Our{' '}
                        <span className="bg-gradient-to-r from-cityserve-orange to-cityserve-yellow bg-clip-text text-transparent">
                            Team
                        </span>
                    </h3>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        The passionate individuals behind CityServe who are working to transform local service delivery.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <AboutTeam 
                        pic={""} 
                        name={"Raman Shrestha"} 
                        role={"Lead Developer"}
                        description={"Passionate about creating seamless user experiences and building scalable platforms."}
                    />
                    <AboutTeam 
                        pic={""} 
                        name={"Amay Jha"} 
                        role={"Backend Engineer"}
                        description={"Expert in building robust APIs and ensuring platform reliability and security."}
                    />
                    <AboutTeam 
                        pic={""} 
                        name={"Biraj Adhikari"} 
                        role={"Frontend Developer"}
                        description={"Crafting beautiful, intuitive interfaces that users love to interact with."}
                    />
                    <AboutTeam 
                        pic={""} 
                        name={"Bishal Shrestha"} 
                        role={"Full Stack Developer"}
                        description={"Bridging frontend and backend to create cohesive, end-to-end solutions."}
                    />
                </div>
            </div>
        </section>
    );
}

function AboutTeam({ pic, name, role, description }) {
    return (
        <Card className="group text-center bg-card border-border hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-cityserve-teal/50">
            <CardContent className="p-6">
                <div className="relative mb-4">
                    {pic ? (
                        <img 
                            src={pic} 
                            alt={name} 
                            className="mx-auto rounded-full w-24 h-24 object-cover border-4 border-muted group-hover:border-cityserve-teal/50 transition-colors duration-300"
                        />
                    ) : (
                        <div className="mx-auto rounded-full w-24 h-24 bg-gradient-to-br from-cityserve-pink to-cityserve-teal flex items-center justify-center text-white text-2xl font-bold">
                            {name.split(' ').map(n => n[0]).join('')}
                        </div>
                    )}
                </div>
                <h4 className="text-lg font-semibold mb-1 group-hover:text-cityserve-teal transition-colors duration-300">
                    {name}
                </h4>
                <p className="text-sm font-medium text-cityserve-orange mb-3">{role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </CardContent>
        </Card>
    );
}