'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'

export default function AvailabilityDialog({ isOpen, onClose, onSave, initialAvailability }) {
  // Initialize with provided availability or default
  const [availability, setAvailability] = useState(
    initialAvailability || {
      monday: { available: true, startTime: '09:00', endTime: '17:00' },
      tuesday: { available: true, startTime: '09:00', endTime: '17:00' },
      wednesday: { available: true, startTime: '09:00', endTime: '17:00' },
      thursday: { available: true, startTime: '09:00', endTime: '17:00' },
      friday: { available: true, startTime: '09:00', endTime: '17:00' },
      saturday: { available: false, startTime: '09:00', endTime: '17:00' },
      sunday: { available: false, startTime: '09:00', endTime: '17:00' },
    }
  )

  const days = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' },
  ]

  const handleAvailabilityChange = (day, field, value) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSave) {
      onSave(availability)
    }
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Availability">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {days.map((day) => (
            <div key={day.id} className="border border-border rounded-md p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">{day.label}</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`available-${day.id}`}
                    checked={availability[day.id].available}
                    onChange={(e) => handleAvailabilityChange(day.id, 'available', e.target.checked)}
                    className="rounded border-border mr-2"
                  />
                  <label htmlFor={`available-${day.id}`} className="text-sm">
                    Available
                  </label>
                </div>
              </div>
              
              {availability[day.id].available && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`start-${day.id}`} className="block text-sm font-medium mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      id={`start-${day.id}`}
                      value={availability[day.id].startTime}
                      onChange={(e) => handleAvailabilityChange(day.id, 'startTime', e.target.value)}
                      className="w-full rounded-md border border-border bg-background py-1.5 px-3"
                    />
                  </div>
                  <div>
                    <label htmlFor={`end-${day.id}`} className="block text-sm font-medium mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      id={`end-${day.id}`}
                      value={availability[day.id].endTime}
                      onChange={(e) => handleAvailabilityChange(day.id, 'endTime', e.target.value)}
                      className="w-full rounded-md border border-border bg-background py-1.5 px-3"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-cityserve-pink hover:bg-cityserve-pink/90 text-white"
          >
            Save Availability
          </Button>
        </div>
      </form>
    </Modal>
  )
}
