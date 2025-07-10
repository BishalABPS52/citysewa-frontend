'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from './api';

// Handle cookies for authentication
export const handleTokenCookie = (token) => {
  if (typeof document !== 'undefined') {
    // Set token in localStorage
    if (token) {
      localStorage.setItem('auth_token', token);
      
      // Also set in cookie for middleware
      document.cookie = `auth_token=${token}; path=/; max-age=2592000`; // 30 days
    } else {
      localStorage.removeItem('auth_token');
      
      // Clear cookie
      document.cookie = 'auth_token=; path=/; max-age=0';
    }
  }
};

// Get token from storage
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

// Custom hook for login form
export const useLoginForm = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.login(formData);
      
      if (response.token) {
        handleTokenCookie(response.token);
        
        // Redirect based on user type
        if (response.user.is_provider) {
          router.push('/dashboard/provider');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};

// Custom hook for registration form
export const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    is_provider: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const validateForm = () => {
    // Check if passwords match
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match.');
      return false;
    }
    
    // Password strength check
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.register(formData);
      
      if (response.token) {
        handleTokenCookie(response.token);
        
        // Redirect based on user type
        if (response.user.is_provider) {
          router.push('/dashboard/provider');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};
