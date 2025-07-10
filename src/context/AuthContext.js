'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { handleTokenCookie, getToken } from '@/lib/authUtils';
import { checkBackendAvailability } from '@/lib/backendStatus';

// Create the authentication context
const AuthContext = createContext();

// Mock user for development when backend is unavailable
const MOCK_USER = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  first_name: 'Test',
  last_name: 'User',
  is_provider: false,
  contact: '9876543210',
  address: {
    city: 'Kathmandu',
    area: 'Thamel'
  },
  verified: true
};

// AuthProvider component to wrap the app and provide authentication state
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendAvailable, setBackendAvailable] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Function to check if user is logged in when the app loads
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      try {
        // First check if backend is available
        const isBackendAvailable = await checkBackendAvailability();
        setBackendAvailable(isBackendAvailable);
        
        if (!isBackendAvailable) {
          console.warn('Backend is unavailable, using mock data');
          
          // Check if there's a token in local storage to simulate auth
          const token = getToken();
          if (token) {
            setUser(MOCK_USER);
          } else {
            setUser(null);
          }
          
          setIsLoading(false);
          return;
        }
        
        // Backend is available, check if token exists
        const token = getToken();
        
        if (!token) {
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        // Token exists, try to get user profile
        const userProfile = await authAPI.getProfile();
        setUser(userProfile);
      } catch (error) {
        console.error('Auth check error:', error);
        // If token is invalid, clear it
        if (error.status === 401) {
          handleTokenCookie(null);
          setUser(null);
        }
        setError(error.message || 'Authentication failed');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if backend is available first
      const isBackendAvailable = await checkBackendAvailability();
      
      if (!isBackendAvailable) {
        console.warn('Backend is unavailable, using mock registration');
        
        // Simulate registration with mock data
        // Create a mock token
        const mockToken = 'mock_token_' + Date.now();
        
        // Create a mock user based on registration data
        const mockUser = {
          id: 999,
          username: userData.email?.split('@')[0] || 'newuser',
          email: userData.email || 'newuser@example.com',
          first_name: userData.first_name || 'New',
          last_name: userData.last_name || 'User',
          is_provider: userData.is_provider || false,
          contact: userData.contact || '9876543210',
          address: userData.address || {
            city: 'Kathmandu',
            area: 'New Area'
          },
          verified: false
        };
        
        // Save token
        handleTokenCookie(mockToken);
        setUser(mockUser);
        
        // Redirect to dashboard based on user type
        if (mockUser.is_provider) {
          router.push('/dashboard/provider');
        } else {
          router.push('/dashboard');
        }
        
        return { success: true, user: mockUser, token: mockToken };
      }
      
      // Real backend registration
      const response = await authAPI.register(userData);
      
      // Save token
      if (response.token) {
        handleTokenCookie(response.token);
        setUser(response.user);
        
        // Redirect to dashboard based on user type
        if (response.user.is_provider) {
          router.push('/dashboard/provider');
        } else {
          router.push('/dashboard');
        }
      }
      
      return response;
    } catch (error) {
      // Create a user-friendly error message
      let errorMessage = 'Registration failed';
      
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        // If error has a string message, use it
        if (error.message && typeof error.message === 'string') {
          errorMessage = error.message;
        } 
        // If error has data with field-specific errors
        else if (error.data) {
          const errors = [];
          
          // Process each field in the error data
          for (const field in error.data) {
            const value = error.data[field];
            
            if (Array.isArray(value)) {
              errors.push(`${field}: ${value.join(', ')}`);
            } else if (typeof value === 'string') {
              errors.push(`${field}: ${value}`);
            }
          }
          
          if (errors.length > 0) {
            errorMessage = errors.join('. ');
          }
        }
      }
      
      setError(errorMessage);
      
      // Convert the error to a proper Error object with message
      const errorObject = new Error(errorMessage);
      // Preserve original error properties
      if (error && typeof error === 'object') {
        Object.keys(error).forEach(key => {
          errorObject[key] = error[key];
        });
      }
      throw errorObject;
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if backend is available first
      const isBackendAvailable = await checkBackendAvailability();
      
      if (!isBackendAvailable) {
        console.warn('Backend is unavailable, using mock login');
        
        // Simulate login with mock data
        if (credentials.identifier === 'demo' || 
            credentials.email === 'demo@example.com' || 
            credentials.password === 'demo') {
          
          // Create a mock token
          const mockToken = 'mock_token_' + Date.now();
          handleTokenCookie(mockToken);
          setUser(MOCK_USER);
          
          // Redirect to dashboard based on mock user type
          if (MOCK_USER.is_provider) {
            router.push('/dashboard/provider');
          } else {
            router.push('/dashboard');
          }
          
          return { success: true, user: MOCK_USER, token: mockToken };
        } else {
          // Mock login failure
          throw {
            status: 401,
            message: 'Invalid credentials. Use "demo" as username/email/password for mock login.'
          };
        }
      }
      
      // Real backend login
      const response = await authAPI.login(credentials);
      
      // Save token
      if (response.token) {
        handleTokenCookie(response.token);
        setUser(response.user);
        
        // Redirect to dashboard based on user type
        if (response.user.is_provider) {
          router.push('/dashboard/provider');
        } else {
          router.push('/dashboard');
        }
      }
      
      return response;
    } catch (error) {
      setError(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    handleTokenCookie(null);
    setUser(null);
    router.push('/');
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let response;
      
      // Determine if we should use the provider or regular profile endpoint
      if (user?.is_provider || user?.isProvider) {
        console.log('Using provider profile update endpoint with data:', profileData);
        response = await authAPI.updateProviderProfile(profileData);
      } else {
        console.log('Using regular profile update endpoint with data:', profileData);
        response = await authAPI.updateProfile(profileData);
      }
      
      console.log('Profile update response:', response);
      
      // Update user state with new profile data
      if (response) {
        setUser(prev => ({ ...prev, ...response }));
      }
      
      return response;
    } catch (error) {
      console.error('Profile update failed:', error);
      let errorMessage = 'Profile update failed';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error?.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      
      // Convert to proper Error object
      const errorObj = new Error(errorMessage);
      // Copy additional properties
      if (error && typeof error === 'object') {
        Object.keys(error).forEach(key => {
          errorObj[key] = error[key];
        });
      }
      throw errorObj;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value to provide
  const value = {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    isProvider: user?.is_provider || false,
    backendAvailable,
    register,
    signup: register, // Alias register as signup for compatibility
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
