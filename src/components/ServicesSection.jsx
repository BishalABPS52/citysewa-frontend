import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { serviceCategories } from '@/lib/data'
import Link from 'next/link'

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Browse{' '}
            <span className="bg-gradient-to-r from-cityserve-teal to-cityserve-green bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover local professionals across all service categories. From home repairs to personal development,
            we've got you covered.
          </p>
        </div>

        {/* Service Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category) => (
            <Card
              key={category.id}
              className="group overflow-hidden border border-border/50 hover:border-border hover:shadow-md transition-all duration-300 bg-card"
            >
              <div className={`h-2 w-full ${
                category.color === 'cityserve-teal' ? 'bg-cityserve-teal' : 
                category.color === 'cityserve-blue' ? 'bg-cityserve-blue' : 
                category.color === 'cityserve-green' ? 'bg-cityserve-green' : 
                'bg-cityserve-pink'
              }`}></div>
              <CardContent className="p-6">
                {/* Category Name */}
                <h3 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border/50">{category.name}</h3>

                {/* Services List */}
                <ul className="space-y-2.5 mb-6">
                  {category.services.slice(0, 4).map((service) => (
                    <li key={service} className="text-foreground hover:text-accent-custom transition-colors py-1 border-b border-border/20">
                      <Link href="/auth" className="flex justify-between items-center">
                        <span>{service}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-accent-custom">View</span>
                      </Link>
                    </li>
                  ))}

                  {category.services.length > 4 && (
                    <li className="text-sm text-muted-foreground pt-1">
                      +{category.services.length - 4} more services
                    </li>
                  )}
                </ul>

                {/* View All Button */}
                <Link 
                  href="/auth"
                  className={`block w-full text-center py-2 rounded-md text-sm font-medium transition-colors 
                    ${category.color === 'cityserve-teal' 
                      ? 'border border-cityserve-teal text-cityserve-teal hover:bg-cityserve-teal/10' 
                      : category.color === 'cityserve-blue'
                        ? 'border border-cityserve-blue text-cityserve-blue hover:bg-cityserve-blue/10'
                        : category.color === 'cityserve-green'
                          ? 'border border-cityserve-green text-cityserve-green hover:bg-cityserve-green/10'
                          : 'border border-cityserve-pink text-cityserve-pink hover:bg-cityserve-pink/10'
                    }`}
                >
                  View All {category.name}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-card p-8 rounded-xl shadow-sm border border-border mx-auto max-w-3xl">
          <h3 className="text-2xl font-bold mb-3">Can't find what you're looking for?</h3>
          <p className="text-muted-foreground mb-6">
            We can help connect you with specialized service providers
          </p>
          <Link href="/auth">
            <button className="px-8 py-3 bg-accent-custom hover:bg-accent-custom/90 text-white font-medium rounded-md transition-colors">
              Request a Service
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
