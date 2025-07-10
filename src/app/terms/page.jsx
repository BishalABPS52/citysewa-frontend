'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-cityserve-pink rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Cityसेवा</span>
          </Link>
          <Link href="/auth">
            <Button variant="outline">Back to Login</Button>
          </Link>
        </div>
        
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
          <h1>Terms of Service</h1>
          <p>Last Updated: June 29, 2025</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Cityसेवा's services, you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our services.
          </p>
          
          <h2>2. Description of Service</h2>
          <p>
            Cityसेवा provides a platform connecting users with local service providers. We do not provide services directly 
            but facilitate connections between users and service providers.
          </p>
          
          <h2>3. User Accounts</h2>
          <p>
            To use certain features of our service, you must register for an account. You are responsible for maintaining 
            the confidentiality of your account information and for all activities that occur under your account.
          </p>
          
          <h2>4. User Conduct</h2>
          <p>
            You agree not to use the service for any illegal purposes or to conduct any illegal activity. You are solely 
            responsible for your interactions with service providers.
          </p>
          
          <h2>5. Service Provider Listings</h2>
          <p>
            CityServe does not guarantee the quality or accuracy of service provider listings. We make reasonable efforts 
            to verify providers but assume no responsibility for the services they provide.
          </p>
          
          <h2>6. Payments and Fees</h2>
          <p>
            CityServe may charge fees for certain services. All fees are non-refundable unless otherwise specified at the 
            time of purchase.
          </p>
          
          <h2>7. Intellectual Property</h2>
          <p>
            All content on CityServe, including text, graphics, logos, and software, is the property of CityServe and 
            protected by intellectual property laws.
          </p>
          
          <h2>8. Limitation of Liability</h2>
          <p>
            CityServe is not liable for any indirect, incidental, special, consequential, or punitive damages resulting 
            from your use of our services.
          </p>
          
          <h2>9. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and access to our services at our sole discretion, 
            without notice, for conduct that we believe violates these Terms of Service.
          </p>
          
          <h2>10. Changes to Terms</h2>
          <p>
            CityServe reserves the right to modify these Terms of Service at any time. We will provide notice of significant 
            changes by posting a notice on our website.
          </p>
          
          <h2>11. Governing Law</h2>
          <p>
            These Terms of Service are governed by the laws of the jurisdiction in which CityServe is established, without 
            regard to its conflict of law principles.
          </p>
          
          <h2>12. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at support@cityserve.com.
          </p>
        </div>
      </div>
    </div>
  )
}
