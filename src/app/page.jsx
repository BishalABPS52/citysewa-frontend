'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import Footer from '@/components/Footer';
import AboutSection from '@/components/About';
import Contacts from '@/components/Contact';
import FeaturedServices from '@/components/FeaturedServices';

export default function Home() {
  const { isAuthenticated, isProvider, isLoading } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  // Redirect to appropriate dashboard if user is already logged in
  useEffect(() => {
    if (isAuthenticated && !redirecting) {
      setRedirecting(true);
      if (isProvider) {
        router.push('/dashboard/provider');
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, isProvider, router, redirecting]);

  // Show loading indicator while auth is being checked or when redirecting
  if (isLoading || redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cityserve-pink"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render the landing page if user is not authenticated
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturedServices />
      <AboutSection />
      <Contacts/>
      <Footer />
    </main>
  );
}
