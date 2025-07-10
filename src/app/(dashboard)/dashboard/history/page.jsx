'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CustomerHistoryPage() {
  // Mock booking history data
  const [bookingHistory, setBookingHistory] = useState([
    {
      id: '1',
      serviceName: 'Plumbing Repair',
      providerName: 'Ram Sharma',
      date: '2025-06-15',
      status: 'completed',
      rating: 5,
      amount: '$85.00',
    },
    {
      id: '2',
      serviceName: 'House Cleaning',
      providerName: 'Sita Patel',
      date: '2025-06-01',
      status: 'completed',
      rating: 4,
      amount: '$120.00',
    },
    {
      id: '3',
      serviceName: 'Electrical Wiring',
      providerName: 'Hari Kumar',
      date: '2025-05-20',
      status: 'cancelled',
      amount: '$0.00',
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Booking History</h1>
      </div>

      <div className="grid gap-6">
        {bookingHistory.map((booking) => (
          <Card key={booking.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50 pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">{booking.serviceName}</CardTitle>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : booking.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider:</span>
                  <span className="font-medium">{booking.providerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">{booking.amount}</span>
                </div>
                {booking.rating && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Your Rating:</span>
                    <span className="font-medium">
                      {Array(booking.rating).fill('★').join('')}
                      {Array(5 - booking.rating).fill('☆').join('')}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
