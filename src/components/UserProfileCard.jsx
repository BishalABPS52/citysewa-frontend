'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Calendar, Clock, MessageSquare, UserCircle, RefreshCw } from 'lucide-react'
import MessageProviderDialog from '@/components/dialogs/customer/MessageProviderDialog'
import MessageCustomerDialog from '@/components/dialogs/provider/MessageCustomerDialog'

export default function UserProfileCard({ 
  user, 
  userType = 'provider', 
  onMessageSent = () => {}
}) {
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  
  // Default user data if not provided
  const defaultUser = {
    name: userType === 'provider' ? 'Service Provider' : 'Customer',
    image: `https://ui-avatars.com/api/?name=${userType === 'provider' ? 'Service+Provider' : 'Customer'}&background=random`,
    rating: 4.5,
    totalReviews: 27,
    totalBookings: 42,
    availability: 'Mon-Fri, 9AM-5PM',
    joinDate: 'June 2025',
    description: userType === 'provider' 
      ? 'Professional service provider with expertise in their field.' 
      : 'Active customer who regularly books services.',
    profession: userType === 'provider' ? 'Professional Service Provider' : null,
  }
  
  // Merge provided user data with defaults
  const userData = { ...defaultUser, ...user }
  
  // Handle sending a message
  const handleSendMessage = ({ recipient, message }) => {
    console.log(`Message sent to ${recipient}: ${message}`)
    onMessageSent({ recipient, message })
    setIsMessageDialogOpen(false)
  }
  
  // Generate star rating display
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      )
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-yellow-400" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )
    }
    
    // Empty stars
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-yellow-400" />
      )
    }
    
    return stars
  }
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/30 pb-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-cityserve-pink">
            <img 
              src={userData.image} 
              alt={userData.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <CardTitle>{userData.name}</CardTitle>
            <CardDescription>
              {userData.profession && (
                <span className="block">{userData.profession}</span>
              )}
              <span>Member since {userData.joinDate}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Rating & Reviews</h3>
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(userData.rating)}
              </div>
              <span className="text-sm font-medium">{userData.rating}</span>
              <span className="text-sm text-muted-foreground">({userData.totalReviews} reviews)</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Bookings</h3>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-cityserve-pink" />
              <span>{userData.totalBookings} bookings completed</span>
            </div>
          </div>
          
          {userType === 'provider' && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Availability</h3>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cityserve-pink" />
                <span>{userData.availability}</span>
              </div>
            </div>
          )}
          
          {userData.description && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">About</h3>
              <p className="text-sm">{userData.description}</p>
            </div>
          )}
          
          <div className="pt-4">
            <Button 
              onClick={() => setIsMessageDialogOpen(true)} 
              className="w-full bg-cityserve-pink hover:bg-cityserve-pink/90"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </CardContent>
      
      {/* Message Dialog */}
      {userType === 'provider' ? (
        <MessageProviderDialog
          isOpen={isMessageDialogOpen}
          onClose={() => setIsMessageDialogOpen(false)}
          recipient={userData.name}
          onSend={handleSendMessage}
        />
      ) : (
        <MessageCustomerDialog
          isOpen={isMessageDialogOpen}
          onClose={() => setIsMessageDialogOpen(false)}
          recipient={userData.name}
          onSend={handleSendMessage}
        />
      )}
    </Card>
  )
}
