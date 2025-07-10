'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { X, Loader2 } from 'lucide-react'

export default function EditProviderProfileDialog({ isOpen, onClose, user, onUpdate }) {
  const { updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    bio: user?.bio || user?.description || '',
    experience_years: user?.experience_years || user?.experienceYears || '',
    document_category: user?.document_category || user?.documentCategory || '',
    document_id: user?.document_id || user?.documentId || ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const documentCategories = [
    'Identity Card',
    'Passport',
    'Aadhar Card',
    'Driving License',
    'PAN Card',
    'Voter ID'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      // Prepare JSON data in the exact format required
      const profileData = {
        bio: formData.bio,
        experience_years: parseInt(formData.experience_years) || 0,
        verified: true, // Set to true by default when updating
        document_category: formData.document_category,
        document_id: formData.document_id
      }

      console.log('Submitting profile data to backend:', profileData)
      console.log('Current user data before update:', user)

      try {
        // Use the updateProfile function from AuthContext
        const updatedUser = await updateProfile(profileData)
        
        console.log('Profile updated successfully, new user data:', updatedUser)
        
        // Show success message
        setSuccess('Profile updated successfully!')
        
        // Update user data in parent component
        if (onUpdate) {
          onUpdate(updatedUser)
        }
        
        // Close dialog after a brief delay to show success message
        setTimeout(() => {
          onClose()
        }, 1500)
      } catch (error) {
        console.error('Profile update error:', error)
        
        // Format the error message more clearly
        let errorMsg = 'Failed to update profile. Please check your connection and try again.'
        
        if (error instanceof Error) {
          errorMsg = error.message;
        } else if (typeof error === 'object' && error?.message) {
          errorMsg = error.message;
        }
        
        setError(errorMsg)
      }
    } catch (error) {
      console.error('Profile update error:', error)
      setError(error.message || 'Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold">Edit Provider Profile</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio / Description</Label>
              <Textarea
                id="bio"
                placeholder="Tell customers about your expertise and services..."
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Experience Years */}
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="e.g., 10"
                value={formData.experience_years}
                onChange={(e) => handleInputChange('experience_years', e.target.value)}
              />
            </div>

            {/* Document Category */}
            <div className="space-y-2">
              <Label htmlFor="document_category">Document Category</Label>
              <select
                id="document_category"
                value={formData.document_category}
                onChange={(e) => handleInputChange('document_category', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select document type</option>
                {documentCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Document ID */}
            <div className="space-y-2">
              <Label htmlFor="document_id">Document ID</Label>
              <Input
                id="document_id"
                placeholder="e.g., 1234-5678-9012"
                value={formData.document_id}
                onChange={(e) => handleInputChange('document_id', e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Profile'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
