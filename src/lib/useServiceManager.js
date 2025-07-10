'use client';

import { useState } from 'react';
import { serviceAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

/**
 * Custom hook for service functionality
 * Provides methods to fetch, create, update, and delete services
 */
export function useServiceManager() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);
  const { isAuthenticated, isProvider } = useAuth();

  // Fetch all services
  const fetchAllServices = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await serviceAPI.getAllServices();
      setServices(data);
      return data;
    } catch (error) {
      setError(error.message || 'Failed to fetch services');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch a specific service by ID
  const fetchServiceById = async (serviceId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await serviceAPI.getService(serviceId);
      return data;
    } catch (error) {
      setError(error.message || 'Failed to fetch service');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new service (provider only)
  const createService = async (serviceData) => {
    if (!isAuthenticated || !isProvider) {
      setError('Provider authentication required');
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await serviceAPI.createService(serviceData);
      
      // Update services state
      setServices(prev => [...prev, data]);
      
      return data;
    } catch (error) {
      setError(error.message || 'Failed to create service');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing service (provider only)
  const updateService = async (serviceId, serviceData) => {
    if (!isAuthenticated || !isProvider) {
      setError('Provider authentication required');
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await serviceAPI.updateService(serviceId, serviceData);
      
      // Update services state
      setServices(prev => 
        prev.map(service => 
          service.id === serviceId ? { ...service, ...data } : service
        )
      );
      
      return data;
    } catch (error) {
      setError(error.message || 'Failed to update service');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a service (provider only)
  const deleteService = async (serviceId) => {
    if (!isAuthenticated || !isProvider) {
      setError('Provider authentication required');
      return false;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await serviceAPI.deleteService(serviceId);
      
      // Update services state
      setServices(prev => prev.filter(service => service.id !== serviceId));
      
      return true;
    } catch (error) {
      setError(error.message || 'Failed to delete service');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Filter services by category
  const filterServicesByCategory = (category) => {
    return services.filter(service => service.category === category);
  };

  // Search services by name or description
  const searchServices = (query) => {
    const searchTerm = query.toLowerCase();
    return services.filter(service => 
      service.name.toLowerCase().includes(searchTerm) || 
      service.description.toLowerCase().includes(searchTerm)
    );
  };

  return {
    services,
    isLoading,
    error,
    fetchAllServices,
    fetchServiceById,
    createService,
    updateService,
    deleteService,
    filterServicesByCategory,
    searchServices,
  };
}
