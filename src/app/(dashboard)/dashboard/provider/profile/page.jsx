'use client'

import { useAuth } from '@/context/AuthContext'
import AuthUserProfile from '@/components/AuthUserProfile'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function ProviderProfilePage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Please log in to view your profile</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Provider Dashboard
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Provider Profile</h1>
            <p className="text-muted-foreground mt-1">
              Manage your provider profile and service information
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="flex justify-center">
          <AuthUserProfile />
        </div>
        
        {/* Provider-specific sections */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Manage your services, pricing, and availability.
              </p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/dashboard/provider/services')}
                  className="w-full"
                >
                  Manage Services
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/dashboard/provider/calendar')}
                  className="w-full"
                >
                  Set Availability
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                View your bookings, earnings, and customer messages.
              </p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/dashboard/provider/bookings')}
                  className="w-full"
                >
                  View Bookings
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/dashboard/provider/earnings')}
                  className="w-full"
                >
                  View Earnings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Dashboard Access</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              As a service provider, you also have access to the customer dashboard to book services from other providers.
            </p>
            <Button 
              variant="outline" 
              onClick={() => router.push('/dashboard')}
              className="w-full sm:w-auto"
            >
              Go to Customer Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
