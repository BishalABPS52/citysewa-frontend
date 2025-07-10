'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import BookingDetailsDialog from '@/components/dialogs/customer/BookingDetailsDialog'
import MessageProviderDialog from '@/components/dialogs/customer/MessageProviderDialog'
import ConfirmationDialog from '@/components/dialogs/shared/ConfirmationDialog'
import ReviewDialog from '@/components/dialogs/customer/ReviewDialog'
import NewBookingDialog from '@/components/dialogs/customer/NewBookingDialog'

export default function BookingsPage() {
  // Dialog states
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false)
  const [isConfirmCancelOpen, setIsConfirmCancelOpen] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)

  // Mock bookings data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      serviceName: 'Plumbing Repair',
      providerName: 'Ramesh Sharma',
      customerName: 'Anil Thapa',
      date: 'June 30, 2025',
      time: '10:00 AM',
      location: 'Baluwatar, Kathmandu',
      status: 'Confirmed',
      price: 1200,
      payment: 'Paid'
    },
    {
      id: 2,
      serviceName: 'Home Cleaning',
      providerName: 'Sushila Shrestha',
      customerName: 'Pratima Rai',
      date: 'July 2, 2025',
      time: '2:00 PM',
      location: 'Lazimpat, Kathmandu',
      status: 'Pending',
      price: 1500,
      payment: 'Unpaid'
    },
    {
      id: 3,
      serviceName: 'Electrical Work',
      providerName: 'Bijay Tamang',
      customerName: 'Rajan KC',
      date: 'July 5, 2025',
      time: '11:00 AM',
      location: 'Patan, Lalitpur',
      status: 'Confirmed',
      price: 2000,
      payment: 'Paid'
    }
  ])
  
  // State for filtering
  const [filter, setFilter] = useState('all') // 'all', 'confirmed', 'pending'
  
  // Filter bookings based on status
  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status.toLowerCase() === filter)
    
  // Handle view booking details
  const handleViewBookingDetails = (booking) => {
    setSelectedBooking(booking)
    setIsBookingDetailsOpen(true)
  }
  
  // Handle cancel booking
  const handleCancelBooking = () => {
    if (!selectedBooking) return
    // In a real app, this would send a request to the API to cancel the booking
    alert(`Booking #${selectedBooking.id} for ${selectedBooking.serviceName} has been cancelled.`)
    setIsConfirmCancelOpen(false)
  }
  
  // Handle contact provider
  const handleContactProvider = (booking) => {
    setSelectedBooking(booking)
    setIsMessageDialogOpen(true)
  }
  
  // Handle send message
  const handleSendMessage = (messageData) => {
    console.log('Message sent:', messageData)
    // In a real app, this would send the message to an API
    alert(`Your message has been sent to ${messageData.recipient}.`)
  }
  
  // Handle leave review
  const handleLeaveReview = (booking) => {
    setSelectedBooking(booking)
    setIsReviewDialogOpen(true)
  }
  
  // Handle submit review
  const handleSubmitReview = (reviewData) => {
    console.log('Review submitted:', reviewData)
    // In a real app, this would send the review to an API
    alert(`Your review for ${reviewData.booking.serviceName} has been submitted. Thank you!`)
  }

  // Handle new booking
  const handleNewBooking = (bookingData) => {
    const newBooking = {
      id: bookings.length + 1,
      serviceName: bookingData.serviceName,
      providerName: bookingData.providerName,
      customerName: 'Anil Thapa', // This should be the logged-in user's name
      date: bookingData.date,
      time: bookingData.time,
      location: bookingData.location,
      status: 'Pending',
      price: bookingData.price,
      payment: 'Unpaid'
    }
    setBookings([...bookings, newBooking])
    setIsNewBookingOpen(false)
    alert('Your booking has been created successfully.')
  }

  return (
    <div>
      {/* Booking Details Dialog */}
      <BookingDetailsDialog 
        isOpen={isBookingDetailsOpen}
        onClose={() => setIsBookingDetailsOpen(false)}
        booking={selectedBooking}
        userType="customer"
        onContact={(booking) => {
          setIsBookingDetailsOpen(false)
          handleContactProvider(booking)
        }}
        onCancel={(booking) => {
          setIsBookingDetailsOpen(false)
          setSelectedBooking(booking)
          setIsConfirmCancelOpen(true)
        }}
        onReview={(booking) => {
          setIsBookingDetailsOpen(false)
          handleLeaveReview(booking)
        }}
      />
      
      {/* Message Dialog */}
      <MessageProviderDialog
        isOpen={isMessageDialogOpen}
        onClose={() => setIsMessageDialogOpen(false)}
        recipient={selectedBooking?.providerName}
        onSend={handleSendMessage}
      />
      
      {/* Confirmation Dialog for Cancel */}
      <ConfirmationDialog
        isOpen={isConfirmCancelOpen}
        onClose={() => setIsConfirmCancelOpen(false)}
        onConfirm={handleCancelBooking}
        title="Cancel Booking"
        message={`Are you sure you want to cancel your booking for ${selectedBooking?.serviceName}?`}
        confirmText="Yes, Cancel"
        cancelText="No, Keep Booking"
        isDangerous={true}
      />
      
      {/* Review Dialog */}
      <ReviewDialog
        isOpen={isReviewDialogOpen}
        onClose={() => setIsReviewDialogOpen(false)}
        booking={selectedBooking}
        onSubmit={handleSubmitReview}
      />
      
      {/* New Booking Dialog */}
      <NewBookingDialog
        isOpen={isNewBookingOpen}
        onClose={() => setIsNewBookingOpen(false)}
        onSubmit={handleNewBooking}
      />
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">Manage your bookings and appointments.</p>
      </div>
      
      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6">
        <Button 
          variant={filter === 'all' ? "default" : "outline"} 
          onClick={() => setFilter('all')}
          className={filter === 'all' ? "bg-cityserve-pink hover:bg-cityserve-pink/90 text-white" : ""}
        >
          All Bookings
        </Button>
        <Button 
          variant={filter === 'confirmed' ? "default" : "outline"} 
          onClick={() => setFilter('confirmed')}
          className={filter === 'confirmed' ? "bg-cityserve-teal hover:bg-cityserve-teal/90 text-white" : ""}
        >
          Confirmed
        </Button>
        <Button 
          variant={filter === 'pending' ? "default" : "outline"} 
          onClick={() => setFilter('pending')}
          className={filter === 'pending' ? "bg-cityserve-orange hover:bg-cityserve-orange/90 text-white" : ""}
        >
          Pending
        </Button>
      </div>
      
      {/* Bookings List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            {filter === 'all' ? 'All Bookings' : 
             filter === 'confirmed' ? 'Confirmed Bookings' : 
             'Pending Bookings'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-3 px-4 font-medium">Service</th>
                  <th className="py-3 px-4 font-medium">Date & Time</th>
                  <th className="py-3 px-4 font-medium">Provider</th>
                  <th className="py-3 px-4 font-medium">Location</th>
                  <th className="py-3 px-4 font-medium">Price</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-muted/50">
                    <td className="py-3 px-4">{booking.serviceName}</td>
                    <td className="py-3 px-4">
                      <div>{booking.date}</div>
                      <div className="text-sm text-muted-foreground">{booking.time}</div>
                    </td>
                    <td className="py-3 px-4">{booking.providerName}</td>
                    <td className="py-3 px-4">{booking.location}</td>
                    <td className="py-3 px-4">NPR {booking.price}</td>
                    <td className="py-3 px-4">
                      <Badge 
                        className={`${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-100 hover:bg-green-100/80 text-green-700' 
                            : booking.status === 'Completed'
                            ? 'bg-blue-100 hover:bg-blue-100/80 text-blue-700'
                            : 'bg-yellow-100 hover:bg-yellow-100/80 text-yellow-700'
                        }`}
                      >
                        {booking.status}
                      </Badge>
                      <div className="text-xs mt-1 text-muted-foreground">{booking.payment}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewBookingDetails(booking)}
                        >
                          View
                        </Button>
                        {booking.status === 'Pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                              setSelectedBooking(booking)
                              setIsConfirmCancelOpen(true)
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleContactProvider(booking)}
                        >
                          Contact
                        </Button>
                        {booking.status === 'Completed' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-cityserve-orange hover:bg-cityserve-orange/90 text-white"
                            onClick={() => handleLeaveReview(booking)}
                          >
                            Review
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredBookings.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No bookings found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add New Booking Button */}
      <div className="mt-4">
        <Button 
          onClick={() => setIsNewBookingOpen(true)} 
          className="bg-cityserve-pink hover:bg-cityserve-pink/90 text-white"
        >
          + Add New Booking
        </Button>
      </div>
    </div>
  )
}
