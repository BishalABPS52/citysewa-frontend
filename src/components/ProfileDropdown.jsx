'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { UserCircleIcon } from '@heroicons/react/24/outline'

export default function ProfileDropdown({ isOpen, onClose, user, isProvider }) {
  const dropdownRef = useRef(null)
  const router = useRouter()
  const pathname = usePathname()
  const { logout } = useAuth()
  
  // Determine if we're in provider dashboard
  const isInProviderDashboard = pathname?.startsWith('/dashboard/provider')
  
  const handleLogout = () => {
    logout()
    router.push('/')
    onClose()
  }
  
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

  if (!isOpen) return null

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-56 bg-background rounded-md shadow-lg border border-border overflow-hidden z-50"
    >
      <div className="p-4 border-b border-border">
        <div className="flex items-center">
          <UserCircleIcon className="h-10 w-10 text-muted-foreground mr-3" />
          <div>
            <p className="font-medium">{user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'User'}</p>
            <p className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
      </div>
      
      <div className="py-1">
        <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-muted">
          Customer Dashboard
        </Link>
        {(user?.isProvider || user?.canAccessProvider) && (
          <Link href="/dashboard/provider" className="block px-4 py-2 text-sm hover:bg-muted">
            Provider Dashboard
          </Link>
        )}
        <Link 
          href={isInProviderDashboard ? "/dashboard/provider/profile" : "/dashboard/profile"} 
          className="block px-4 py-2 text-sm hover:bg-muted"
        >
          My Profile
        </Link>
        <Link href="/dashboard/settings" className="block px-4 py-2 text-sm hover:bg-muted">
          Settings
        </Link>
        {(user?.isProvider || user?.canAccessProvider) && (
          <Link href="/dashboard/provider/earnings" className="block px-4 py-2 text-sm hover:bg-muted">
            Earnings
          </Link>
        )}
      </div>
      
      <div className="py-1 border-t border-border">
        <button 
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
