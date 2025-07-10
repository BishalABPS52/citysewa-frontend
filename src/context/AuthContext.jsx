'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'

// Initial state
const initialState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
}

// Actions
const authActions = {
  SET_USER: 'SET_USER',
  SET_TOKEN: 'SET_TOKEN',
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
}

// Reducer
function authReducer(state, action) {
  switch (action.type) {
    case authActions.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      }
    case authActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    case authActions.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      }
    case authActions.LOGOUT:
      return {
        ...initialState,
        isLoading: false,
      }
    default:
      return state
  }
}

// Create context
const AuthContext = createContext(null)

// Provider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check for existing token on app load and validate it
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userStr = localStorage.getItem('userData')
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
        console.log('Restoring user session:', { user: user.username, token: 'Present' })
        dispatch({
          type: authActions.LOGIN_SUCCESS,
          payload: { user, token }
        })
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        dispatch({ type: authActions.LOGOUT })
      }
    } else {
      console.log('No existing session found')
    }
    
    dispatch({ type: authActions.SET_LOADING, payload: false })
  }, [])

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: authActions.SET_LOADING, payload: true })
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Login failed')
      }

      const data = await response.json()
      
      // Store token and user data
      if (data.token) {
        localStorage.setItem('authToken', data.token)
      }
      
      if (data.user) {
        localStorage.setItem('userData', JSON.stringify(data.user))
        dispatch({
          type: authActions.LOGIN_SUCCESS,
          payload: { user: data.user, token: data.token }
        })
      }
      
      return { success: true, data }
    } catch (error) {
      dispatch({ type: authActions.SET_LOADING, payload: false })
      throw error
    }
  }

  // Signup function
  const signup = async (signupData) => {
    try {
      dispatch({ type: authActions.SET_LOADING, payload: true })
      
      console.log('AuthContext signup - received data:', signupData)
      
      // Transform frontend data to match backend format exactly
      const backendData = {
        email: signupData.email,
        first_name: signupData.firstName,
        last_name: signupData.lastName,
        is_provider: signupData.userType === 'provider' || signupData.isProvider || false,
        contact: signupData.phone || signupData.contact || '',
        address: {
          city: signupData.city || 'kathmandu',
          area: signupData.area || signupData.address || ''
        },
        password: signupData.password,
        ...(signupData.isProvider && signupData.organizationType && {
          organization_type: signupData.organizationType,
          service_category: signupData.serviceCategory || '',
          description: signupData.description || ''
        })
      }
      
      console.log('AuthContext signup - sending to API:', backendData)
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData)
      })

      const data = await response.json()
      console.log('AuthContext signup - API response:', data)

      if (!response.ok) {
        const errorMessage = data.message || data.error || 'Registration failed'
        throw new Error(errorMessage)
      }

      // If registration includes auto-login (token returned)
      if (data.token && data.user) {
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('userData', JSON.stringify(data.user))
        dispatch({
          type: authActions.LOGIN_SUCCESS,
          payload: { user: data.user, token: data.token }
        })
      } else {
        dispatch({ type: authActions.SET_LOADING, payload: false })
      }
      
      return { success: true, data }
    } catch (error) {
      console.error('AuthContext signup error:', error)
      dispatch({ type: authActions.SET_LOADING, payload: false })
      throw error
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    dispatch({ type: authActions.LOGOUT })
  }

  // Fetch user profile data with proper authentication
  const fetchUserProfile = async () => {
    try {
      const token = state.token || localStorage.getItem('authToken')
      if (!token) {
        console.warn('No authentication token found for profile fetch')
        return null
      }

      console.log('Fetching user profile with token...')

      const response = await fetch('/api/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Profile fetch failed:', errorData)
        
        // Only logout on specific auth failures, not all 401s
        if (response.status === 401 && errorData.message && 
            (errorData.message.toLowerCase().includes('token') || 
             errorData.message.toLowerCase().includes('unauthorized'))) {
          console.warn('Authentication token invalid, logging out user')
          logout()
          return null
        }
        
        // For other errors, just log and return null without logging out
        console.warn('Profile fetch failed but not logging out:', errorData.message)
        return null
      }

      const userData = await response.json()
      console.log('Profile fetched successfully:', userData)
      
      // Update user state with fresh data
      if (userData && userData.user) {
        dispatch({ type: authActions.SET_USER, payload: userData.user })
        localStorage.setItem('userData', JSON.stringify(userData.user))
        return userData.user
      } else {
        console.warn('Profile fetch response missing user data:', userData)
        return null
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }

  // Update user profile data with proper authentication and data manipulation
  const updateProfile = async (profileData) => {
    try {
      const token = state.token || localStorage.getItem('authToken')
      if (!token) throw new Error('No authentication token found')

      console.log('Updating profile with data:', profileData)
      console.log('Using authentication token:', token ? 'Token present' : 'No token')

      // Try PATCH method first for updating existing profile
      let response = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      })

      // If PATCH fails with 405 (Method Not Allowed), try POST
      if (!response.ok && response.status === 405) {
        console.log('PATCH method not supported, trying POST method')
        response = await fetch('/api/auth/profile', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(profileData)
        })
      }

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Profile update failed:', errorData)
        
        // If the profile endpoint doesn't exist (404), handle it gracefully
        if (response.status === 404 && errorData.message && 
            errorData.message.includes('Profile update endpoint not available')) {
          console.warn('Backend does not support profile updates, updating local data only')
          
          // Update local user data with the provided profile data
          const currentUser = state.user || JSON.parse(localStorage.getItem('userData') || '{}')
          const updatedUser = {
            ...currentUser,
            ...profileData,
            // Ensure we keep essential user data
            id: currentUser.id,
            email: currentUser.email,
            username: currentUser.username,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName
          }
          
          // Update the user state and localStorage
          dispatch({ type: authActions.SET_USER, payload: updatedUser })
          localStorage.setItem('userData', JSON.stringify(updatedUser))
          
          console.log('✅ Profile updated locally (backend update not supported)')
          return updatedUser
        }
        
        // Only logout on 401 (Unauthorized) - be more specific about auth failures
        if (response.status === 401 && errorData.message && errorData.message.toLowerCase().includes('token')) {
          console.warn('Token expired or invalid, logging out user')
          logout()
          throw new Error('Authentication failed. Please log in again.')
        }
        
        // For other errors, don't logout - just show the error
        throw new Error(errorData.message || `Profile update failed (Status: ${response.status})`)
      }

      const userData = await response.json()
      console.log('Profile updated successfully:', userData)
      
      // Ensure we have valid user data before updating state
      if (userData && userData.user) {
        // Update the user state with the new data from backend
        dispatch({ type: authActions.SET_USER, payload: userData.user })
        localStorage.setItem('userData', JSON.stringify(userData.user))
        
        console.log('✅ Profile update completed successfully!')
        return userData.user
      } else {
        console.warn('Profile update response missing user data:', userData)
        throw new Error('Invalid response from server')
      }
    } catch (error) {
      console.error('Error updating user profile:', error)
      throw error
    }
  }

  const value = {
    ...state,
    login,
    signup,
    logout,
    fetchUserProfile,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
