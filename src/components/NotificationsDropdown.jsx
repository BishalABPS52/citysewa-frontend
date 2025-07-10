'use client'

import { useState, useRef, useEffect } from 'react'

export default function NotificationsDropdown({ isOpen, onClose, notifications = [], onMarkAllAsRead }) {
  const dropdownRef = useRef(null)
  
  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-background rounded-md shadow-lg border border-border overflow-hidden z-50"
    >
      <div className="p-3 border-b border-border">
        <h3 className="font-medium">Notifications</h3>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-3 hover:bg-muted/50">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {notification.type === 'booking' && (
                      <div className="h-8 w-8 rounded-full bg-cityserve-pink/10 flex items-center justify-center text-cityserve-pink">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                      </div>
                    )}
                    {notification.type === 'message' && (
                      <div className="h-8 w-8 rounded-full bg-cityserve-blue/10 flex items-center justify-center text-cityserve-blue">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                        </svg>
                      </div>
                    )}
                    {notification.type === 'system' && (
                      <div className="h-8 w-8 rounded-full bg-cityserve-orange/10 flex items-center justify-center text-cityserve-orange">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-muted-foreground">No notifications at this time.</p>
          </div>
        )}
      </div>
      
      {notifications.length > 0 && (
        <div className="p-3 border-t border-border text-center">
          <button 
            className="text-sm text-cityserve-pink hover:underline"
            onClick={handleMarkAllAsRead}
          >
            Mark all as read
          </button>
        </div>
      )}
    </div>
  )
}
