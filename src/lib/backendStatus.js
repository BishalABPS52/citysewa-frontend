'use client';

/**
 * Utility for checking backend connectivity
 */

import { useState, useEffect } from 'react';

// API health check URL
const HEALTH_CHECK_URL = 'https://citysewa.onrender.com/api/test/';

/**
 * Custom hook to check if the backend is available
 * @returns {Object} - Status of the backend connection
 */
export function useBackendStatus() {
  const [status, setStatus] = useState({
    isLoading: true,
    isAvailable: false,
    lastChecked: null,
    error: null
  });

  const checkBackendStatus = async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(HEALTH_CHECK_URL, {
        method: 'GET',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      const isAvailable = response.ok;
      
      setStatus({
        isLoading: false,
        isAvailable,
        lastChecked: new Date(),
        error: isAvailable ? null : 'Backend responded with an error'
      });
      
      return isAvailable;
    } catch (error) {
      let errorMessage = 'Unable to connect to the backend';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Connection timed out';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setStatus({
        isLoading: false,
        isAvailable: false,
        lastChecked: new Date(),
        error: errorMessage
      });
      
      return false;
    }
  };

  // Check status on mount
  useEffect(() => {
    checkBackendStatus();
  }, []);

  return {
    ...status,
    checkBackendStatus
  };
}

/**
 * Utility function to check if backend is available (one-time check)
 * @returns {Promise<boolean>} - Whether the backend is available
 */
export async function checkBackendAvailability() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(HEALTH_CHECK_URL, {
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    return response.ok;
  } catch (error) {
    console.error('Backend availability check failed:', error);
    return false;
  }
}
