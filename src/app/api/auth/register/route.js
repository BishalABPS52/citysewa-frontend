import { NextResponse } from 'next/server'

const BACKEND_URL = 'https://citysewa.onrender.com/api/register/'
const ENABLE_BACKEND = true // Enable backend connection

// Mock registration for development when backend is not available
function mockRegistration(userData) {
  // Simulate successful registration
  const mockUser = {
    id: Math.floor(Math.random() * 1000) + 1,
    username: userData.email.split('@')[0],
    email: userData.email,
    first_name: userData.first_name,
    last_name: userData.last_name,
    is_provider: userData.is_provider,
    contact: userData.contact,
    address: userData.address,
    verified: false,
    created_at: new Date().toISOString()
  }

  const mockToken = 'mock_token_' + btoa(userData.email + '_' + Date.now())

  return {
    success: true,
    message: 'Registration successful (Mock)',
    user: mockUser,
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
    console.log('Django response headers:', Object.fromEntries(djangoResponse.headers.entries()))
    
    let data
    try {
      const responseText = await djangoResponse.text()
      console.log('Raw response:', responseText)
      
      // Try to parse as JSON
      data = JSON.parse(responseText)
      console.log('Parsed Django response data:', data)
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError)
      console.log('Response was not valid JSON, likely HTML error page')
      
      // If it's an HTML response, it's likely an error from the server
      return NextResponse.json({
        success: false,
        message: `Server error: Expected JSON but received HTML. Backend may be down or endpoint not found.`,
        error: 'BACKEND_ERROR',
        details: {
          status: djangoResponse.status,
          statusText: djangoResponse.statusText,
          url: BACKEND_URL
        }
      }, { status: 502 }) // Bad Gateway
    }
    
    // For registration, just pass through the response with minimal transformation
    if (djangoResponse.ok) {
      return NextResponse.json({
        success: true,
        message: data.message || 'Registration successful',
        ...data
      }, { status: djangoResponse.status })
    }
    
    // Handle error responses
    return NextResponse.json({
      success: false,
      message: data.message || data.error || 'Registration failed',
      errors: data.errors || data
    }, { status: djangoResponse.status })
    
  } catch (error) {
    console.error(`${method} Register API error:`, error)
    return NextResponse.json(
      { 
        success: false,
        message: error.message || 'Internal server error',
        error: error.toString()
      },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    console.log('Received signup data:', body)
    
    // Transform frontend data to exact backend format
    const backendData = {
      email: body.email,
      first_name: body.firstName || body.first_name,
      last_name: body.lastName || body.last_name,
      is_provider: body.isProvider || body.is_provider || false,
      contact: body.phone || body.contact,
      address: {
        city: body.city || body.address?.city || 'kathmandu',
        area: body.area || body.address?.area || body.address
      },
      password: body.password
    }
    
    console.log('Sending to Django backend:', backendData)
    
    // If backend is not available, use mock registration
    if (!ENABLE_BACKEND) {
      console.log('Backend disabled, using mock registration')
      const mockResult = mockRegistration(backendData)
      return NextResponse.json(mockResult, { status: 200 })
    }
    
    return makeBackendRequest('POST', backendData)
  } catch (error) {
    console.error('POST register error:', error)
    return NextResponse.json(
      { message: 'Invalid request data', error: error.message },
      { status: 400 }
    )
  }
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
