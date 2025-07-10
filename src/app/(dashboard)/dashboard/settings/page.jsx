'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CustomerSettingsPage() {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+977 9812345678',
    address: 'Kathmandu, Nepal',
    password: '********',
  })

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'credit_card',
      last4: '4242',
      expiry: '06/27',
      isDefault: true,
    },
    {
      id: 2,
      type: 'paypal',
      email: 'john.doe@example.com',
      isDefault: false,
    },
    {
      id: 3,
      type: 'esewa',
      phone: '9800123456',
      isDefault: false,
      qrCode: '/images/dummy-esewa-qr.png'
    },
    {
      id: 4,
      type: 'khalti',
      phone: '9800654321',
      isDefault: false,
      qrCode: '/images/dummy-khalti-qr.png'
    },
    {
      id: 5,
      type: 'bank',
      accountNumber: '0123456789',
      bankName: 'Nepal Bank Ltd.',
      isDefault: false,
      qrCode: '/images/dummy-bank-qr.png'
    }
  ])
  
  // State for QR code modal
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [selectedQR, setSelectedQR] = useState(null)

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
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
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
        
        {/* Payment Methods Tab */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between border p-4 rounded-md">
                  <div className="flex items-center gap-3">
                    {method.type === 'credit_card' ? (
                      <div className="h-10 w-10 flex items-center justify-center">
                        <img src="/images/bank-card-logo.svg" alt="Credit Card" className="w-full h-full" />
                      </div>
                    ) : method.type === 'paypal' ? (
                      <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      </div>
                    ) : method.type === 'esewa' ? (
                      <div className="h-10 w-10 flex items-center justify-center">
                        <img src="/images/esewa-logo.svg" alt="eSewa" className="w-full h-full" />
                      </div>
                    ) : method.type === 'khalti' ? (
                      <div className="h-10 w-10 flex items-center justify-center">
                        <img src="/images/khalti-logo.svg" alt="Khalti" className="w-full h-full" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 flex items-center justify-center">
                        <img src="/images/bank-card-logo.svg" alt="Bank" className="w-full h-full" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">
                        {method.type === 'credit_card' 
                          ? `Bank Card` 
                          : method.type === 'paypal'
                          ? `PayPal`
                          : method.type === 'esewa'
                          ? `eSewa`
                          : method.type === 'khalti'
                          ? `Khalti`
                          : `Bank Account`}
                      </p>
                      {method.type === 'credit_card' && (
                        <p className="text-sm text-muted-foreground">Ending in {method.last4}</p>
                      )}
                      {method.type === 'paypal' && (
                        <p className="text-sm text-muted-foreground">{method.email}</p>
                      )}
                      {method.type === 'esewa' && (
                        <p className="text-sm text-muted-foreground">{method.phone}</p>
                      )}
                      {method.type === 'khalti' && (
                        <p className="text-sm text-muted-foreground">{method.phone}</p>
                      )}
                      {method.type === 'bank' && (
                        <p className="text-sm text-muted-foreground">{method.bankName}</p>
                      )}
                      {method.isDefault && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {(method.type === 'esewa' || method.type === 'khalti' || method.type === 'bank') && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedQR(method.qrCode)
                          setIsQRModalOpen(true)
                        }}
                      >
                        Show QR
                      </Button>
                    )}
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Remove</Button>
                  </div>
                </div>
              ))}
              
              <Button className="w-full mt-4" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Payment Method
              </Button>
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
                    <p className="text-sm text-muted-foreground">Receive updates about new services and offers</p>
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
      
      {/* QR Code Modal */}
      {isQRModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Payment QR Code</h3>
              <button onClick={() => setIsQRModalOpen(false)} className="text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg">
                {selectedQR ? (
                  <img 
                    src={selectedQR} 
                    alt="Payment QR Code" 
                    className="w-64 h-64 object-contain"
                  />
                ) : (
                  <div className="w-64 h-64 bg-gray-200 flex items-center justify-center">
                    <p className="text-center text-gray-500">QR Code not available</p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground mb-4">Scan this QR code with your payment app to make a payment</p>
              <Button onClick={() => setIsQRModalOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
