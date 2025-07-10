'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'

export default function ReviewDialog({ isOpen, onClose, booking, onSubmit }) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit({ booking, rating, comment })
    }
    setRating(5)
    setComment('')
    onClose()
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Leave a Review for ${booking?.serviceName || 'Service'}`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="rating" className="block text-sm font-medium mb-1">
            Rating
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none"
              >
                {star <= rating ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-yellow-400">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-1">
            Your Review
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            required
            className="w-full rounded-md border border-border bg-background py-2 px-3"
            placeholder="Share your experience with this service..."
          />
        </div>
        
        <div className="flex justify-between pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={!comment.trim()}
            className="bg-cityserve-orange hover:bg-cityserve-orange/90 text-white"
          >
            Submit Review
          </Button>
        </div>
      </form>
    </Modal>
  )
}
