'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import UserProfileCard from '@/components/UserProfileCard'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function UserProfilePage() {
  const router = useRouter()
  const params = useParams()
  const userId = params?.id
  
  // Mock user data - in a real app, this would be fetched from an API
  const [user, setUser] = useState({
    id: userId || '1',
    name: 'Ram Sharma',
    image: 'https://ui-avatars.com/api/?name=Ram+Sharma&background=random',
    rating: 4.8,
    totalReviews: 56,
    totalBookings: 127,
    availability: 'Mon-Sat, 8AM-6PM',
    joinDate: 'June 2023',
    description: 'Experienced plumber with over 10 years of expertise in residential and commercial plumbing services. Specializing in repairs, installations, and maintenance.',
    profession: 'Professional Plumber',
    services: [
      { id: 1, name: 'Pipe Repair', price: 800, duration: '1-2 hours' },
      { id: 2, name: 'Drain Cleaning', price: 1200, duration: '1-3 hours' },
      { id: 3, name: 'Water Heater Installation', price: 3500, duration: '3-4 hours' },
      { id: 4, name: 'Faucet Replacement', price: 600, duration: '1 hour' },
    ],
    reviews: [
      { 
        id: 1, 
        customerName: 'Anil Thapa', 
        rating: 5, 
        comment: 'Excellent service! Fixed my leaky pipe quickly and for a reasonable price.', 
        date: '2025-06-15',
        customerImage: 'https://ui-avatars.com/api/?name=Anil+Thapa&background=random'
      },
      { 
        id: 2, 
        customerName: 'Sunita Rai', 
        rating: 4, 
        comment: 'Very professional and knowledgeable. The only reason for 4 stars is he was a bit late.', 
        date: '2025-06-02',
        customerImage: 'https://ui-avatars.com/api/?name=Sunita+Rai&background=random'
      },
      { 
        id: 3, 
        customerName: 'Binod KC', 
        rating: 5, 
        comment: 'Great service! Solved a complex plumbing issue that others could not fix. Highly recommended!', 
        date: '2025-05-20',
        customerImage: 'https://ui-avatars.com/api/?name=Binod+KC&background=random'
      },
    ]
  })
  
  // Handle sending a message to the user
  const handleMessageSent = ({ recipient, message }) => {
    console.log(`Message sent to ${recipient}: ${message}`)
    alert(`Your message has been sent to ${recipient}.`)
  }
  
  // Generate star rating display
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill={i < rating ? "currentColor" : "none"} 
            stroke="currentColor" 
            className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ))}
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Service Provider Profile</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UserProfileCard 
            user={user} 
            userType="provider"
            onMessageSent={handleMessageSent}
          />
        </div>
        
        <div className="md:col-span-2 space-y-6">
          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
              <CardDescription>List of services provided by {user.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {user.services.map(service => (
                  <div key={service.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">Duration: {service.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">Rs. {service.price}</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="mt-1"
                          onClick={() => router.push('/dashboard/bookings/new')}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>{user.totalReviews} reviews from customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.reviews.map(review => (
                  <div key={review.id} className="pb-4 border-b last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img 
                            src={review.customerImage} 
                            alt={review.customerName} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{review.customerName}</p>
                          <div className="flex items-center gap-2">
                            {renderStars(review.rating)}
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
