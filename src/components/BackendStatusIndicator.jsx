'use client';

import { useState, useEffect } from 'react';
import { useBackendStatus } from '@/lib/backendStatus';
import { AlertCircle, WifiOff, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BackendStatusIndicator({ className = '' }) {
  const { isLoading, isAvailable, lastChecked, error, checkBackendStatus } = useBackendStatus();
  const [isVisible, setIsVisible] = useState(true);
  
  // Only show in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (!isDevelopment || !isVisible) {
    return null;
  }
  
  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <div className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
        isLoading 
          ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' 
          : isAvailable
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {isLoading ? (
          <RefreshCw className="h-5 w-5 animate-spin" />
        ) : isAvailable ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <WifiOff className="h-5 w-5" />
        )}
        
        <div className="flex-1">
          <div className="font-medium">
            {isLoading 
              ? 'Checking backend...' 
              : isAvailable 
                ? 'Backend connected' 
                : 'Backend unavailable'
            }
          </div>
          {!isLoading && (
            <div className="text-xs opacity-80">
              {isAvailable 
                ? 'Using real backend API' 
                : 'Using mock data for development'
              }
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-7 w-7 rounded-full"
            onClick={checkBackendStatus}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh status</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="h-7 w-7 rounded-full"
            onClick={() => setIsVisible(false)}
          >
            <span className="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
