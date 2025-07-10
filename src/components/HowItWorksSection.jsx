import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Search & Browse',
      description: 'Find the service you need by browsing categories or searching directly. Filter by location, price, and ratings.',
      icon: '🔍',
      color: 'cityserve-pink'
    },
    {
      number: '02',
      title: 'Connect & Compare',
      description: 'View provider profiles, read reviews, and compare rates. Message providers directly to discuss your project.',
      icon: '💬',
      color: 'cityserve-teal'
    },
    {
      number: '03',
      title: 'Book & Get Service',
      description: 'Book your preferred provider and get the job done. Rate and review after completion to help others.',
      icon: '✅',
      color: 'cityserve-orange'
    }
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How{' '}
            <span className="bg-gradient-to-r from-cityserve-pink to-cityserve-teal bg-clip-text text-transparent">
              It Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Getting the help you need is simple. Follow these three easy steps to connect with
            local service providers and get your project completed.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connecting Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-muted-foreground to-transparent transform translate-x-4"></div>
              )}

              <Card className="text-center bg-card border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  {/* Step Number */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-${step.color} flex items-center justify-center`}>
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="text-4xl mb-4">{step.icon}</div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-cityserve-pink/10 to-cityserve-teal/10 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've found the perfect service providers on Cityसेवा.
            Your next great service experience is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <button className="px-8 py-3 bg-cityserve-pink hover:bg-cityserve-pink/90 text-white font-semibold rounded-full transition-colors">
                Find a Service Provider
              </button>
            </Link>
            <Link href="/auth?tab=signup">
              <button className="px-8 py-3 border border-cityserve-teal text-cityserve-teal hover:bg-cityserve-teal hover:text-white font-semibold rounded-full transition-colors">
                Become a Provider
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
