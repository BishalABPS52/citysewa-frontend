'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserCircleIcon, PencilIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import EditProviderProfileDialog from '@/components/dialogs/EditProviderProfileDialog'

export default function AuthUserProfile() {
  const { user, isAuthenticated, fetchUserProfile, updateProfile } = useAuth()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  if (!isAuthenticated || !user) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">Please log in to view your profile</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleRefresh = async () => {
    try {
      console.log('Refreshing user profile data using GET method...')
      const updatedUser = await fetchUserProfile()
      if (updatedUser) {
        console.log('Profile refreshed successfully:', updatedUser)
      }
    } catch (error) {
      console.error('Failed to refresh profile:', error)
    }
  }

  const handleUpdateProfile = async (profileData) => {
    try {
      console.log('AuthUserProfile: Handling profile update with data:', profileData)
      const updatedUser = await updateProfile(profileData)
      console.log('AuthUserProfile: Profile updated successfully:', updatedUser)
      // The user state is automatically updated by the updateProfile function
      // No need to do anything else here - success will be shown in the dialog
      return updatedUser
    } catch (error) {
      console.error('AuthUserProfile: Failed to update profile:', error)
      // Re-throw the error so the dialog can handle it
      throw error
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Your Profile</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          className="ml-auto h-8 w-8 p-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <UserCircleIcon className="h-16 w-16 text-muted-foreground" />
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'User Name'}</h3>
            <p className="text-sm text-muted-foreground">{user.email || 'user@example.com'}</p>
            {(user.userType || user.isProvider !== undefined) && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {user.userType === 'provider' || user.isProvider ? 'Service Provider' : 'Customer'}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {user.contact && (
            <div className="flex justify-between">
              <span className="text-sm font-medium">Phone:</span>
              <span className="text-sm text-muted-foreground">{user.contact}</span>
            </div>
          )}
          
          {user.phone && user.phone !== user.contact && (
            <div className="flex justify-between">
              <span className="text-sm font-medium">Phone:</span>
              <span className="text-sm text-muted-foreground">{user.phone}</span>
            </div>
          )}

          {user.username && (
            <div className="flex justify-between">
              <span className="text-sm font-medium">Username:</span>
              <span className="text-sm text-muted-foreground">{user.username}</span>
            </div>
          )}
          
          {user.address && typeof user.address === 'object' && (
            <div className="flex justify-between">
              <span className="text-sm font-medium">Address:</span>
              <span className="text-sm text-muted-foreground">
                {user.address.area && user.address.city 
                  ? `${user.address.area}, ${user.address.city}`
                  : user.address.area || user.address.city || 'Not specified'
                }
              </span>
            </div>
          )}
          
          {user.address && typeof user.address === 'string' && (
            <div className="flex justify-between">
              <span className="text-sm font-medium">Address:</span>
              <span className="text-sm text-muted-foreground">{user.address}</span>
            </div>
          )}
          
          {user.id && (
            <div className="flex justify-between">
              <span className="text-sm font-medium">User ID:</span>
              <span className="text-sm text-muted-foreground">#{user.id}</span>
            </div>
          )}
        </div>

        {(user.userType === 'provider' || user.isProvider) && (
          <div className="pt-2 border-t">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">Provider Information</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditDialogOpen(true)}
                className="h-8 px-3"
              >
                <PencilIcon className="h-3 w-3 mr-1" />
                Edit Profile
              </Button>
            </div>
            
            {/* Bio Section - Always show for providers */}
            <div className="mb-3">
              <span className="text-sm font-medium">Bio:</span>
              <p className="text-sm text-muted-foreground mt-1">
                {user.bio || user.description || 'No Bio'}
              </p>
            </div>
            
            {(user.experience_years || user.experienceYears) && (
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Experience:</span>
                <span className="text-sm text-muted-foreground">
                  {user.experience_years || user.experienceYears} years
                </span>
              </div>
            )}
            
            {/* Verification Status */}
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Verification Status:</span>
              <div className="flex items-center space-x-1">
                {user.verified ? (
                  <>
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">Verified</span>
                  </>
                ) : (
                  <>
                    <XCircleIcon className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-600 font-medium">Not Verified</span>
                  </>
                )}
              </div>
            </div>
            
            {user.serviceCategory && (
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Service Category:</span>
                <span className="text-sm text-muted-foreground">{user.serviceCategory}</span>
              </div>
            )}
            
            {(user.document_category || user.documentCategory) && (
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Document Type:</span>
                <span className="text-sm text-muted-foreground">
                  {user.document_category || user.documentCategory}
                </span>
              </div>
            )}
            
            {(user.document_id || user.documentId) && (
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Document ID:</span>
                <span className="text-sm text-muted-foreground">
                  {user.document_id || user.documentId}
                </span>
              </div>
            )}
            
            {(user.document_file_url) && (
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Document:</span>
                <a 
                  href={user.document_file_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View Document
                </a>
              </div>
            )}
            
            {user.isOrganization && (
              <div className="space-y-1 mt-2 pt-2 border-t">
                {user.organizationName && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Organization:</span>
                    <span className="text-sm text-muted-foreground">{user.organizationName}</span>
                  </div>
                )}
                {user.taxId && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Tax ID:</span>
                    <span className="text-sm text-muted-foreground">{user.taxId}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      {/* Edit Provider Profile Dialog */}
      {(user.userType === 'provider' || user.isProvider) && (
        <EditProviderProfileDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          user={user}
          onUpdate={handleUpdateProfile}
        />
      )}
    </Card>
  )
}
