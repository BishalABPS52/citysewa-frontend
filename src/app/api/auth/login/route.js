import { NextResponse } from 'next/server'

const BACKEND_URL = 'https://citysewa.onrender.com/api/login/'
const ENABLE_BACKEND = true // Enable backend connection

// Mock login for development when backend is not available
function mockLogin(credentials) {
  // Simple mock users for testing
  const mockUsers = [
    {
      id: 1,
      username: 'customer',
      email: 'customer@test.com',
      password: 'password',
      first_name: 'Customer',
      last_name: 'User',
      is_provider: false,
      contact: '1234567890',
      address: { city: 'kathmandu', area: 'thamel' },
      verified: true
    },
    {
      id: 2,
      username: 'provider',
      email: 'provider@test.com',
      password: 'password',
      first_name: 'Provider',
      last_name: 'User',
      is_provider: true,
      contact: '0987654321',
      address: { city: 'kathmandu', area: 'kalanki' },
      verified: false,
      bio: 'Professional service provider',
      serviceCategory: 'maintenance'
    }
  ]

  // Find user by email, username, or identifier
  const identifier = credentials.email || credentials.username || credentials.identifier
  const user = mockUsers.find(u => 
    u.email === identifier || 
    u.username === identifier
  )

  if (!user || user.password !== credentials.password) {
    return null // Invalid credentials
  }

  const mockToken = 'mock_token_' + btoa(user.email + '_' + Date.now())

  return {
    success: true,
    message: 'Login successful (Mock)',
    user: user,
    token: mockToken
  }
}

// Helper function to make requests to Django backend
async function makeBackendRequest(method, body = null, headers = {}) {
  try {
    const requestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }

    if (body) {
      requestOptions.body = JSON.stringify(body)
    }

    console.log('Making request to:', BACKEND_URL)
    console.log('Request body:', body)

    const djangoResponse = await fetch(BACKEND_URL, requestOptions)
    
    console.log('Django response status:', djangoResponse.status)
    
    let data
    try {
      data = await djangoResponse.json()
      console.log('Django response data:', data)
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError)
      const textResponse = await djangoResponse.text()
      console.log('Raw response:', textResponse)
      throw new Error('Invalid JSON response from server')
    }
    
    // Transform the response to include user data in expected format
    if (djangoResponse.ok && data.token) {
      // Handle your specific Django response format
      const transformedData = {
        token: data.token,
        user: {
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
          firstName: data.user.first_name,
          lastName: data.user.last_name,
          name: `${data.user.first_name} ${data.user.last_name}`,
          userType: data.user.is_provider ? 'provider' : 'customer',
          isProvider: data.user.is_provider,
          canAccessProvider: data.user.is_provider, // Only providers can access provider dashboard
          canAccessCustomer: true, // Everyone can access customer dashboard
          contact: data.user.contact,
          phone: data.user.contact,
          address: data.user.address,
          ...data.user
        },
        message: data.message || 'Login successful'
      }
      return NextResponse.json(transformedData, { status: djangoResponse.status })
    }
    
    return NextResponse.json(data, { status: djangoResponse.status })
  } catch (error) {
    console.error(`${method} Login API error:`, error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  const body = await request.json()
  
  console.log('Login API received:', body)
  
  // If backend is not available, use mock login
  if (!ENABLE_BACKEND) {
    console.log('Backend disabled, using mock login')
    const mockResult = mockLogin(body)
    
    if (!mockResult) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Transform mock result to match expected format
    const transformedData = {
      token: mockResult.token,
      user: {
        id: mockResult.user.id,
        username: mockResult.user.username,
        email: mockResult.user.email,
        firstName: mockResult.user.first_name,
        lastName: mockResult.user.last_name,
        name: `${mockResult.user.first_name} ${mockResult.user.last_name}`,
        userType: mockResult.user.is_provider ? 'provider' : 'customer',
        isProvider: mockResult.user.is_provider,
        canAccessProvider: mockResult.user.is_provider,
        canAccessCustomer: true,
        contact: mockResult.user.contact,
        phone: mockResult.user.contact,
        address: mockResult.user.address,
        verified: mockResult.user.verified,
        bio: mockResult.user.bio,
        description: mockResult.user.bio,
        serviceCategory: mockResult.user.serviceCategory,
        ...mockResult.user
      },
      message: mockResult.message
    }
    
    return NextResponse.json(transformedData, { status: 200 })
  }
  
  // Try different formats for the Django backend
  const formats = [
    { email: body.email, password: body.password }, // Try email field
    { username: body.email, password: body.password }, // Try username field
    { identifier: body.email, password: body.password }, // Try identifier field
    body // Use original body as is
  ]
  
  let lastError = null
  
  for (const format of formats) {
    try {
      console.log('Trying login format:', format)
      const result = await makeBackendRequest('POST', format)
      
      // If successful, return the result
      if (result.status === 200) {
        console.log('Login successful with format:', format)
        return result
      }
    } catch (error) {
      console.log('Login format failed:', format, error.message)
      lastError = error
    }
  }
  
  // If all formats failed, try the original makeBackendRequest function
  return makeBackendRequest('POST', body)
}

export async function GET(request) {
  // Get query parameters if needed
  const { searchParams } = new URL(request.url)
  const queryParams = Object.fromEntries(searchParams)
  
  return makeBackendRequest('GET', queryParams)
}

export async function PUT(request) {
  const body = await request.json()
  return makeBackendRequest('PUT', body)
}

export async function PATCH(request) {
  const body = await request.json()
  return makeBackendRequest('PATCH', body)
}

export async function DELETE(request) {
  // Get query parameters for DELETE if needed
  const { searchParams } = new URL(request.url)
  const queryParams = Object.fromEntries(searchParams)
  
  return makeBackendRequest('DELETE', queryParams)
}
