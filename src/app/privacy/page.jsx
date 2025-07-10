'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PrivacyPolicy() {
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
          <h1>Privacy Policy</h1>
          <p>Last Updated: June 29, 2025</p>
          
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy describes how Cityसेवा collects, uses, and shares information about you when you use our services.
            We are committed to protecting your privacy and handling your data with transparency.
          </p>
          
          <h2>2. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, including personal information such as your name, email address, 
            phone number, and payment information when you register for an account or use our services.
          </p>
          
          <h3>2.1 Information Collected Automatically</h3>
          <p>
            When you use our services, we automatically collect certain information, including:
          </p>
          <ul>
            <li>Log information, such as IP address, browser type, pages visited, and time spent</li>
            <li>Device information, such as hardware model, operating system, and unique device identifiers</li>
            <li>Location information, when you enable location services</li>
          </ul>
          
          <h2>3. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices, updates, security alerts, and administrative messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Communicate with you about products, services, and events</li>
            <li>Monitor and analyze trends, usage, and activities</li>
          </ul>
          
          <h2>4. Sharing of Information</h2>
          <p>
            We may share your information with:
          </p>
          <ul>
            <li>Service providers who perform services on our behalf</li>
            <li>Service professionals to facilitate your requests</li>
            <li>Third parties in connection with a business transfer</li>
            <li>Law enforcement agencies when required by law</li>
          </ul>
          
          <h2>5. Your Choices</h2>
          <p>
            You can access and update certain information about you from within your account settings. You can also opt out of 
            receiving promotional communications from us by following the instructions in those communications.
          </p>
          
          <h2>6. Data Security</h2>
          <p>
            We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized 
            access, disclosure, alteration, and destruction.
          </p>
          
          <h2>7. Children's Privacy</h2>
          <p>
            Our services are not directed to children under 13, and we do not knowingly collect personal information from 
            children under 13.
          </p>
          
          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on 
            our website.
          </p>
          
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@cityserve.com.
          </p>
        </div>
      </div>
    </div>
  )
}
