'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LogoAnimation from '@/components/LogoAnimation'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated } = useAuth()

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with custom larger size */}
          <div className="flex items-center">
            <LogoAnimation size="nav" />
          </div>

          {/* Desktop Navigation - Minimalistic */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#how-it-works" className="text-muted-foreground hover:text-accent-custom transition-colors">
              How It Works
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-accent-custom transition-colors">
              About Us
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-accent-custom transition-colors">
              Contact
            </Link>
            
            <div className="flex items-center ml-2 space-x-3">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'User'}
                  </span>
                  <div className="flex space-x-2">
                    <Link href="/dashboard">
                      <Button variant="ghost" className="text-foreground hover:bg-muted group">
                        <span className="group-hover:text-accent-custom transition-colors">Customer</span>
                      </Button>
                    </Link>
                    {(user?.isProvider || user?.canAccessProvider) && (
                      <Link href="/dashboard/provider">
                        <Button variant="ghost" className="text-foreground hover:bg-muted group">
                          <span className="group-hover:text-accent-custom transition-colors">Provider</span>
                        </Button>
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link href="/auth">
                    <Button variant="ghost" className="text-foreground hover:bg-muted group">
                      <span className="group-hover:text-accent-custom transition-colors">Log In</span>
                    </Button>
                  </Link>
                  <Link href="/auth?tab=signup">
                    <Button className="bg-accent-custom group hover:bg-accent-custom text-white">
                      <span className="group-hover:opacity-80 transition-opacity">Sign Up</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-muted-foreground hover:text-accent-custom transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Slide down animation */}
      {isOpen && (
        <div className="md:hidden animate-in slide-in-from-top-5 duration-200">
          <div className="px-4 pt-2 pb-4 space-y-2 bg-background/90 border-b border-border">
            <Link href="#how-it-works" 
              className="block py-2 text-foreground hover:text-accent-custom transition-colors"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link href="#about" 
              className="block py-2 text-foreground hover:text-accent-custom transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link href="#contact" 
              className="block py-2 text-foreground hover:text-accent-custom transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link href="/privacy" 
              className="block py-2 text-foreground hover:text-accent-custom transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Privacy Policy
            </Link>
            <Link href="/terms" 
              className="block py-2 text-foreground hover:text-accent-custom transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Terms of Service
            </Link>
            
            <div className="pt-3 flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="px-2 py-1 text-sm text-muted-foreground">
                    Welcome, {user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'User'}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Link href="/dashboard" className="w-full" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-center group">
                        <span className="group-hover:text-accent-custom transition-colors">Customer Dashboard</span>
                      </Button>
                    </Link>
                    {(user?.isProvider || user?.canAccessProvider) && (
                      <Link href="/dashboard/provider" className="w-full" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full justify-center group">
                          <span className="group-hover:text-accent-custom transition-colors">Provider Dashboard</span>
                        </Button>
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link href="/auth" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-center group">
                      <span className="group-hover:text-accent-custom transition-colors">Log In</span>
                    </Button>
                  </Link>
                  <Link href="/auth?tab=signup" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-accent-custom group hover:bg-accent-custom text-white">
                      <span className="group-hover:opacity-80 transition-opacity">Sign Up</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
