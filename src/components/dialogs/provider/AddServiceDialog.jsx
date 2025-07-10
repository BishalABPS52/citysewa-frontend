'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'

export default function AddServiceDialog({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    location: '',
    imageUrl: ''
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
      name: '',
      category: '',
      price: '',
      description: '',
      location: '',
      imageUrl: ''
    })
    onClose()
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Add New Service"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              placeholder="e.g., Home Cleaning"
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">
              Price (NPR)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full rounded-md border border-border bg-background py-2 px-3"
              placeholder="e.g., 1500"
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-1">
              Service Area
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-border bg-background py-2 px-3"
              placeholder="e.g., Kathmandu Valley"
            />
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
            placeholder="Describe your service in detail..."
          />
        </div>
        
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
            Image URL (optional)
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full rounded-md border border-border bg-background py-2 px-3"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <div className="flex justify-between pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={!formData.name || !formData.category || !formData.price || !formData.description || !formData.location}
            className="bg-cityserve-teal hover:bg-cityserve-teal/90 text-white"
          >
            Add Service
          </Button>
        </div>
      </form>
    </Modal>
  )
}
