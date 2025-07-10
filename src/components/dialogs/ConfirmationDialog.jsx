'use client'

import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'

export default function ConfirmationDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action', 
  message = 'Are you sure you want to proceed with this action?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <p className="text-base">{message}</p>
        
        <div className="flex justify-between pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button 
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className={isDangerous 
              ? "bg-red-600 hover:bg-red-700 text-white" 
              : "bg-cityserve-teal hover:bg-cityserve-teal/90 text-white"
            }
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
