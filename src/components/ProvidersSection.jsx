import { Button } from '@/components/ui/button'
import ServiceCard from '@/components/ServiceCard'
import { sampleProviders } from '@/lib/data'

export default function ProvidersSection() {
  // Show first 6 providers
  const featuredProviders = sampleProviders.slice(0, 6)

  return (
    <section id="providers" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured{' '}
            <span className="bg-gradient-to-r from-cityserve-orange to-cityserve-yellow bg-clip-text text-transparent">
              Providers
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet some of our top-rated service providers. All professionals on CityServe are
            verified, highly skilled, and ready to help with your next project.
          </p>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProviders.map((provider) => (
            <ServiceCard key={provider.id} provider={provider} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="mb-6">
            <p className="text-lg text-muted-foreground mb-4">
              Looking for something specific? Browse all {sampleProviders.length}+ verified providers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-cityserve-pink hover:bg-cityserve-pink/90 text-white px-8"
                onClick={() => window.location.href = "/auth"}
              >
                Browse All Providers
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cityserve-teal text-cityserve-teal hover:bg-cityserve-teal hover:text-white px-8"
              >
                Post a Job Request
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl font-bold text-cityserve-pink mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Verified Providers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cityserve-teal mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Service Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cityserve-orange mb-2">10k+</div>
            <div className="text-sm text-muted-foreground">Jobs Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cityserve-green mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}
