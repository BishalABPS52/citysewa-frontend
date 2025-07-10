/**
 * API utility functions for cityserve application
 * Handles all API requests to the backend
 */

// Base URL configuration for the backend API
const PRODUCTION_API_URL = 'https://citysewa.onrender.com/api';
const DEVELOPMENT_API_URL = 'http://localhost:8000/api'; // Django development server
const IS_DEV = process.env.NODE_ENV === 'development';
const USE_PRODUCTION_API = true; // Set to false to use local development API

// Get the appropriate API base URL
const API_BASE_URL = USE_PRODUCTION_API ? PRODUCTION_API_URL : DEVELOPMENT_API_URL;

/**
 * Generic function to make authenticated API requests
 */
export async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Debug the request
  console.log(`Making API request to: ${url}`, {
    method: options.method || 'GET',
    headers: options.headers || {},
    body: options.body ? JSON.parse(options.body) : undefined
  });
  
  // Get auth token from localStorage if it exists
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  
  // Set up headers with authentication token if available
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Token ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    const response = await fetch(url, {
      ...config,
      signal: controller.signal
    });
    
    // Clear the timeout
    clearTimeout(timeoutId);
    
    // Log the response for debugging
    console.log(`Response from ${url}:`, {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries([...response.headers.entries()])
    });
    
    // Check if the response has JSON content
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      // If response is not ok, throw an error with the response data
      if (!response.ok) {
        // Create a formatted error message
        let errorMessage = data.detail || data.error || data.message || 'API request failed';
        
        // Handle Django's validation errors which can come in multiple formats
        if (data.non_field_errors) {
          errorMessage = Array.isArray(data.non_field_errors) 
            ? data.non_field_errors.join('. ')
            : data.non_field_errors;
        }
        
        // Handle field-specific validation errors (Django's default format)
        const fieldErrors = [];
        for (const field in data) {
          // Skip non_field_errors as we've already handled it
          if (field === 'non_field_errors' || field === 'detail' || field === 'error' || field === 'message') {
            continue;
          }
          
          // Check if the value is an array (Django's typical error format)
          if (Array.isArray(data[field])) {
            fieldErrors.push(`${field}: ${data[field].join(', ')}`);
          } else if (typeof data[field] === 'object') {
            // Nested object errors
            for (const nestedField in data[field]) {
              if (Array.isArray(data[field][nestedField])) {
                fieldErrors.push(`${field}.${nestedField}: ${data[field][nestedField].join(', ')}`);
              } else {
                fieldErrors.push(`${field}.${nestedField}: ${data[field][nestedField]}`);
              }
            }
          } else if (typeof data[field] === 'string') {
            fieldErrors.push(`${field}: ${data[field]}`);
          }
        }
        
        // If we have field-specific errors, use those instead
        if (fieldErrors.length > 0) {
          errorMessage = fieldErrors.join('. ');
        }
        
        throw { 
          status: response.status, 
          data, 
          message: errorMessage
        };
      }
      
      // For successful responses
      console.log(`Success response data from ${url}:`, data);
      return data;
    } else {
      // Handle non-JSON responses
      const text = await response.text();
      
      if (!response.ok) {
        throw { 
          status: response.status, 
          message: text || 'API request failed' 
        };
      }
      
      return text;
    }
  } catch (error) {
    console.error('API request error:', error);
    
    // Create a more meaningful error object
    if (error.name === 'AbortError') {
      throw {
        status: 408,
        message: 'Request timed out. The server took too long to respond.'
      };
    } else if (error.message && error.message.includes('Network request failed')) {
      throw {
        status: 503,
        message: 'Network error. Please check your internet connection or the server might be down.'
      };
    } else {
      // If we have a more complex error object, ensure it has a string message
      const errorObj = {
        status: error.status || 500,
        message: error.message || 'An unexpected error occurred',
      };
      
      // Copy any additional properties from the original error
      if (error) {
        Object.keys(error).forEach(key => {
          if (key !== 'message' && key !== 'status') {
            errorObj[key] = error[key];
          }
        });
      }
      
      throw errorObj;
    }
  }
}

// Authentication related API functions
export const authAPI = {
  // Register a new user
  register: (userData) => {
    try {
      // Format data before sending to the backend
      const formattedData = { ...userData };
      
      // Handle contact field - strip non-digits and limit to 10 characters
      if (formattedData.contact) {
        // Remove any non-digit characters (like +, spaces, etc.)
        let digits = formattedData.contact.replace(/\D/g, '');
        
        // Take only the last 10 digits if longer
        if (digits.length > 10) {
          digits = digits.slice(-10);
        }
        
        formattedData.contact = digits;
      }
      
      // Handle address object - ensure it's properly formatted for the backend
      if (formattedData.address && typeof formattedData.address === 'object') {
        // Some backends expect address as a string
        // formattedData.address = JSON.stringify(formattedData.address);
      }
      
      console.log('Formatted data for backend:', formattedData);
      
      return fetchAPI('/register/', {
        method: 'POST',
        body: JSON.stringify(formattedData),
      });
    } catch (error) {
      // Convert any synchronous errors to a consistent format
      console.error('Error in registration preparation:', error);
      throw new Error(error.message || 'Failed to prepare registration data');
    }
  },
  
  // Login a user
  login: (credentials) => {
    return fetchAPI('/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  // Get current user profile
  getProfile: () => {
    return fetchAPI('/userprofile/', {
      method: 'GET',
    });
  },
  
  // Update user profile
  updateProfile: (profileData) => {
    return fetchAPI('/userprofile/', {
      method: 'PATCH',
      body: JSON.stringify(profileData),
    });
  },
  
  // For providers: get or update provider profile
  getProviderProfile: () => {
    return fetchAPI('/profile/', {
      method: 'GET',
    });
  },
  
  updateProviderProfile: (profileData) => {
    try {
      // Make sure the data structure matches the backend API expectations
      const formattedData = { ...profileData };
      
      // Ensure experience_years is a number
      if (formattedData.experience_years !== undefined) {
        formattedData.experience_years = parseInt(formattedData.experience_years, 10) || 0;
      }
      
      // Log the data being sent
      console.log('Updating provider profile with data:', formattedData);
      
      return fetchAPI('/profile/', {
        method: 'PATCH',
        body: JSON.stringify(formattedData),
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } catch (error) {
      console.error('Error preparing provider profile update:', error);
      throw new Error(error.message || 'Failed to update provider profile');
    }
  },
};

// Booking related API functions
export const bookingAPI = {
  // Get all bookings for the current user (customer or provider)
  getBookings: () => {
    return fetchAPI('/bookings/', {
      method: 'GET',
    });
  },
  
  // Create a new booking
  createBooking: (bookingData) => {
    return fetchAPI('/bookings/', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },
  
  // Update a booking
  updateBooking: (bookingId, bookingData) => {
    return fetchAPI(`/bookings/${bookingId}/`, {
      method: 'PATCH',
      body: JSON.stringify(bookingData),
    });
  },
  
  // Cancel/delete a booking
  cancelBooking: (bookingId) => {
    return fetchAPI(`/bookings/${bookingId}/`, {
      method: 'DELETE',
    });
  },
};

// Services related API functions
export const serviceAPI = {
  // Get all services
  getAllServices: () => {
    try {
      return fetchAPI('/services/', {
        method: 'GET',
      })
      .then(data => {
        // Validate the response format
        if (!data || !Array.isArray(data)) {
          console.warn('Invalid services response format:', data);
          throw new Error('Invalid response format from services API');
        }
        return data;
      });
    } catch (error) {
      console.error('Error in getAllServices:', error);
      throw error;
    }
  },
  
  // Get a specific service
  getService: (serviceId) => {
    return fetchAPI(`/services/${serviceId}/`, {
      method: 'GET',
    });
  },
  
  // For providers: create a new service
  createService: (serviceData) => {
    return fetchAPI('/services/', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  },
  
  // For providers: update a service
  updateService: (serviceId, serviceData) => {
    return fetchAPI(`/services/${serviceId}/`, {
      method: 'PATCH',
      body: JSON.stringify(serviceData),
    });
  },
  
  // For providers: delete a service
  deleteService: (serviceId) => {
    return fetchAPI(`/services/${serviceId}/`, {
      method: 'DELETE',
    });
  },
};

// Reviews related API functions
export const reviewAPI = {
  // Get reviews for a service
  getReviews: (serviceId) => {
    return fetchAPI(`/reviews/?service_id=${serviceId}`, {
      method: 'GET',
    });
  },
  
  // Create a new review
  createReview: (reviewData) => {
    return fetchAPI('/reviews/', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },
  
  // Update a review
  updateReview: (reviewId, reviewData) => {
    return fetchAPI(`/reviews/${reviewId}/`, {
      method: 'PATCH',
      body: JSON.stringify(reviewData),
    });
  },
  
  // Delete a review
  deleteReview: (reviewId) => {
    return fetchAPI(`/reviews/${reviewId}/`, {
      method: 'DELETE',
    });
  },
};
