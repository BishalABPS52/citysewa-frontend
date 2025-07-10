'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AddServiceDialog from '@/components/dialogs/provider/AddServiceDialog'

export default function ProviderServicesPage() {
  // Dialog states
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false)
  
  // Mock services data
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Deep Cleaning',
      description: 'Thorough cleaning of all areas including hard-to-reach spots, appliances, and fixtures.',
      price: 2500,
      duration: '3-4 hours',
      bookings: 87,
      reviews: 32,
      averageRating: 4.8,
      active: true,
      category: 'Cleaning'
    },
    {
      id: 2,
      name: 'Regular Cleaning',
      description: 'Standard cleaning of visible areas, dusting, vacuuming, and mopping.',
      price: 1500,
      duration: '1-2 hours',
      bookings: 42,
      reviews: 18,
      averageRating: 4.6,
      active: true,
      category: 'Cleaning'
    },
    {
      id: 3,
      name: 'Office Cleaning',
      description: 'Professional cleaning services for office spaces, including desks, common areas, and restrooms.',
      price: 5000,
      duration: '4-6 hours',
      bookings: 12,
      reviews: 5,
      averageRating: 4.9,
      active: false,
      category: 'Commercial'
    },
  ])
  
  // Handle adding a new service
  const handleAddService = (serviceData) => {
    console.log('New service added:', serviceData)
    // In a real app, this would send the data to an API
  }
  
  // Handle service activation/deactivation
  const handleToggleServiceStatus = (serviceId) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { ...service, active: !service.active } 
        : service
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Services</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Button className="mt-4 sm:mt-0" onClick={() => setIsAddServiceOpen(true)}>Add New Service</Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="all">All Services</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        
        {/* All Services Tab */}
        <TabsContent value="all">
          <div className="grid gap-6">
            {services.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onToggleStatus={handleToggleServiceStatus} 
              />
            ))}
          </div>
        </TabsContent>
        
        {/* Active Services Tab */}
        <TabsContent value="active">
          <div className="grid gap-6">
            {services.filter(s => s.active).map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onToggleStatus={handleToggleServiceStatus} 
              />
            ))}
            {services.filter(s => s.active).length === 0 && (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">No active services found.</p>
                <Button className="mt-4" variant="outline" onClick={() => setIsAddServiceOpen(true)}>
                  Add a New Service
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Inactive Services Tab */}
        <TabsContent value="inactive">
          <div className="grid gap-6">
            {services.filter(s => !s.active).map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onToggleStatus={handleToggleServiceStatus} 
              />
            ))}
            {services.filter(s => !s.active).length === 0 && (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">No inactive services found.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Service Add Dialog */}
      <AddServiceDialog
        isOpen={isAddServiceOpen}
        onClose={() => setIsAddServiceOpen(false)}
        onAdd={handleAddService}
      />
    </div>
  )
}

// Service Card Component
function ServiceCard({ service, onToggleStatus }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {service.name}
              <Badge className={service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                {service.active ? 'Active' : 'Inactive'}
              </Badge>
            </CardTitle>
            <CardDescription className="mt-1">{service.description}</CardDescription>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-2">
            <Button size="sm" variant="outline">Edit</Button>
            <Button 
              size="sm" 
              variant={service.active ? "destructive" : "default"}
              onClick={() => onToggleStatus(service.id)}
            >
              {service.active ? 'Deactivate' : 'Activate'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="font-medium">Rs. {service.price.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">{service.duration}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-medium">{service.category}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Bookings</p>
              <p className="font-medium">{service.bookings}</p>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">Rating:</p>
              <div className="flex items-center">
                <span className="font-medium">{service.averageRating}</span>
                <span className="text-yellow-500 ml-1">★</span>
                <span className="text-sm text-muted-foreground ml-2">
                  ({service.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
