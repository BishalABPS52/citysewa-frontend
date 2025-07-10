'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import ServiceCard from '@/components/ServiceCard'
import SearchSuggestions from '@/components/SearchSuggestions'
import { providers, serviceCategories } from '@/lib/data'

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState('rating')

  // Get unique locations from providers
  const locations = useMemo(() => {
    const locs = [...new Set(providers.map(p => p.location))]
    return locs.sort()
  }, [])

  // Get all services from categories
  const allServices = useMemo(() => {
    return serviceCategories.flatMap(cat => cat.services)
  }, [])

  // Filter providers based on search criteria
  const filteredProviders = useMemo(() => {
    let filtered = providers.filter(provider => {
      // Text search
      const matchesSearch = searchQuery === '' ||
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))

      // Category filter
      const matchesCategory = selectedCategory === 'all' || provider.category === selectedCategory

      // Location filter
      const matchesLocation = selectedLocation === 'all' || provider.location === selectedLocation

      // Price filter
      const matchesPrice = provider.hourlyRate >= priceRange[0] && provider.hourlyRate <= priceRange[1]

      return matchesSearch && matchesCategory && matchesLocation && matchesPrice
    })

    // Sort providers
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'price-low':
          return a.hourlyRate - b.hourlyRate
        case 'price-high':
          return b.hourlyRate - a.hourlyRate
        case 'reviews':
          return b.reviewCount - a.reviewCount
        default:
          return 0
      }
    })
  }, [searchQuery, selectedCategory, selectedLocation, priceRange, sortBy])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedLocation('all')
    setPriceRange([0, 200])
    setSortBy('rating')
  }

  // Handle search query update from SearchSuggestions
  const handleSearchUpdate = (query) => {
    setSearchQuery(query)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
      <div className="max-w-7xl mx-auto">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect{' '}
            <span className="bg-gradient-to-r from-cityserve-pink to-cityserve-teal bg-clip-text text-transparent">
              Service Provider
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Search, filter, and connect with local professionals who match your exact needs.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 bg-card border-border">
          <CardContent className="p-6">
            {/* Main Search Bar */}
            <div className="mb-6">
              <SearchSuggestions onSearchUpdate={handleSearchUpdate} />
            </div>
            
            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Service Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm"
                >
                  <option value="all">All Categories</option>
                  {serviceCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm"
                >
                  <option value="all">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="5"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-xs text-muted-foreground">
                    $0 - ${priceRange[1]}/hour
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full h-10 px-3 bg-background border border-border rounded-md text-sm"
                >
                  <option value="rating">Highest Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>

            {/* Active Filters and Clear */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge variant="secondary" className="bg-cityserve-pink text-white">
                    Search: "{searchQuery}"
                  </Badge>
                )}
                {selectedCategory !== 'all' && (
                  <Badge variant="secondary" className="bg-cityserve-teal text-white">
                    {serviceCategories.find(cat => cat.id === selectedCategory)?.name}
                  </Badge>
                )}
                {selectedLocation !== 'all' && (
                  <Badge variant="secondary" className="bg-cityserve-orange text-white">
                    {selectedLocation}
                  </Badge>
                )}
                {priceRange[1] < 200 && (
                  <Badge variant="secondary" className="bg-cityserve-green text-white">
                    Under ${priceRange[1]}/hr
                  </Badge>
                )}
              </div>

              {(searchQuery || selectedCategory !== 'all' || selectedLocation !== 'all' || priceRange[1] < 200) && (
                <Button variant="outline" onClick={clearFilters} size="sm">
                  Clear All Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-lg text-muted-foreground">
            Found <span className="font-semibold text-foreground">{filteredProviders.length}</span> service providers
          </p>
        </div>

        {/* Results Grid */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProviders.map((provider) => (
              <ServiceCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-foreground mb-4">No providers found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Try adjusting your search criteria or filters to find more providers.
            </p>
            <Button onClick={clearFilters} className="bg-cityserve-pink hover:bg-cityserve-pink/90 text-white">
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Load More (if needed) */}
        {filteredProviders.length >= 9 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-cityserve-teal text-cityserve-teal hover:bg-cityserve-teal hover:text-white">
              Load More Providers
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
