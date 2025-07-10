'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BadgeCheck, Bell, Calendar, Clock, MessageSquare, Settings, CreditCard, Wrench } from 'lucide-react'
import BookingDetailsDialog from '@/components/dialogs/provider/BookingDetailsDialog'
import AddServiceDialog from '@/components/dialogs/provider/AddServiceDialog'
import MessageCustomerDialog from '@/components/dialogs/provider/MessageCustomerDialog'
import AvailabilityDialog from '@/components/dialogs/provider/AvailabilityDialog'
import { useAuth } from '@/context/AuthContext'

export default function ProviderDashboard() {
  // Dialog states
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false)
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  
  // Get authenticated user data
  const { user, isLoading } = useAuth()

  // Mock provider data - fallback to this when user data is not available
  const defaultProvider = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    joinedDate: 'June 2025',
    profession: 'Professional Cleaner',
    isVerified: true,
    rating: 4.8,
    reviewCount: 47,
    totalBookings: 156,
    totalEarnings: 125000,
  }
  
  // Combine real user data with mock data
  const provider = {
    ...defaultProvider,
    // Use real user data if available, otherwise fall back to mock data
    name: user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || defaultProvider.name : defaultProvider.name,
    email: user?.email || defaultProvider.email,
  }

  // Mock upcoming bookings/appointments data
  const upcomingAppointments = [
    {
      id: 1,
      customerName: 'Anil Thapa',
      serviceName: 'Deep Cleaning',
      date: 'June 30, 2025',
      time: '10:00 AM',
      location: 'Baluwatar, Kathmandu',
      status: 'Confirmed',
      price: 2500,
      payment: 'Paid'
    },
    {
      id: 2,
      customerName: 'Pratima Rai',
      serviceName: 'Regular Cleaning',
      date: 'July 2, 2025',
      time: '2:00 PM',
      location: 'Lazimpat, Kathmandu',
      status: 'Pending',
      price: 1500,
      payment: 'Unpaid'
    },
  ]
  
  // Mock services data
  const services = [
    {
      id: 1,
      name: 'Deep Cleaning',
      price: 2500,
      duration: '3-4 hours',
      bookings: 87,
      active: true,
    },
    {
      id: 2,
      name: 'Regular Cleaning',
      price: 1500,
      duration: '1-2 hours',
      bookings: 42,
      active: true,
    },
    {
      id: 3,
      name: 'Office Cleaning',
      price: 5000,
      duration: '4-6 hours',
      bookings: 12,
      active: false,
    },
  ]

  // Mock notifications
  const notifications = [
    {
      id: 1,
      message: 'New booking request from Anil Thapa',
      time: '10 minutes ago',
      type: 'booking'
    },
    {
      id: 2,
      message: 'New message from Pratima Rai regarding her booking',
      time: '1 hour ago',
      type: 'message'
    },
    {
      id: 3,
      message: 'Payment of Rs. 2,500 received for Deep Cleaning',
      time: '3 hours ago',
      type: 'payment'
    }
  ]
  
  // Mock recent earnings data
  const recentEarnings = [
    { id: 1, customer: 'Biplab Shrestha', service: 'Deep Cleaning', amount: 2500, date: 'June 25, 2025' },
    { id: 2, customer: 'Sarita Sharma', service: 'Regular Cleaning', amount: 1500, date: 'June 23, 2025' },
    { id: 3, customer: 'Manish Poudel', service: 'Window Cleaning', amount: 1000, date: 'June 20, 2025' },
  ]
  
  // Handle viewing booking details
  const handleViewBookingDetails = (booking) => {
    setSelectedBooking(booking)
    setIsBookingDetailsOpen(true)
  }
  
  // Handle adding a new service
  const handleAddService = (serviceData) => {
    console.log('New service added:', serviceData)
    // In a real app, this would send the data to an API
  }
  
  // Handle sending message to a customer
  const handleMessageCustomer = (customerName) => {
    setSelectedCustomer(customerName)
    setIsMessageDialogOpen(true)
  }
  
  // Handle sending message
  const handleSendMessage = (messageData) => {
    console.log('Message sent:', messageData)
    // In a real app, this would send the message to an API
  }
  
  // Handle updating availability
  const handleUpdateAvailability = (availabilityData) => {
    console.log('Availability updated:', availabilityData)
    // In a real app, this would send the data to an API
  }
  
  // Handle service edit
  const handleEditService = (service) => {
    console.log('Edit service:', service)
    // In a real app, this would open an edit form with the service data
    alert(`Edit service: ${service.name}`)
  }
  
  // Handle pausing a service
  const handlePauseService = (service) => {
    console.log('Pause service:', service)
    // In a real app, this would update the service status
    alert(`${service.name} has been paused. Clients can no longer book this service.`)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Provider Dashboard</h1>
          <p className="text-muted-foreground">
            {isLoading ? 'Loading...' : `Welcome back, ${provider.name}`}
          </p>
        </div>
        <div className="mt-4 flex gap-2 lg:mt-0">
          <Button variant="outline" onClick={() => setIsAvailabilityOpen(true)}>Update Availability</Button>
          <Button onClick={() => setIsAddServiceOpen(true)}>Add New Service</Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-cityserve-pink">{provider.rating}★</div>
              <p className="text-sm text-muted-foreground mt-1">Average Rating</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-cityserve-blue">{provider.totalBookings}</div>
              <p className="text-sm text-muted-foreground mt-1">Total Bookings</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-cityserve-teal">Rs. {provider.totalEarnings.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-1">Total Earnings</p>
              <Link href="/dashboard/provider/earnings" className="text-xs text-cityserve-pink mt-2 hover:underline">
                View payment methods
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-cityserve-orange">{services.filter(s => s.active).length}</div>
              <p className="text-sm text-muted-foreground mt-1">Active Services</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Link href="/dashboard/provider/bookings">
          <Card className="hover:bg-muted/50 transition cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Calendar className="h-8 w-8 text-cityserve-pink mb-2" />
              <p className="text-sm font-medium text-center">Bookings</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/provider/history">
          <Card className="hover:bg-muted/50 transition cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Clock className="h-8 w-8 text-cityserve-blue mb-2" />
              <p className="text-sm font-medium text-center">History</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/provider/messages">
          <Card className="hover:bg-muted/50 transition cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <MessageSquare className="h-8 w-8 text-cityserve-teal mb-2" />
              <p className="text-sm font-medium text-center">Messages</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/provider/settings">
          <Card className="hover:bg-muted/50 transition cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Settings className="h-8 w-8 text-cityserve-orange mb-2" />
              <p className="text-sm font-medium text-center">Settings</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/provider/services">
          <Card className="hover:bg-muted/50 transition cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Wrench className="h-8 w-8 text-purple-500 mb-2" />
              <p className="text-sm font-medium text-center">My Services</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/provider/earnings">
          <Card className="hover:bg-muted/50 transition cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <CreditCard className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-sm font-medium text-center">Earnings</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Bookings */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>Your scheduled services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((booking) => (
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
                      <div>Customer: {booking.customerName}</div>
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
                </div>
              )}
            </div>
            
            {upcomingAppointments.length > 0 && (
              <div className="mt-4 text-center">
                <Link href="/dashboard/provider/bookings">
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

      {/* Services Overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>My Services</CardTitle>
          <CardDescription>Overview of your service offerings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{service.name}</h3>
                    {service.active ? (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
                    ) : (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">Inactive</span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    <span>Rs. {service.price.toLocaleString()} • {service.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground">
                    <span>{service.bookings} bookings</span>
                  </div>
                  <Button size="sm" variant="outline">Edit</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/dashboard/provider/services">
              <Button variant="outline">Manage Services</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
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

      <AddServiceDialog
        isOpen={isAddServiceOpen}
        onClose={() => setIsAddServiceOpen(false)}
        onAdd={handleAddService}
      />

      <MessageCustomerDialog
        isOpen={isMessageDialogOpen}
        onClose={() => {
          setIsMessageDialogOpen(false)
          setSelectedCustomer(null)
        }}
        customer={selectedCustomer}
        onSend={handleSendMessage}
      />

      <AvailabilityDialog
        isOpen={isAvailabilityOpen}
        onClose={() => setIsAvailabilityOpen(false)}
        onUpdate={handleUpdateAvailability}
      />
    </div>
  )
}
