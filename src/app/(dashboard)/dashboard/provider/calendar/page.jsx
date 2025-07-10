'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import BookingDetailsDialog from '@/components/dialogs/provider/BookingDetailsDialog'
import MessageCustomerDialog from '@/components/dialogs/provider/MessageCustomerDialog'
import ConfirmationDialog from '@/components/dialogs/shared/ConfirmationDialog'
import { useRouter } from 'next/navigation'

export default function ProviderCalendarPage() {
  const router = useRouter()
  // Dialog states
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [confirmationAction, setConfirmationAction] = useState({ type: '', message: '' })

  // Current date
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState('week') // 'day', 'week', 'month'

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      serviceName: 'Plumbing Repair',
      customerName: 'Anil Thapa',
      date: '2025-06-30',
      startTime: '10:00',
      endTime: '12:00',
      location: 'Baluwatar, Kathmandu',
      status: 'Confirmed',
      price: 1200,
      payment: 'Paid'
    },
    {
      id: 2,
      serviceName: 'Home Cleaning',
      customerName: 'Pratima Rai',
      date: '2025-07-02',
      startTime: '14:00',
      endTime: '16:00',
      location: 'Lazimpat, Kathmandu',
      status: 'Pending',
      price: 1500,
      payment: 'Unpaid'
    },
    {
      id: 3,
      serviceName: 'Electrical Work',
      customerName: 'Rajan KC',
      date: '2025-07-04',
      startTime: '11:30',
      endTime: '13:30',
      location: 'Thamel, Kathmandu',
      status: 'Confirmed',
      price: 1800,
      payment: 'Paid'
    },
    {
      id: 4,
      serviceName: 'Yoga Session',
      customerName: 'Manish Poudel',
      date: '2025-07-05',
      startTime: '08:00',
      endTime: '09:00',
      location: 'Budhanilkantha, Kathmandu',
      status: 'Confirmed',
      price: 900,
      payment: 'Paid'
    },
    {
      id: 5,
      serviceName: 'Web Development',
      customerName: 'Sarita Sharma',
      date: '2025-07-08',
      startTime: '15:00',
      endTime: '17:00',
      location: 'Online',
      status: 'Pending',
      price: 2500,
      payment: 'Unpaid'
    },
  ]
  
  // Helper functions for calendar
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }
  
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }
  
  // Get bookings for a specific date
  const getBookingsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return bookings.filter(booking => booking.date === dateStr)
  }
  
  // Get days of the week for the current week view
  const getDaysOfWeek = () => {
    const days = []
    const firstDayOfWeek = new Date(currentDate)
    const day = currentDate.getDay()
    
    // Set to the first day of the week (Sunday)
    firstDayOfWeek.setDate(currentDate.getDate() - day)
    
    // Add 7 days to the array
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek)
      date.setDate(firstDayOfWeek.getDate() + i)
      days.push(date)
    }
    
    return days
  }
  
  // Format time for display
  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':')
    const date = new Date()
    date.setHours(parseInt(hours, 10))
    date.setMinutes(parseInt(minutes, 10))
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  
  // Navigate to previous period
  const navigatePrevious = () => {
    const newDate = new Date(currentDate)
    if (currentView === 'day') {
      newDate.setDate(currentDate.getDate() - 1)
    } else if (currentView === 'week') {
      newDate.setDate(currentDate.getDate() - 7)
    } else if (currentView === 'month') {
      newDate.setMonth(currentDate.getMonth() - 1)
    }
    setCurrentDate(newDate)
  }
  
  // Navigate to next period
  const navigateNext = () => {
    const newDate = new Date(currentDate)
    if (currentView === 'day') {
      newDate.setDate(currentDate.getDate() + 1)
    } else if (currentView === 'week') {
      newDate.setDate(currentDate.getDate() + 7)
    } else if (currentView === 'month') {
      newDate.setMonth(currentDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }
  
  // Navigate to today
  const navigateToday = () => {
    setCurrentDate(new Date())
  }
  
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

  // Render week view
  const renderWeekView = () => {
    const days = getDaysOfWeek()
    const timeSlots = Array.from({ length: 13 }, (_, i) => i + 8) // 8 AM to 8 PM
    
    return (
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Day headers */}
          <div className="grid grid-cols-8 border-b">
            <div className="p-2 font-medium text-center">Time</div>
            {days.map((date, index) => (
              <div 
                key={index} 
                className={`p-2 font-medium text-center ${
                  date.toDateString() === new Date().toDateString() ? 'bg-cityserve-pink/10' : ''
                }`}
              >
                <div>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className="text-sm">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              </div>
            ))}
          </div>
          
          {/* Time slots */}
          {timeSlots.map(hour => (
            <div key={hour} className="grid grid-cols-8 border-b">
              <div className="p-2 text-center text-sm border-r">
                {hour % 12 || 12}{hour >= 12 ? 'PM' : 'AM'}
              </div>
              
              {days.map((date, dayIndex) => {
                const dateStr = date.toISOString().split('T')[0]
                const hourStr = hour.toString().padStart(2, '0')
                const slotBookings = bookings.filter(booking => {
                  const bookingHour = parseInt(booking.startTime.split(':')[0])
                  return booking.date === dateStr && bookingHour === hour
                })
                
                return (
                  <div 
                    key={dayIndex}
                    className={`p-1 min-h-[80px] border-r ${
                      date.toDateString() === new Date().toDateString() ? 'bg-cityserve-pink/10' : ''
                    }`}
                  >
                    {slotBookings.map(booking => (
                      <div 
                        key={booking.id}
                        onClick={() => handleOpenDetailsDialog(booking)}
                        className={`text-xs p-1 mb-1 rounded cursor-pointer ${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-100 hover:bg-green-200 border-l-4 border-green-500'
                            : 'bg-yellow-100 hover:bg-yellow-200 border-l-4 border-yellow-500'
                        }`}
                      >
                        <div className="font-medium">{booking.serviceName}</div>
                        <div 
                          className="cursor-pointer hover:underline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/dashboard/provider/user/${booking.id}`);
                          }}
                        >
                          {booking.customerName}
                        </div>
                        <div>
                          {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button 
              variant={currentView === 'day' ? "default" : "outline"} 
              onClick={() => setCurrentView('day')}
              className={currentView === 'day' ? "bg-cityserve-pink hover:bg-cityserve-pink/90 text-white" : ""}
              size="sm"
            >
              Day
            </Button>
            <Button 
              variant={currentView === 'week' ? "default" : "outline"} 
              onClick={() => setCurrentView('week')}
              className={currentView === 'week' ? "bg-cityserve-pink hover:bg-cityserve-pink/90 text-white" : ""}
              size="sm"
            >
              Week
            </Button>
            <Button 
              variant={currentView === 'month' ? "default" : "outline"} 
              onClick={() => setCurrentView('month')}
              className={currentView === 'month' ? "bg-cityserve-pink hover:bg-cityserve-pink/90 text-white" : ""}
              size="sm"
            >
              Month
            </Button>
          </div>
        </div>
      </div>
      
      {/* Calendar navigation */}
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={navigatePrevious}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <span className="sr-only">Previous</span>
        </Button>
        
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">
            {currentView === 'day' && currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            {currentView === 'week' && `Week of ${getDaysOfWeek()[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`}
            {currentView === 'month' && currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <Button variant="ghost" onClick={navigateToday} className="ml-2">
            Today
          </Button>
        </div>
        
        <Button variant="outline" onClick={navigateNext}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          <span className="sr-only">Next</span>
        </Button>
      </div>
      
      {/* Calendar View */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            Service Schedule
          </CardTitle>
          <CardDescription>
            {currentView === 'day' && "View and manage your appointments for the day"}
            {currentView === 'week' && "View and manage your appointments for the week"}
            {currentView === 'month' && "View and manage your appointments for the month"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentView === 'week' && renderWeekView()}
          {/* We could implement day and month views similarly */}
          {currentView !== 'week' && (
            <div className="py-20 text-center text-muted-foreground">
              <p>This view is not yet implemented. Please use the Week view.</p>
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
