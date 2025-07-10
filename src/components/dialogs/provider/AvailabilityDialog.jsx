'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'

export default function AvailabilityDialog({ isOpen, onClose, onSubmit, initialData = null }) {
  const defaultData = {
    workingDays: {
      monday: { available: true, start: '09:00', end: '17:00' },
      tuesday: { available: true, start: '09:00', end: '17:00' },
      wednesday: { available: true, start: '09:00', end: '17:00' },
      thursday: { available: true, start: '09:00', end: '17:00' },
      friday: { available: true, start: '09:00', end: '17:00' },
      saturday: { available: false, start: '09:00', end: '17:00' },
      sunday: { available: false, start: '09:00', end: '17:00' }
    },
    vacationDates: [],
    specialNotes: ''
  }
  
  const [formData, setFormData] = useState(initialData || defaultData)
  
  const toggleDay = (day) => {
    setFormData(prev => ({
      ...prev,
      workingDays: {
        ...prev.workingDays,
        [day]: {
          ...prev.workingDays[day],
          available: !prev.workingDays[day].available
        }
      }
    }))
  }
  
  const updateTime = (day, type, value) => {
    setFormData(prev => ({
      ...prev,
      workingDays: {
        ...prev.workingDays,
        [day]: {
          ...prev.workingDays[day],
          [type]: value
        }
      }
    }))
  }
  
  const updateNotes = (e) => {
    setFormData(prev => ({
      ...prev,
      specialNotes: e.target.value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
    onClose()
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Update Availability"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-base font-medium mb-3">Working Days & Hours</h3>
          
          {Object.entries(formData.workingDays).map(([day, data]) => (
            <div key={day} className="flex items-center mb-4 space-x-4">
              <div className="w-28">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={data.available}
                    onChange={() => toggleDay(day)}
                    className="rounded border-gray-300 text-cityserve-teal focus:ring-cityserve-teal"
                  />
                  <span className="ml-2 capitalize">{day}</span>
                </label>
              </div>
              
              {data.available && (
                <div className="flex items-center space-x-2 flex-1">
                  <input
                    type="time"
                    value={data.start}
                    onChange={(e) => updateTime(day, 'start', e.target.value)}
                    className="rounded-md border border-border bg-background py-1 px-2 w-24"
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={data.end}
                    onChange={(e) => updateTime(day, 'end', e.target.value)}
                    className="rounded-md border border-border bg-background py-1 px-2 w-24"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div>
          <label htmlFor="specialNotes" className="block text-sm font-medium mb-1">
            Special Notes
          </label>
          <textarea
            id="specialNotes"
            value={formData.specialNotes}
            onChange={updateNotes}
            rows={3}
            className="w-full rounded-md border border-border bg-background py-2 px-3"
            placeholder="Any special notes about your availability..."
          />
        </div>
        
        <div className="flex justify-between pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-cityserve-teal hover:bg-cityserve-teal/90 text-white"
          >
            Save Availability
          </Button>
        </div>
      </form>
    </Modal>
  )
}
