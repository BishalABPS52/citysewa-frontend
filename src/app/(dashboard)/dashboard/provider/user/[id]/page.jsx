'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import UserProfileCard from '@/components/UserProfileCard'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function ProviderCustomerProfilePage() {
  const router = useRouter()
  const params = useParams()
  const userId = params?.id
  
  // Mock user data - in a real app, this would be fetched from an API
  const [user, setUser] = useState({
    id: userId || '1',
    name: 'Anil Thapa',
    image: 'https://ui-avatars.com/api/?name=Anil+Thapa&background=random',
    rating: 4.5,
    totalReviews: 12,
    totalBookings: 24,
    joinDate: 'January 2024',
    description: 'Regular customer who frequently books home services. Prefers appointments in the morning.',
    bookingHistory: [
      { 
        id: 1, 
        serviceName: 'Deep Cleaning', 
        date: '2025-06-15', 
        status: 'Completed',
        amount: 1800,
        rating: 5
      },
      { 
        id: 2, 
        serviceName: 'Window Cleaning', 
        date: '2025-05-22', 
        status: 'Completed',
        amount: 1200,
        rating: 4
      },
      { 
        id: 3, 
        serviceName: 'Regular Cleaning', 
        date: '2025-04-10', 
        status: 'Completed',
        amount: 1500,
        rating: 5
      },
    ],
    upcomingBookings: [
      { 
        id: 4, 
        serviceName: 'Deep Cleaning', 
        date: '2025-07-20', 
        time: '10:00 AM - 12:00 PM',
        status: 'Confirmed',
        amount: 1800
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
        <h1 className="text-3xl font-bold tracking-tight">Customer Profile</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UserProfileCard 
            user={user} 
            userType="customer"
            onMessageSent={handleMessageSent}
          />
        </div>
        
        <div className="md:col-span-2 space-y-6">
          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Scheduled services for this customer</CardDescription>
            </CardHeader>
            <CardContent>
              {user.upcomingBookings.length > 0 ? (
                <div className="divide-y">
                  {user.upcomingBookings.map(booking => (
                    <div key={booking.id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{booking.serviceName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.date).toLocaleDateString()} • {booking.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">Rs. {booking.amount}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-muted-foreground">
                  No upcoming bookings with this customer.
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Booking History */}
          <Card>
            <CardHeader>
              <CardTitle>Booking History</CardTitle>
              <CardDescription>Past services provided to this customer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.bookingHistory.map(booking => (
                  <div key={booking.id} className="pb-4 border-b last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{booking.serviceName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.date).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(booking.rating)}
                          <span className="text-sm text-muted-foreground">
                            Customer rating
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">Rs. {booking.amount}</p>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                          {booking.status}
                        </span>
                      </div>
                    </div>
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
