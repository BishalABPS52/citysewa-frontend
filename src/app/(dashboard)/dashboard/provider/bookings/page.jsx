'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import BookingDetailsDialog from '@/components/dialogs/provider/BookingDetailsDialog'
import MessageCustomerDialog from '@/components/dialogs/provider/MessageCustomerDialog'
import ConfirmationDialog from '@/components/dialogs/shared/ConfirmationDialog'
import { useRouter } from 'next/navigation'

export default function ProviderBookingsPage() {
  const router = useRouter()
  // Dialog states
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [confirmationAction, setConfirmationAction] = useState({ type: '', message: '' })

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      serviceName: 'Plumbing Repair',
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
      customerName: 'Rajan KC',
      date: 'July 4, 2025',
      time: '11:30 AM',
      location: 'Thamel, Kathmandu',
      status: 'Confirmed',
      price: 1800,
      payment: 'Paid'
    },
    {
      id: 4,
      serviceName: 'Yoga Session',
      customerName: 'Manish Poudel',
      date: 'July 5, 2025',
      time: '8:00 AM',
      location: 'Budhanilkantha, Kathmandu',
      status: 'Confirmed',
      price: 900,
      payment: 'Paid'
    },
    {
      id: 5,
      serviceName: 'Web Development',
      customerName: 'Sarita Sharma',
      date: 'July 8, 2025',
      time: '3:00 PM',
      location: 'Online',
      status: 'Pending',
      price: 2500,
      payment: 'Unpaid'
    },
  ]
  
  // State for filtering
  const [filter, setFilter] = useState('all') // 'all', 'confirmed', 'pending'
  
  // Filter bookings based on status
  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status.toLowerCase() === filter)

  // Handle opening details dialog
  const handleOpenDetailsDialog = (booking) => {
    setSelectedBooking(booking)
    setIsDetailsDialogOpen(true)
  }

  // Handle opening message dialog
  const handleOpenMessageDialog = (booking) => {
    setSelectedCustomer(booking.customerName)
    setSelectedBooking(booking)
    setIsMessageDialogOpen(true)
  }

  // Handle accepting booking
  const handleAcceptBooking = (booking) => {
    // This would call an API in a real app
    alert(`Booking for ${booking.serviceName} with ${booking.customerName} has been accepted.`)
  }

  // Handle rejecting booking
  const handleRejectBooking = (booking) => {
    setSelectedBooking(booking)
    setConfirmationAction({
      type: 'reject',
      message: `Are you sure you want to reject the booking for ${booking.serviceName} with ${booking.customerName}?`
    })
    setIsConfirmationDialogOpen(true)
  }

  // Handle completing booking
  const handleCompleteBooking = (booking) => {
    setSelectedBooking(booking)
    setConfirmationAction({
      type: 'complete',
      message: `Are you sure you want to mark the booking for ${booking.serviceName} with ${booking.customerName} as completed?`
    })
    setIsConfirmationDialogOpen(true)
  }

  // Execute confirmation action
  const executeConfirmationAction = () => {
    if (!selectedBooking) return
    
    switch (confirmationAction.type) {
      case 'reject':
        // This would call an API in a real app
        alert(`Booking for ${selectedBooking.serviceName} with ${selectedBooking.customerName} has been rejected.`)
        break
      case 'complete':
        // This would call an API in a real app
        alert(`Booking for ${selectedBooking.serviceName} with ${selectedBooking.customerName} has been marked as completed.`)
        break
      default:
        break
    }
  }

  // Handle message sent
  const handleMessageSent = ({ recipient, message }) => {
    // This would call an API in a real app
    console.log(`Message sent to ${recipient}: ${message}`)
    alert(`Your message has been sent to ${recipient}.`)
  }

  // Handle calendar view
  const handleCalendarView = () => {
    router.push('/dashboard/provider/calendar') // This would navigate to a calendar view in a real app
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Service Appointments</h1>
        <p className="text-muted-foreground">Manage your upcoming appointments and service schedule.</p>
      </div>
      
      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6">
        <Button 
          variant={filter === 'all' ? "default" : "outline"} 
          onClick={() => setFilter('all')}
          className={filter === 'all' ? "bg-cityserve-pink hover:bg-cityserve-pink/90 text-white" : ""}
        >
          All Appointments
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
      
      {/* Calendar View Button */}
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          className="flex items-center"
          onClick={handleCalendarView}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          Calendar View
        </Button>
      </div>
      
      {/* Bookings List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            {filter === 'all' ? 'All Appointments' : 
             filter === 'confirmed' ? 'Confirmed Appointments' : 
             'Pending Appointments'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-3 px-4 font-medium">Service</th>
                  <th className="py-3 px-4 font-medium">Date & Time</th>
                  <th className="py-3 px-4 font-medium">Customer</th>
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
                    <td className="py-3 px-4">{booking.customerName}</td>
                    <td className="py-3 px-4">{booking.location}</td>
                    <td className="py-3 px-4">NPR {booking.price}</td>
                    <td className="py-3 px-4">
                      <Badge 
                        className={`${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-100 hover:bg-green-100/80 text-green-700' 
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
                          onClick={() => handleOpenDetailsDialog(booking)}
                        >
                          Details
                        </Button>
                        {booking.status === 'Pending' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-cityserve-teal hover:bg-cityserve-teal/90 text-white"
                            onClick={() => handleAcceptBooking(booking)}
                          >
                            Accept
                          </Button>
                        )}
                        {booking.status === 'Confirmed' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-cityserve-blue hover:bg-cityserve-blue/90 text-white"
                            onClick={() => handleCompleteBooking(booking)}
                          >
                            Complete
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
              <p className="text-muted-foreground">No appointments found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking Details Dialog */}
      <BookingDetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        booking={selectedBooking}
        userType="provider"
        onAccept={handleAcceptBooking}
        onReject={handleRejectBooking}
        onComplete={handleCompleteBooking}
        onContact={(booking) => {
          setSelectedCustomer(booking.customerName)
          setIsDetailsDialogOpen(false)
          setIsMessageDialogOpen(true)
        }}
      />

      {/* Message Dialog */}
      <MessageCustomerDialog
        isOpen={isMessageDialogOpen}
        onClose={() => setIsMessageDialogOpen(false)}
        recipient={selectedCustomer}
        onSend={handleMessageSent}
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmationDialogOpen}
        onClose={() => setIsConfirmationDialogOpen(false)}
        onConfirm={executeConfirmationAction}
        title={confirmationAction.type === 'reject' ? 'Reject Booking' : 'Complete Booking'}
        message={confirmationAction.message}
        confirmText={confirmationAction.type === 'reject' ? 'Reject' : 'Complete'}
        isDangerous={confirmationAction.type === 'reject'}
      />
    </div>
  )
}
