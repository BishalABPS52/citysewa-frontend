'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/context/AuthContext'
import { X } from 'lucide-react'

export default function ProviderEarningsPage() {
  const { user } = useAuth();
  
  // Mock earnings data
  const [earnings, setEarnings] = useState({
    totalEarnings: 125000,
    pendingPayouts: 15000,
    thisMonth: 28500,
    lastMonth: 32000,
  })
  
  // QR code display state
  const [selectedQrMethod, setSelectedQrMethod] = useState(null)
  const [activeTab, setActiveTab] = useState('earnings')
  
  // Show QR code in fullscreen
  const handleShowQrCode = (method) => {
    if (method.qrImage) {
      setSelectedQrMethod(method);
    }
  }
  
  // Payment method options with their logos and QR images
  const paymentMethods = [
    { 
      id: 'esewa', 
      name: 'eSewa', 
      logo: '/images/logo/esewa.png', 
      qrImage: '/images/qr/esewaqr.jpg',
      instructions: 'Scan this QR code with your eSewa app to make a payment'
    },
    { 
      id: 'khalti', 
      name: 'Khalti', 
      logo: '/images/logo/khalti.png', 
      qrImage: '/images/qr/khaltiqr.jpg',
      instructions: 'Scan this QR code with your Khalti app to make a payment'
    },
    { 
      id: 'bank', 
      name: 'Bank Transfer', 
      logo: '/images/logo/bank.png', 
      qrImage: '/images/qr/bankqr.jpg',
      instructions: 'Scan this QR code or use the account details below for bank transfer'
    },
    { 
      id: 'cash', 
      name: 'Cash Payment', 
      logo: '/images/logo/cash.png', 
      qrImage: null,
      instructions: 'Cash payments are handled directly with your customers'
    }
  ]
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>
      </div>

      {/* Tabs for Earnings and Payment Methods */}
      <Tabs defaultValue="earnings" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="earnings">Earnings Overview</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        </TabsList>
        
        {/* Earnings Tab Content */}
        <TabsContent value="earnings" className="mt-6">
          {/* Earnings Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-3xl font-bold text-cityserve-pink">
                    Rs. {earnings.totalEarnings.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Pending Payout</p>
                  <p className="text-3xl font-bold text-cityserve-orange">
                    Rs. {earnings.pendingPayouts.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-3xl font-bold text-cityserve-blue">
                    Rs. {earnings.thisMonth.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Last Month</p>
                  <p className="text-3xl font-bold text-cityserve-teal">
                    Rs. {earnings.lastMonth.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Transactions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your recent earnings from services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, customer: 'Biplab Shrestha', service: 'Deep Cleaning', amount: 2500, date: 'June 25, 2025' },
                  { id: 2, customer: 'Sarita Sharma', service: 'Regular Cleaning', amount: 1500, date: 'June 23, 2025' },
                  { id: 3, customer: 'Manish Poudel', service: 'Window Cleaning', amount: 1000, date: 'June 20, 2025' },
                ].map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{transaction.service}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.customer} • {transaction.date}
                      </p>
                    </div>
                    <p className="font-medium">Rs. {transaction.amount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payment Methods Tab Content */}
        <TabsContent value="payment-methods" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>How you want to receive payments from customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id}
                    className="relative"
                  >
                    <Card 
                      className="hover:bg-muted/50 transition cursor-pointer h-full hover:shadow-md"
                      onClick={() => handleShowQrCode(method)}
                    >
                      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <div className="relative w-16 h-16 mb-3 mt-3">
                          <Image
                            src={method.logo}
                            alt={method.name}
                            fill
                            style={{objectFit: 'contain'}}
                          />
                        </div>
                        <p className="font-medium text-center">{method.name}</p>
                        <p className="text-xs text-muted-foreground text-center mt-1">
                          {method.qrImage ? 'Click to view full screen QR code' : 'No QR needed'}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
          
      {/* Fullscreen QR Code Overlay */}
      {selectedQrMethod && selectedQrMethod.qrImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 relative">
            <button
              className="absolute top-3 right-3 bg-muted/80 rounded-full p-2 hover:bg-muted"
              onClick={() => setSelectedQrMethod(null)}
            >
              <X className="h-5 w-5" />
            </button>
            
            <h3 className="text-xl font-bold text-center mb-4">{selectedQrMethod.name} Payment</h3>
            
            <div className="relative w-full h-80 mb-4">
              <Image
                src={selectedQrMethod.qrImage}
                alt={`${selectedQrMethod.name} QR Code`}
                fill
                style={{objectFit: 'contain'}}
                className="bg-white rounded-md"
              />
            </div>
            
            <p className="text-sm text-center font-medium mb-2">
              {selectedQrMethod.instructions}
            </p>
            
            {selectedQrMethod.id === 'bank' && (
              <div className="mt-4 p-3 bg-muted/30 rounded text-sm border">
                <p className="font-medium mb-1">Account Details:</p>
                <p>Bank: Nepal Bank Ltd</p>
                <p>Account Name: {user?.first_name || 'Your'} {user?.last_name || 'Name'}</p>
                <p>Account Number: 0123456789012</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
