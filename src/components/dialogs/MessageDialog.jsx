'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'

export default function MessageDialog({ isOpen, onClose, recipient, onSend }) {
  const [message, setMessage] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSend) {
      onSend({ recipient, message })
    }
    setMessage('')
    onClose()
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Send Message to ${recipient ? recipient : 'Provider'}`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Your Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            required
            className="w-full rounded-md border border-border bg-background py-2 px-3"
            placeholder="Type your message here..."
          />
        </div>
        
        <div className="flex justify-between pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={!message.trim()}
            className="bg-cityserve-pink hover:bg-cityserve-pink/90 text-white"
          >
            Send Message
          </Button>
        </div>
      </form>
    </Modal>
  )
}
