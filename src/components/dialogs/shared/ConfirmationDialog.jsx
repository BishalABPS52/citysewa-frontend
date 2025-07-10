'use client'

import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'

export default function ConfirmationDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false
}) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <p className="text-base">{message}</p>
        
        <div className="flex justify-end space-x-2 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button 
            onClick={handleConfirm}
            className={isDangerous 
              ? "bg-red-600 hover:bg-red-700 text-white" 
              : "bg-cityserve-blue hover:bg-cityserve-blue/90 text-white"
            }
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
