'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'

export default function NewBookingDialog({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    location: '',
    notes: ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
    setFormData({
      service: '',
      date: '',
      time: '',
      location: '',
      notes: ''
    })
    onClose()
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Create New Booking"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-1">
            Service Type
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-border bg-background py-2 px-3"
          >
            <option value="">Select a service</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Painting">Painting</option>
            <option value="Gardening">Gardening</option>
            <option value="Tutoring">Tutoring</option>
            <option value="Beauty">Beauty & Spa</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-border bg-background py-2 px-3"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium mb-1">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-border bg-background py-2 px-3"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-border bg-background py-2 px-3"
            placeholder="Enter your address"
          />
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-1">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border border-border bg-background py-2 px-3"
            placeholder="Any special requirements or details..."
          />
        </div>
        
        <div className="flex justify-between pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={!formData.service || !formData.date || !formData.time || !formData.location}
            className="bg-cityserve-pink hover:bg-cityserve-pink/90 text-white"
          >
            Create Booking
          </Button>
        </div>
      </form>
    </Modal>
  )
}
