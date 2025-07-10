'use client';

import { useState, useEffect } from 'react';
import { serviceAPI } from '@/lib/api';
import ServiceCard from './ServiceCard';
import { Button } from './ui/button';

export default function FeaturedServices() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'cleaning', name: 'Cleaning' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'electrical', name: 'Electrical' },
    { id: 'plumbing', name: 'Plumbing' },
    { id: 'cooking', name: 'Cooking & Catering' },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      setError(null);
      
      // Mock data for development or when API is unavailable
      const mockServices = [
        {
          id: 1,
          name: 'Home Cleaning',
          description: 'Professional home cleaning services',
          price: 1500,
          average_rating: 4.5,
          image_url: '/images/dummy-bank-qr.png',
          provider_name: 'CleanHome Services',
          location: 'Kathmandu',
          category: 'cleaning'
        },
        {
          id: 2,
          name: 'Plumbing Repair',
          description: 'Expert plumbing services for your home',
          price: 1200,
          average_rating: 4.2,
          image_url: '/images/dummy-esewa-qr.png',
          provider_name: 'FixIt Plumbing',
          location: 'Lalitpur',
          category: 'plumbing'
        },
        {
          id: 3,
          name: 'Electrical Installation',
          description: 'Certified electricians for all your needs',
          price: 2000,
          average_rating: 4.8,
          image_url: '/images/dummy-khalti-qr.png',
          provider_name: 'PowerUp Electricals',
          location: 'Bhaktapur',
          category: 'electrical'
        },
        {
          id: 4,
          name: 'Painting Services',
          description: 'Quality painting for your home or office',
          price: 3500,
          average_rating: 4.0,
          image_url: '/images/dummy-bank-qr.png',
          provider_name: 'ColorPro Painters',
          location: 'Kathmandu',
          category: 'maintenance'
        },
        {
          id: 5,
          name: 'Party Catering',
          description: 'Delicious food for your special occasions',
          price: 5000,
          average_rating: 4.7,
          image_url: '/images/dummy-esewa-qr.png',
          provider_name: 'Tasty Bites Catering',
          location: 'Lalitpur',
          category: 'cooking'
        },
        {
          id: 6,
          name: 'Appliance Repair',
          description: 'Fast and reliable appliance repairs',
          price: 1800,
          average_rating: 4.3,
          image_url: '/images/dummy-khalti-qr.png',
          provider_name: 'ApplianceFix Pro',
          location: 'Kathmandu',
          category: 'maintenance'
        }
      ];
      
      try {
        // Try to fetch from API first
        const data = await serviceAPI.getAllServices();
        console.log('Services fetched from API:', data);
        setServices(data);
      } catch (apiError) {
        console.error('API request error:', apiError);
        
        // Fall back to mock data
        console.log('Using mock data instead');
        setServices(mockServices);
        
        // Set a user-friendly error
        setError('Unable to connect to service. Showing sample data instead.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter services by category
  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(service => service.category === activeCategory);

  // Take only the featured or first 6 services
  const featuredServices = filteredServices.slice(0, 6);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Popular Services</h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          Discover the most popular services available in your area, provided by verified local professionals.
        </p>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="mb-2"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading services...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-amber-500 bg-amber-50 border border-amber-200 rounded-md p-3 inline-block">
              {error}
            </p>
          </div>
        ) : featuredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services found in this category.</p>
          </div>
        )}

        {services.length > 6 && (
          <div className="text-center mt-10">
            <Button variant="outline" className="border-cityserve-pink text-cityserve-pink hover:bg-cityserve-pink/10">
              View All Services
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
