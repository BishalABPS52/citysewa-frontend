'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function NewBookingDialog({ isOpen, onClose, categories = [], onSave }) {
  const [formData, setFormData] = useState({
    category: '',
    service: '',
    providerName: '',
    date: '',
    time: '',
    notes: '',
  })
  
  const [step, setStep] = useState(1)
  
  // Mock services based on category selection
  const services = {
    'Home Maintenance': ['Plumbing', 'Electrical Work', 'Carpentry', 'Painting'],
    'Education': ['Tutoring', 'Language Classes', 'Test Preparation', 'Skill Development'],
    'Technology': ['Web Development', 'App Development', 'IT Support', 'Digital Marketing'],
    'Health & Wellness': ['Yoga', 'Fitness Training', 'Massage Therapy', 'Nutrition Consultation'],
    'Food & Catering': ['Home Chef', 'Event Catering', 'Cooking Classes', 'Meal Prep'],
  }
  
  // Mock providers for selected service
  const providers = {
    'Plumbing': [
      { id: 1, name: 'Ramesh Sharma', rating: 4.8, price: 1200 },
      { id: 2, name: 'Bishnu KC', rating: 4.5, price: 1000 },
    ],
    'Electrical Work': [
      { id: 3, name: 'Bijay Tamang', rating: 4.9, price: 1500 },
      { id: 4, name: 'Dipesh Rai', rating: 4.7, price: 1800 },
    ],
    'Web Development': [
      { id: 5, name: 'Ankit Shrestha', rating: 4.9, price: 2500 },
      { id: 6, name: 'Sujata Gurung', rating: 4.8, price: 2200 },
    ],
    'Yoga': [
      { id: 7, name: 'Priya Rai', rating: 5.0, price: 900 },
      { id: 8, name: 'Mohan Thapa', rating: 4.6, price: 850 },
    ],
  }
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Submit the booking
      if (onSave) {
        onSave(formData)
      }
      onClose()
    }
  }

  // Go back to previous step
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Create New Booking - Step ${step} of 3`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Service Category
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
            
            {formData.category && (
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
                  {services[formData.category]?.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Select a Service Provider</h3>
            
            <div className="space-y-3">
              {providers[formData.service]?.map((provider) => (
                <div 
                  key={provider.id} 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.providerName === provider.name 
                      ? 'border-cityserve-pink bg-cityserve-pink/5' 
                      : 'border-border hover:border-cityserve-pink/50'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, providerName: provider.name }))}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{provider.name}</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-cityserve-orange">{provider.rating} ★</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">NPR {provider.price}</p>
                      <p className="text-xs text-muted-foreground">Base price</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-4">
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
                  min={new Date().toISOString().split('T')[0]}
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
              <label htmlFor="notes" className="block text-sm font-medium mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md border border-border bg-background py-2 px-3"
                placeholder="Add any special instructions or details..."
              />
            </div>
          </div>
        )}
        
        <div className="flex justify-between pt-4 border-t border-border">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          
          <Button 
            type="submit" 
            disabled={
              (step === 1 && (!formData.category || !formData.service)) ||
              (step === 2 && !formData.providerName) ||
              (step === 3 && (!formData.date || !formData.time))
            }
            className="bg-cityserve-pink hover:bg-cityserve-pink/90 text-white"
          >
            {step < 3 ? 'Continue' : 'Create Booking'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
