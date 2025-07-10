'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function BookingDetailsDialog({ 
  isOpen, 
  onClose, 
  booking, 
  userType = 'customer',
  onAccept,
  onReject,
  onComplete,
  onContact,
  onCancel,
  onReview
}) {
  if (!booking) return null;
  
  const isProvider = userType === 'provider';

  const handleAccept = () => {
    if (onAccept) {
      onAccept(booking)
    }
    onClose()
  }

  const handleReject = () => {
    if (onReject) {
      onReject(booking)
    }
    onClose()
  }

  const handleComplete = () => {
    if (onComplete) {
      onComplete(booking)
    }
    onClose()
  }

  const handleContact = () => {
    if (onContact) {
      onContact(booking)
    }
    onClose()
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel(booking)
    }
    onClose()
  }

  const handleReview = () => {
    if (onReview) {
      onReview(booking)
    }
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Booking Details">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Service</h3>
            <p className="mt-1 text-base font-medium">{booking.serviceName}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
            <p className="mt-1">
              <Badge 
                className={`${
                  booking.status === 'Confirmed' 
                    ? 'bg-green-100 hover:bg-green-100/80 text-green-700' 
                    : booking.status === 'Completed'
                    ? 'bg-blue-100 hover:bg-blue-100/80 text-blue-700'
                    : booking.status === 'Cancelled'
                    ? 'bg-red-100 hover:bg-red-100/80 text-red-700'
                    : 'bg-yellow-100 hover:bg-yellow-100/80 text-yellow-700'
                }`}
              >
                {booking.status}
              </Badge>
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              {isProvider ? 'Customer' : 'Provider'}
            </h3>
            <p className="mt-1 text-base">
              {isProvider ? booking.customerName : booking.providerName}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Date & Time</h3>
            <p className="mt-1 text-base">{booking.date} at {booking.time}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
            <p className="mt-1 text-base">{booking.location}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
            <p className="mt-1 text-base">NPR {booking.price}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Payment Status</h3>
            <p className="mt-1 text-base">{booking.payment}</p>
          </div>
        </div>
        
        <div className="border-t border-border pt-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes</h3>
          <p className="text-sm">
            {booking.notes || "No additional notes for this booking."}
          </p>
        </div>
        
        <div className="flex justify-between pt-4 border-t border-border">
          {isProvider ? (
            <div className="flex gap-2">
              {booking.status === 'Pending' && (
                <>
                  <Button 
                    variant="default" 
                    className="bg-cityserve-teal hover:bg-cityserve-teal/90 text-white"
                    onClick={handleAccept}
                  >
                    Accept Booking
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleReject}
                  >
                    Reject
                  </Button>
                </>
              )}
              {booking.status === 'Confirmed' && (
                <>
                  <Button 
                    variant="default" 
                    className="bg-cityserve-blue hover:bg-cityserve-blue/90 text-white"
                    onClick={handleComplete}
                  >
                    Mark as Completed
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleContact}
                  >
                    Contact Customer
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              {booking.status === 'Pending' && (
                <Button 
                  variant="outline" 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleCancel}
                >
                  Cancel Booking
                </Button>
              )}
              <Button 
                variant="outline"
                onClick={handleContact}
              >
                Contact Provider
              </Button>
              {booking.status === 'Completed' && (
                <Button 
                  variant="default" 
                  className="bg-cityserve-orange hover:bg-cityserve-orange/90 text-white"
                  onClick={handleReview}
                >
                  Leave Review
                </Button>
              )}
            </div>
          )}
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}
