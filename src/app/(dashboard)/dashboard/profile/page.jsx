'use client'

import { useAuth } from '@/context/AuthContext'
import AuthUserProfile from '@/components/AuthUserProfile'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
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
          Back
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your profile information
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="flex justify-center">
          <AuthUserProfile />
        </div>
        
        {/* Additional profile sections can be added here */}
        {(user?.isProvider || user?.canAccessProvider) && (
          <Card>
            <CardHeader>
              <CardTitle>Provider Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                As a service provider, you have access to additional features:
              </p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/dashboard/provider')}
                  className="w-full sm:w-auto"
                >
                  Go to Provider Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
