'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ProviderSettingsPage() {
  const [profileData, setProfileData] = useState({
    name: 'Jane Provider',
    email: 'jane.provider@example.com',
    phone: '+977 9812345678',
    address: 'Kathmandu, Nepal',
    password: '********',
    profession: 'Professional Cleaner',
    bio: 'Experienced cleaner with 5+ years of experience in residential and commercial cleaning.',
  })

  const [bankingInfo, setBankingInfo] = useState({
    accountName: 'Jane Provider',
    accountNumber: '0123456789',
    bankName: 'Nepal Bank Ltd.',
    branch: 'Kathmandu',
    ifscCode: 'NBLK0001234',
  })

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    app: true,
    marketing: false,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="banking">Banking</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="name">Full Name</label>
                  <Input id="name" value={profileData.name} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">Email</label>
                  <Input id="email" type="email" value={profileData.email} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="phone">Phone</label>
                  <Input id="phone" value={profileData.phone} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="address">Address</label>
                  <Input id="address" value={profileData.address} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="profession">Profession</label>
                  <Input id="profession" value={profileData.profession} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium" htmlFor="bio">Bio</label>
                  <textarea 
                    id="bio" 
                    className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={profileData.bio}
                  ></textarea>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-2">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="currentPassword">Current Password</label>
                    <Input id="currentPassword" type="password" value={profileData.password} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="newPassword">New Password</label>
                    <Input id="newPassword" type="password" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Banking Info Tab */}
        <TabsContent value="banking">
          <Card>
            <CardHeader>
              <CardTitle>Banking Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="accountName">Account Holder Name</label>
                  <Input id="accountName" value={bankingInfo.accountName} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="accountNumber">Account Number</label>
                  <Input id="accountNumber" value={bankingInfo.accountNumber} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="bankName">Bank Name</label>
                  <Input id="bankName" value={bankingInfo.bankName} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="branch">Branch</label>
                  <Input id="branch" value={bankingInfo.branch} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="ifscCode">IFSC Code</label>
                  <Input id="ifscCode" value={bankingInfo.ifscCode} />
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button>Save Banking Details</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive booking updates via email</p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={notificationSettings.email} />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cityserve-pink"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive booking updates via SMS</p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={notificationSettings.sms} />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cityserve-pink"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h3 className="font-medium">App Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={notificationSettings.app} />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cityserve-pink"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Marketing Communications</h3>
                    <p className="text-sm text-muted-foreground">Receive updates about new features and offers</p>
                  </div>
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={notificationSettings.marketing} />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cityserve-pink"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-6">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
