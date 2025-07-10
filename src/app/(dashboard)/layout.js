'use client'

import { Fragment, useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoAnimation from '@/components/LogoAnimation'
import { useAuth } from '@/context/AuthContext'
import { useProtectedRoute } from '@/lib/useProtectedRoute'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  CalendarIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  BellIcon,
  UserCircleIcon,
  WrenchScrewdriverIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline'
import NotificationsDropdown from '@/components/NotificationsDropdown'
import ProfileDropdown from '@/components/ProfileDropdown'

// Navigation arrays that will be processed based on user type
const customerNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Bookings', href: '/dashboard/bookings', icon: CalendarIcon },
  { name: 'History', href: '/dashboard/history', icon: ClockIcon },
  { name: 'Messages', href: '/dashboard/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
]

const providerBaseNavigation = [
  { name: 'Dashboard', href: '/dashboard/provider', icon: HomeIcon },
  { name: 'Bookings', href: '/dashboard/provider/bookings', icon: CalendarIcon },
  { name: 'History', href: '/dashboard/provider/history', icon: ClockIcon },
  { name: 'Messages', href: '/dashboard/provider/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Settings', href: '/dashboard/provider/settings', icon: Cog6ToothIcon },
]

// Provider-specific navigation items
const providerNavigation = [
  { name: 'My Services', href: '/dashboard/provider/services', icon: WrenchScrewdriverIcon },
  { name: 'Earnings', href: '/dashboard/provider/earnings', icon: BanknotesIcon },
]

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout, fetchUserProfile } = useAuth()
  
  // Check if the user is a provider (based on URL path or user data)
  const isProvider = pathname.includes('/provider') || user?.userType === 'provider' || user?.isProvider
  
  // Generate navigation based on user type
  const navigation = isProvider 
    ? [...providerBaseNavigation, ...providerNavigation] 
    : customerNavigation
  
  // Select which dashboard to show based on user type
  const dashboardLink = isProvider ? '/dashboard/provider' : '/dashboard'

  // Use real user data from authentication context
  const displayUser = user || {
    name: 'Loading...',
    email: 'Loading...',
    joinedDate: 'Loading...',
  }

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      message: isProvider 
        ? 'New booking request from Anil Thapa' 
        : 'Your booking with Ramesh Sharma has been confirmed',
      time: '10 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'message',
      message: isProvider 
        ? 'New message from Pratima Rai' 
        : 'New message from Sujata Gurung',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'system',
      message: 'Welcome to CityServe! Complete your profile to get started.',
      time: '1 day ago',
      read: false
    }
  ])
  
  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length
  
  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })))
  }
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth')
    }
  }, [isAuthenticated, isLoading, router])

  // Fetch user profile on mount if user data is missing
  useEffect(() => {
    if (isAuthenticated && !user) {
      fetchUserProfile()
    }
  }, [isAuthenticated, user, fetchUserProfile])
  
  // Check if user has access to the current route
  useEffect(() => {
    if (user && pathname.includes('/provider')) {
      // User is trying to access provider dashboard
      if (!user.isProvider && !user.canAccessProvider) {
        // Redirect non-providers to customer dashboard
        router.push('/dashboard')
      }
    }
  }, [user, pathname, router])
  
  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LogoAnimation size="large" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                
                {/* Mobile sidebar */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-transparent px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <LogoAnimation size="nav" />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => {
                            // Check if current path starts with the navigation item's href
                            // This handles sub-routes like /dashboard/provider/earnings/details
                            const isActive = pathname === item.href || 
                              (pathname.startsWith(item.href) && item.href !== dashboardLink);
                            
                            return (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={`
                                    group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                                    ${isActive
                                      ? 'bg-cityserve-pink text-white'
                                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'}
                                  `}
                                >
                                  <item.icon
                                    className={`h-6 w-6 shrink-0 ${
                                      isActive ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'
                                    }`}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                      <li className="mt-auto">
                        <button
                          onClick={logout}
                          className="group -mx-2 flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          <span className="sr-only">Logout</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                          </svg>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-transparent px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <LogoAnimation size="nav" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    // Check if current path starts with the navigation item's href
                    // This handles sub-routes like /dashboard/provider/earnings/details
                    const isActive = pathname === item.href || 
                      (pathname.startsWith(item.href) && item.href !== dashboardLink);
                    
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`
                            group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                            ${isActive
                              ? 'bg-cityserve-pink text-white'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'}
                          `}
                        >
                          <item.icon
                            className={`h-6 w-6 shrink-0 ${
                              isActive ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'
                            }`}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="mt-auto">
                <button
                  onClick={logout}
                  className="group -mx-2 flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <span className="sr-only">Logout</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        {/* Top navbar for mobile */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-transparent px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button type="button" className="-m-2.5 p-2.5 text-muted-foreground lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-border lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            {/* Search */}
            <div className="flex flex-1 items-center">
              <div className="w-full">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-muted-foreground">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search..."
                    className="block w-full rounded-md border border-border bg-card/80 py-1.5 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cityserve-pink sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Profile and notifications */}
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="relative">
                <button 
                  type="button" 
                  className="-m-2.5 p-2.5 text-muted-foreground relative"
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen)
                    if (profileOpen) setProfileOpen(false)
                  }}
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-cityserve-pink rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <NotificationsDropdown 
                  isOpen={notificationsOpen}
                  onClose={() => setNotificationsOpen(false)}
                  notifications={notifications}
                  onMarkAllAsRead={handleMarkAllAsRead}
                />
              </div>

              {/* Profile dropdown */}
              <div className="relative">
                <button 
                  className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-cityserve-pink focus:ring-offset-2"
                  onClick={() => {
                    setProfileOpen(!profileOpen)
                    if (notificationsOpen) setNotificationsOpen(false)
                  }}
                >
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                </button>
                <ProfileDropdown 
                  isOpen={profileOpen}
                  onClose={() => setProfileOpen(false)}
                  user={displayUser}
                  isProvider={isProvider}
                />
              </div>
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
