'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LogoAnimation from '@/components/LogoAnimation'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Modal } from '@/components/ui/modal'

// Import Privacy Policy and Terms of Service content components
import PrivacyPolicy from '@/app/privacy/page'
import TermsOfService from '@/app/terms/page'

export default function Auth() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, signup, isLoading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState('login') // 'login' or 'signup'
  const [userType, setUserType] = useState('customer') // 'customer' or 'provider'
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Modal states
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  
  // Agreement checkbox state
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  
  // Set the active tab and user type based on the URL query parameters
  useEffect(() => {
    const tab = searchParams.get('tab')
    const type = searchParams.get('type')
    
    if (tab === 'signup') {
      setActiveTab('signup')
    } else {
      setActiveTab('login')
    }
    
    if (type === 'provider') {
      setUserType('provider')
    } else {
      setUserType('customer')
    }
  }, [searchParams])
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    showPassword: false
  })
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    phone: '',
    city: 'kathmandu',
    area: '',
    serviceCategory: '',
    description: '',
    organizationType: 'individual' // 'individual' or 'organization'
  })

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSignupChange = (e) => {
    const { name, value } = e.target
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Prepare login data for Django backend
      const loginPayload = {
        email: loginData.email,
        password: loginData.password
      }

      console.log('Logging in with:', { email: loginPayload.email })
      
      // Use the auth context login function
      const result = await login(loginPayload)
      
      console.log('Login result:', result)
      
      // After successful login, redirect based on user's actual role
      const user = result.data.user
      
      // If user is a provider and was trying to access provider dashboard, redirect there
      // Otherwise, redirect to customer dashboard (default)
      if (user.isProvider && userType === 'provider') {
        router.push('/dashboard/provider')
      } else if (user.isProvider) {
        // Provider user but accessing as customer
        router.push('/dashboard')
      } else if (userType === 'provider') {
        // Customer user trying to access provider dashboard
        setError('Access denied. You are not registered as a service provider. Please contact support to upgrade your account.')
        return
      } else {
        // Regular customer login
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate password match
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }
    
    // Check if user has agreed to terms
    if (!agreedToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy')
      setIsLoading(false)
      return
    }

    try {
      // Prepare signup data for Django backend in the required format
      const signupPayload = {
        first_name: signupData.firstName,
        last_name: signupData.lastName,
        email: signupData.email,
        password: signupData.password,
        user_type: userType,
        is_provider: userType === 'provider',
        contact: signupData.phone, // Use phone field for contact
        city: signupData.city,
        area: signupData.area,
        ...(userType === 'provider' && {
          service_category: signupData.serviceCategory,
          description: signupData.description,
          organization_type: signupData.organizationType
        })
      }

      console.log('Auth page - signing up with:', signupPayload)
      
      // Use the auth context signup function
      const result = await signup(signupPayload)
      
      console.log('Auth page - signup result:', result)
      
      // If signup was successful and includes auto-login
      if (result.data.token && result.data.user) {
        // Redirect to respective dashboard based on user type
        if (userType === 'provider') {
          router.push('/dashboard/provider')
        } else {
          router.push('/dashboard')
        }
      } else {
        // Switch to login tab after successful registration
        setActiveTab('login')
        setError('')
        
        // Optional: Pre-fill login form with the email
        setLoginData(prev => ({
          ...prev,
          email: signupData.email
        }))
        
        // Show success message (clear error to show success)
        alert('Account created successfully! Please log in.')
      }
    } catch (err) {
      console.error('Auth page - signup error:', err);
      
      // Handle different types of errors
      let errorMessage = 'Failed to create account. Please try again.';
      
      // First check if it's an Error object with a message
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        // Simple string error
        errorMessage = err;
      } else if (err && typeof err === 'object') {
        // If err.message is defined and is a string, use it directly
        if (err.message && typeof err.message === 'string') {
          errorMessage = err.message;
        } 
        // Handle case where err.data contains field-specific errors
        else if (err.data) {
          // Build an array of error messages
          const errors = [];
          
          // Process each field in the error data
          for (const field in err.data) {
            const value = err.data[field];
            
            if (Array.isArray(value)) {
              errors.push(`${field}: ${value.join(', ')}`);
            } else if (typeof value === 'string') {
              errors.push(`${field}: ${value}`);
            } else if (typeof value === 'object' && value !== null) {
              // Handle nested objects by flattening them
              for (const nestedField in value) {
                const nestedValue = value[nestedField];
                if (Array.isArray(nestedValue)) {
                  errors.push(`${field}.${nestedField}: ${nestedValue.join(', ')}`);
                } else if (typeof nestedValue === 'string') {
                  errors.push(`${field}.${nestedField}: ${nestedValue}`);
                }
              }
            }
          }
          
          if (errors.length > 0) {
            errorMessage = errors.join('. ');
          }
        }
      }
      
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background px-4 pt-8">
      {/* Logo in top left corner */}
      <div className="w-full flex items-center mb-8 pl-4 md:pl-8">
        <div className="animate-fade-in">
          <LogoAnimation size="nav" showText={true} withLink={true} />
        </div>
      </div>
      
      {/* Center the rest of the content */}
      <div className="flex-grow flex flex-col items-center justify-center">
      
        <Card className="w-full max-w-md shadow-lg border-border">
        {/* Welcome text */}
        <div className="text-center pt-6 pb-2">
          <h2 className="text-3xl font-bold tracking-tight text-accent-custom animate-fade-in">Welcome to Cityसेवा</h2>
          <div className="flex items-center justify-center mt-2">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              userType === 'provider' 
                ? 'bg-cityserve-teal/10 text-cityserve-teal' 
                : 'bg-cityserve-pink/10 text-cityserve-pink'
            }`}>
              {userType === 'provider' ? 'Service Provider' : 'Customer'}
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Your one-stop platform for local services
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex mt-6">
          <button
            onClick={() => { 
              setActiveTab('login'); 
              setError(''); 
              router.push(`/auth${userType === 'provider' ? '?type=provider' : ''}`, { scroll: false });
            }}
            className={`flex-1 py-4 text-center font-medium transition-colors border-b-2 ${
              activeTab === 'login'
                ? 'border-cityserve-pink text-cityserve-pink'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { 
              setActiveTab('signup'); 
              setError(''); 
              router.push(`/auth?tab=signup${userType === 'provider' ? '&type=provider' : '&type=customer'}`, { scroll: false });
            }}
            className={`flex-1 py-4 text-center font-medium transition-colors border-b-2 ${
              activeTab === 'signup'
                ? 'border-cityserve-pink text-cityserve-pink'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Sign Up
          </button>
        </div>

        <CardContent className="pt-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}
          
          {/* Login Form */}
          {activeTab === 'login' && (
            <>
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md mb-6">
                <p className="text-sm">
                  <strong>Note:</strong> Use your email and password to log in. You can access different dashboards based on your account type after logging in.
                </p>
              </div>
              
              <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* User Type Toggle */}
              <div className="flex justify-center mb-4">
                <div className="bg-muted inline-flex rounded-md p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setUserType('customer');
                      router.push('/auth?type=customer', { scroll: false });
                    }}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      userType === 'customer'
                        ? 'bg-white text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    I need services
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserType('provider');
                      router.push('/auth?type=provider', { scroll: false });
                    }}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      userType === 'provider'
                        ? 'bg-white text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    I provide services
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="bg-card border-border"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <Link href="#" className="text-sm font-medium text-cityserve-pink hover:text-cityserve-pink/90">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={loginData.showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="bg-card border-border"
                  />
                  <button 
                    type="button"
                    onClick={() => setLoginData(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-400 hover:text-gray-500"
                  >
                    {loginData.showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-cityserve-pink focus:ring-cityserve-pink"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm">
                  Remember me
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cityserve-pink hover:bg-cityserve-pink/90 text-white mt-6"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              
              {/* Social Login Options */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => console.log('Google login')}
                    className="bg-white hover:bg-gray-50 text-black flex items-center justify-center gap-2"
                  >
                    <Image
                      src="/images/google.svg"
                      alt="Google logo"
                      width={18}
                      height={18}
                      className="mr-1"
                    />
                    Google
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => console.log('Facebook login')}
                    className="bg-white hover:bg-gray-50 text-black flex items-center justify-center gap-2"
                  >
                    <Image
                      src="/images/facebook.svg"
                      alt="Facebook logo"
                      width={18}
                      height={18}
                      className="mr-1"
                    />
                    Facebook
                  </Button>
                </div>
              </div>
              </form>
            </>
          )}
          
          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              {/* User Type Toggle */}
              <div className="flex justify-center mb-4">
                <div className="bg-muted inline-flex rounded-md p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setUserType('customer');
                      router.push('/auth?tab=signup&type=customer', { scroll: false });
                    }}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      userType === 'customer'
                        ? 'bg-white text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    I need services
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserType('provider');
                      router.push('/auth?tab=signup&type=provider', { scroll: false });
                    }}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      userType === 'provider'
                        ? 'bg-white text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    I provide services
                  </button>
                </div>
              </div>

              {/* Organization Type Toggle for Providers */}
              {userType === 'provider' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Registration Type
                  </label>
                  <div className="flex justify-center">
                    <div className="bg-muted inline-flex rounded-md p-1 w-full">
                      <button
                        type="button"
                        onClick={() => setSignupData(prev => ({ ...prev, organizationType: 'individual' }))}
                        className={`flex-1 py-2 text-sm rounded-md transition-colors ${
                          signupData.organizationType === 'individual'
                            ? 'bg-white text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Individual
                      </button>
                      <button
                        type="button"
                        onClick={() => setSignupData(prev => ({ ...prev, organizationType: 'organization' }))}
                        className={`flex-1 py-2 text-sm rounded-md transition-colors ${
                          signupData.organizationType === 'organization'
                            ? 'bg-white text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Organization
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First name
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={signupData.firstName}
                    onChange={handleSignupChange}
                    className="bg-card border-border"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last name
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={signupData.lastName}
                    onChange={handleSignupChange}
                    className="bg-card border-border"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium mb-2">
                  Email address
                </label>
                <Input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={signupData.email}
                  onChange={handleSignupChange}
                  className="bg-card border-border"
                />
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    name="password"
                    type={signupData.showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className="bg-card border-border"
                  />
                  <button 
                    type="button"
                    onClick={() => setSignupData(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-400 hover:text-gray-500"
                  >
                    {signupData.showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={signupData.showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    className="bg-card border-border"
                  />
                  <button 
                    type="button"
                    onClick={() => setSignupData(prev => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-400 hover:text-gray-500"
                  >
                    {signupData.showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={signupData.phone}
                  onChange={handleSignupChange}
                  className="bg-card border-border"
                  placeholder="9871512434"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-2">
                    City
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={signupData.city}
                    onChange={handleSignupChange}
                    className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
                    required
                  >
                    <option value="kathmandu">Kathmandu</option>
                    <option value="pokhara">Pokhara</option>
                    <option value="lalitpur">Lalitpur</option>
                    <option value="bhaktapur">Bhaktapur</option>
                    <option value="chitwan">Chitwan</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="area" className="block text-sm font-medium mb-2">
                    Area
                  </label>
                  <Input
                    id="area"
                    name="area"
                    type="text"
                    autoComplete="street-address"
                    required
                    placeholder="e.g., Kalanki, Thamel"
                    value={signupData.area}
                    onChange={handleSignupChange}
                    className="bg-card border-border"
                  />
                </div>
              </div>

              {/* Provider-specific fields */}
              {userType === 'provider' && (
                <>
                  <div>
                    <label htmlFor="serviceCategory" className="block text-sm font-medium mb-2">
                      Service Category
                    </label>
                    <select
                      id="serviceCategory"
                      name="serviceCategory"
                      value={signupData.serviceCategory}
                      onChange={handleSignupChange}
                      className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
                      required
                    >
                      <option value="" disabled>Select a category</option>
                      <option value="maintenance">Home Maintenance</option>
                      <option value="education">Education</option>
                      <option value="food">Food & Catering</option>
                      <option value="outdoor">Outdoor Services</option>
                      <option value="technology">Technology</option>
                      <option value="health">Health & Wellness</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                      Brief description of your services
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={signupData.description}
                      onChange={handleSignupChange}
                      className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex items-center mt-4">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-cityserve-pink focus:ring-cityserve-pink"
                  required
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsTermsModalOpen(true);
                    }}
                    className="font-medium text-cityserve-pink hover:text-cityserve-pink/90 underline"
                  >
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsPrivacyModalOpen(true);
                    }}
                    className="font-medium text-cityserve-pink hover:text-cityserve-pink/90 underline"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full ${
                  userType === 'provider' 
                    ? 'bg-cityserve-teal hover:bg-cityserve-teal/90' 
                    : 'bg-cityserve-pink hover:bg-cityserve-pink/90'
                } text-white mt-6`}
              >
                {isLoading 
                  ? 'Creating account...' 
                  : `Create ${userType === 'provider' ? 'Provider' : 'Customer'} Account`}
              </Button>
              
              {/* Social Login Options */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or sign up with
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => console.log('Google signup')}
                    className="bg-white hover:bg-gray-50 text-black flex items-center justify-center gap-2"
                  >
                    <Image
                      src="/images/google.svg"
                      alt="Google logo"
                      width={18}
                      height={18}
                      className="mr-1"
                    />
                    Google
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => console.log('Facebook signup')}
                    className="bg-white hover:bg-gray-50 text-black flex items-center justify-center gap-2"
                  >
                    <Image
                      src="/images/facebook.svg"
                      alt="Facebook logo"
                      width={18}
                      height={18}
                      className="mr-1"
                    />
                    Facebook
                  </Button>
                </div>
              </div>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 text-center text-sm text-muted-foreground pb-8">
          {activeTab === 'signup' && (
            <p>
              By signing up, you agree to our{' '}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setIsTermsModalOpen(true);
                }}
                className="font-medium text-cityserve-pink hover:text-cityserve-pink/90 underline"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsPrivacyModalOpen(true);
                }}
                className="font-medium text-cityserve-pink hover:text-cityserve-pink/90 underline"
              >
                Privacy Policy
              </button>
              .
            </p>
          )}
          <p>
            © {new Date().getFullYear()} CityServe. All rights reserved.
          </p>
        </CardFooter>
      </Card>
      
      {/* Terms of Service Modal */}
      <Modal 
        isOpen={isTermsModalOpen} 
        onClose={() => setIsTermsModalOpen(false)}
        title="Terms of Service"
      >
        <div className="prose prose-sm max-h-[70vh] overflow-y-auto px-4">
          <h1>Terms of Service</h1>
          <p>Last Updated: June 29, 2025</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using CityServe's services, you agree to be bound by these Terms of Service. If you do not agree
            to these terms, please do not use our services.
          </p>
          
          <h2>2. Description of Service</h2>
          <p>
            CityServe provides an online platform that connects users with local service providers. Our services include
            facilitating the discovery, communication, and payment between users and service providers.
          </p>
          
          <h2>3. User Accounts</h2>
          <p>
            To use certain features of our services, you must register for an account. You must provide accurate, current,
            and complete information during the registration process and keep your account information up-to-date.
          </p>
          
          {/* More terms content here... */}
        </div>
      </Modal>
      
      {/* Privacy Policy Modal */}
      <Modal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)}
        title="Privacy Policy"
      >
        <div className="prose prose-sm max-h-[70vh] overflow-y-auto px-4">
          <h1>Privacy Policy</h1>
          <p>Last Updated: June 29, 2025</p>
          
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy describes how CityServe collects, uses, and shares information about you when you use our services.
            We are committed to protecting your privacy and handling your data with transparency.
          </p>
          
          <h2>2. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, including personal information such as your name, email address, 
            phone number, and payment information when you register for an account or use our services.
          </p>
          
          {/* More privacy content here... */}
        </div>
      </Modal>
      </div>
    </div>
  )
}
