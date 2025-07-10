'use client';

import { useState } from 'react';
import { bookingAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

/**
 * Custom hook for booking functionality
 * Provides methods to create, update, cancel, and fetch bookings
 */
export function useBookingService() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const { isAuthenticated } = useAuth();

  // Fetch all bookings for the current user
  const fetchBookings = async () => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await bookingAPI.getBookings();
      setBookings(data);
      return data;
    } catch (error) {
      setError(error.message || 'Failed to fetch bookings');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new booking
  const createBooking = async (bookingData) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await bookingAPI.createBooking(bookingData);
      
      // Update bookings state
      setBookings(prev => [...prev, data]);
      
      return data;
    } catch (error) {
      setError(error.message || 'Failed to create booking');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing booking
  const updateBooking = async (bookingId, bookingData) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await bookingAPI.updateBooking(bookingId, bookingData);
      
      // Update bookings state
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId ? { ...booking, ...data } : booking
        )
      );
      
      return data;
    } catch (error) {
      setError(error.message || 'Failed to update booking');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel a booking
  const cancelBooking = async (bookingId) => {
    if (!isAuthenticated) {
      setError('Authentication required');
      return false;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await bookingAPI.cancelBooking(bookingId);
      
      // Update bookings state
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
      
      return true;
    } catch (error) {
      setError(error.message || 'Failed to cancel booking');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a specific booking by ID
  const getBookingById = (bookingId) => {
    return bookings.find(booking => booking.id === bookingId);
  };

  return {
    bookings,
    isLoading,
    error,
    fetchBookings,
    createBooking,
    updateBooking,
    cancelBooking,
    getBookingById,
  };
}
