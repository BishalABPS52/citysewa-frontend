'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { sampleProviders as providers, serviceCategories } from '@/lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function SearchSuggestions({ onSearchUpdate }) {
  const [query, setQuery] = useState('')
  const [serviceSuggestions, setServiceSuggestions] = useState([])
  const [providerSuggestions, setProviderSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedProvider, setSelectedProvider] = useState(null)
  const suggestionsRef = useRef(null)
  const router = useRouter()
  
  // Get all services from categories
  const allServices = serviceCategories.flatMap(cat => {
    return cat.services.map(service => ({
      id: `${cat.id}-${service.toLowerCase().replace(/\s+/g, '-')}`,
      name: service,
      category: cat.name,
      description: `${service} services in the ${cat.name} category`
    }))
  })

  // Filter suggestions based on query
  useEffect(() => {
    if (query.trim() === '') {
      setServiceSuggestions([])
      setProviderSuggestions([])
      setIsOpen(false)
      return
    }
    
    // Filter services
    const filteredServices = allServices.filter(service => 
      service.name.toLowerCase().includes(query.toLowerCase()) ||
      service.description.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5)
    
    // Filter providers by service type
    const filteredProviders = providers.filter(provider => 
      provider.service.toLowerCase().includes(query.toLowerCase()) ||
      provider.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 3)
    
    setServiceSuggestions(filteredServices)
    setProviderSuggestions(filteredProviders)
    setIsOpen(filteredServices.length > 0 || filteredProviders.length > 0)
    
    // Update parent's search query if provided
    if (onSearchUpdate) {
      onSearchUpdate(query)
    }
  }, [query, onSearchUpdate])
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  // Handle service selection
  const handleSelectService = (service) => {
    setSelectedService(service)
    setSelectedProvider(null)
    setIsConfirmationOpen(true)
    setIsOpen(false)
    
    // Update search query with selected service name
    setQuery(service.name)
    if (onSearchUpdate) {
      onSearchUpdate(service.name)
    }
  }
  
  // Handle provider selection
  const handleSelectProvider = (provider) => {
    setSelectedProvider(provider)
    setSelectedService({
      name: provider.service,
      description: provider.description
    })
    setIsConfirmationOpen(true)
    setIsOpen(false)
    
    // Update search query
    setQuery(provider.service)
    if (onSearchUpdate) {
      onSearchUpdate(provider.service)
    }
  }
  
  // Handle confirmation dialog
  const handleConfirmBooking = () => {
    // In a real app, this would navigate to a booking form or call an API
    if (selectedProvider) {
      router.push(`/dashboard/bookings/new?service=${selectedService.name}&provider=${selectedProvider.id}`)
    } else {
      router.push(`/dashboard/bookings/new?service=${selectedService.name || selectedService.id}`)
    }
    setIsConfirmationOpen(false)
  }
  
  // Format rating to display stars
  const renderRatingStars = (rating) => {
    return (
      <div className="flex text-cityserve-orange">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < Math.floor(rating) ? "" : "text-muted-foreground/30"}>★</span>
        ))}
        <span className="ml-1 text-muted-foreground">{rating}</span>
      </div>
    )
  }
  
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Input
          placeholder="Search for services (e.g. plumbing, painting, cleaning)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 text-base"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      </div>
      
      {isOpen && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 mt-1 w-full bg-background border border-border rounded-md shadow-lg overflow-hidden"
        >
          <div className="max-h-80 overflow-y-auto">
            {/* Service suggestions */}
            {serviceSuggestions.length > 0 && (
              <>
                <div className="p-2 bg-muted/40 text-xs font-medium text-muted-foreground">
                  SERVICES
                </div>
                {serviceSuggestions.map(service => (
                  <div 
                    key={service.id}
                    className="p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
                    onClick={() => handleSelectService(service)}
                  >
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-muted-foreground">{service.description}</div>
                  </div>
                ))}
              </>
            )}
            
            {/* Provider suggestions - "Services Near You" */}
            {providerSuggestions.length > 0 && (
              <>
                <div className="p-2 bg-muted/40 text-xs font-medium text-muted-foreground">
                  SERVICES NEAR YOU
                </div>
                {providerSuggestions.map(provider => (
                  <div 
                    key={provider.id}
                    className="p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
                    onClick={() => handleSelectProvider(provider)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={provider.avatar} alt={provider.name} />
                        <AvatarFallback className="bg-cityserve-pink text-white">
                          {provider.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{provider.name}</div>
                        <div className="text-sm text-cityserve-pink font-medium">{provider.service}</div>
                        <div className="flex items-center text-sm space-x-2">
                          {renderRatingStars(provider.rating)}
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{provider.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Confirmation Dialog */}
      {isConfirmationOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Confirm Booking</h3>
              <button onClick={() => setIsConfirmationOpen(false)} className="text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-6">
              <p className="mb-4">Are you sure you want to book the following service?</p>
              <div className="bg-muted p-4 rounded-md">
                {selectedProvider ? (
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedProvider.avatar} alt={selectedProvider.name} />
                      <AvatarFallback className="bg-cityserve-pink text-white">
                        {selectedProvider.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{selectedProvider.name}</h4>
                      <div className="text-sm text-cityserve-pink">{selectedProvider.service}</div>
                      <div className="flex items-center text-sm">
                        {renderRatingStars(selectedProvider.rating)}
                        <span className="ml-2 text-muted-foreground">({selectedProvider.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <h4 className="font-medium mb-2">{selectedService?.name}</h4>
                )}
                <p className="text-sm text-muted-foreground">
                  {selectedProvider ? selectedProvider.description : selectedService?.description}
                </p>
                {selectedProvider && (
                  <div className="mt-2 text-sm font-medium">
                    NPR {selectedProvider.hourlyRate}/hour
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsConfirmationOpen(false)}>Cancel</Button>
              <Button className="bg-cityserve-pink hover:bg-cityserve-pink/90" onClick={handleConfirmBooking}>
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
