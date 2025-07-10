'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BadgeCheck, Bell, Calendar, Clock, MessageSquare, Settings } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useProtectedRoute } from '@/lib/useProtectedRoute'
import { useBookingService } from '@/lib/useBookingService'

import NewBookingDialog from '@/components/dialogs/customer/NewBookingDialog'
import BookingDetailsDialog from '@/components/dialogs/customer/BookingDetailsDialog'
import MessageProviderDialog from '@/components/dialogs/customer/MessageProviderDialog'

export default function CustomerDashboard() {
  // Dialog states
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false)
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [selectedProvider, setSelectedProvider] = useState(null)

  // Protected route hook
  const { isAuthenticated, isLoading: authLoading, user } = useProtectedRoute()
  
  // Booking service hook
  const { 
    bookings, 
    isLoading: bookingsLoading, 
    error: bookingsError, 
    fetchBookings 
  } = useBookingService()

  // Fetch bookings when component mounts
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      fetchBookings()
    }
  }, [isAuthenticated, authLoading, fetchBookings])

  // Get upcoming bookings (those that haven't happened yet)
  const upcomingBookings = bookings?.filter(booking => {
    const bookingDate = new Date(booking.date + ' ' + booking.time)
    return bookingDate > new Date()
  }) || []

  // Mock notifications
  const notifications = [
    {
      id: 1,
      message: 'Your booking with Ramesh Sharma has been confirmed',
      time: '10 minutes ago',
      type: 'booking'
    },
    {
      id: 2,
      message: 'New message from Sujata Gurung regarding your booking',
      time: '1 hour ago',
      type: 'message'
    },
    {
      id: 3,
      message: 'Your payment for Home Cleaning service was successful',
      time: '3 hours ago',
      type: 'payment'
    }
  ]
  
  // Categories for new booking dialog
  const serviceCategories = [
    'Home Maintenance', 
    'Education', 
    'Technology', 
    'Health & Wellness', 
    'Food & Catering'
  ]
  
  // Handle new booking creation
  const handleCreateBooking = (bookingData) => {
    console.log('New booking created:', bookingData)
    // In a real app, this would send the data to an API
  }
  
  // Handle sending message
  const handleSendMessage = (messageData) => {
    console.log('Message sent:', messageData)
    // In a real app, this would send the message to an API
  }
  
  // Open booking details
  const handleViewBookingDetails = (booking) => {
    setSelectedBooking(booking)
    setIsBookingDetailsOpen(true)
  }
  
  // Open message dialog for a specific provider
  const handleMessageProvider = (providerName) => {
    setSelectedProvider(providerName)
    setIsMessageDialogOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'User'}
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Button onClick={() => setIsNewBookingOpen(true)}>Book a Service</Button>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/dashboard/bookings">
          <Card className="hover:bg-muted/50 transition cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Calendar className="h-8 w-8 text-cityserve-pink mb-2" />
              <p className="text-sm font-medium text-center">Bookings</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/history">
          <Card className="hover:bg-muted/50 transition cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Clock className="h-8 w-8 text-cityserve-blue mb-2" />
              <p className="text-sm font-medium text-center">History</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/messages">
          <Card className="hover:bg-muted/50 transition cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <MessageSquare className="h-8 w-8 text-cityserve-teal mb-2" />
              <p className="text-sm font-medium text-center">Messages</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/settings">
          <Card className="hover:bg-muted/50 transition cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Settings className="h-8 w-8 text-cityserve-orange mb-2" />
              <p className="text-sm font-medium text-center">Settings</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="space-y-6">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Upcoming Bookings */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Your scheduled services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingBookings.length > 0 ? (
                  upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex flex-col p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition"
                      onClick={() => handleViewBookingDetails(booking)}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">{booking.serviceName}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <div>Provider: {booking.providerName}</div>
                        <div className="flex justify-between mt-1">
                          <span>{booking.date} • {booking.time}</span>
                          <span className="font-medium">
                            Rs. {booking.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No upcoming bookings</p>
                    <Button 
                      variant="link" 
                      className="mt-2"
                      onClick={() => setIsNewBookingOpen(true)}
                    >
                      Book a service
                    </Button>
                </div>
              )}
            </div>
            
            {upcomingBookings.length > 0 && (
              <div className="mt-4 text-center">
                <Link href="/dashboard/bookings">
                  <Button variant="outline" size="sm">View all bookings</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

          {/* Notifications */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Recent updates and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition">
                      <div className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center ${
                        notification.type === 'booking' 
                          ? 'bg-green-100 text-green-800' 
                          : notification.type === 'message'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {notification.type === 'booking' && (
                          <Calendar className="h-5 w-5" />
                        )}
                        {notification.type === 'message' && (
                          <MessageSquare className="h-5 w-5" />
                        )}
                        {notification.type === 'payment' && (
                          <BadgeCheck className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No new notifications</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialogs */}
      <NewBookingDialog
        isOpen={isNewBookingOpen}
        onClose={() => setIsNewBookingOpen(false)}
        onBook={handleCreateBooking}
        categories={serviceCategories}
        preselectedProvider={selectedProvider}
      />

      {selectedBooking && (
        <BookingDetailsDialog
          isOpen={isBookingDetailsOpen}
          onClose={() => {
            setIsBookingDetailsOpen(false)
            setSelectedBooking(null)
          }}
          booking={selectedBooking}
          onMessage={() => {
            setIsBookingDetailsOpen(false)
            setIsMessageDialogOpen(true)
          }}
        />
      )}

      {selectedProvider && (
        <MessageProviderDialog
          isOpen={isMessageDialogOpen}
          onClose={() => {
            setIsMessageDialogOpen(false)
            setSelectedProvider(null)
          }}
          provider={selectedProvider}
          onSend={handleSendMessage}
        />
      )}
    </div>
  )
}
