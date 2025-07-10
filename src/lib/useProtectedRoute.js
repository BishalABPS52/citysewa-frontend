'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

/**
 * Custom hook to protect dashboard routes
 * Redirects users based on authentication status and user type
 */
export function useProtectedRoute() {
  const { isAuthenticated, isLoading, isProvider, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip redirection check if auth state is still loading
    if (isLoading) return;

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Check if provider is trying to access customer routes
    const isCustomerRoute = pathname.startsWith('/dashboard') && 
                            !pathname.includes('/provider') &&
                            pathname !== '/dashboard';
                            
    // Check if customer is trying to access provider routes
    const isProviderRoute = pathname.includes('/provider');

    // Redirect provider from customer routes
    if (isProvider && isCustomerRoute) {
      router.push('/dashboard/provider');
      return;
    }

    // Redirect customer from provider routes
    if (!isProvider && isProviderRoute) {
      router.push('/dashboard');
      return;
    }

  }, [isAuthenticated, isLoading, isProvider, pathname, router]);

  return { isAuthenticated, isLoading, user, isProvider };
}
