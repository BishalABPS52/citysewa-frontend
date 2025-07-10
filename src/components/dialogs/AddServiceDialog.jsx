'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'

export default function AddServiceDialog({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    duration: '',
    description: '',
  })
  
  // Categories options
  const categories = [
    'Home Maintenance',
    'Education',
    'Technology',
    'Health & Wellness',
    'Food & Catering',
    'Transportation',
    'Beauty & Personal Care',
    'Event Planning',
    'Professional Services',
    'Other'
  ]
  
  // Duration options
  const durations = [
    '30 minutes',
    '1 hour',
    '2 hours',
    '3 hours',
    '4 hours',
    '6 hours',
    '8 hours',
    'Varies (depends on requirements)'
  ]
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    
    // For price, only allow numbers
    if (name === 'price' && !/^\d*$/.test(value)) {
      return
    }
    
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSave) {
      onSave(formData)
    }
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Service">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Service Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-border bg-background py-2 px-3"
            placeholder="e.g., Deep Cleaning, Web Development, Yoga Instruction"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-border bg-background py-2 px-3"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">
              Price (NPR)
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-border bg-background py-2 px-3"
              placeholder="e.g., 1500"
            />
          </div>
          
          <div>
            <label htmlFor="duration" className="block text-sm font-medium mb-1">
              Duration
            </label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-border bg-background py-2 px-3"
            >
              <option value="">Select duration</option>
              {durations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full rounded-md border border-border bg-background py-2 px-3"
            placeholder="Describe your service, what's included, and any special requirements..."
          />
        </div>
        
        <div className="flex justify-between pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-cityserve-pink hover:bg-cityserve-pink/90 text-white"
          >
            Add Service
          </Button>
        </div>
      </form>
    </Modal>
  )
}
