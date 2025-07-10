import { NextResponse } from 'next/server'

const BACKEND_URL = 'https://citysewa.onrender.com/api/profile/'
const ENABLE_BACKEND = true // Enable backend connection

// Mock profile data storage (in production this would be a database)
let mockProfiles = new Map()

// Mock profile functionality for development
function getMockProfile(token) {
  return mockProfiles.get(token) || null
}

function updateMockProfile(token, profileData) {
  const existing = mockProfiles.get(token) || {}
  const updated = { ...existing, ...profileData, updated_at: new Date().toISOString() }
  mockProfiles.set(token, updated)
  return updated
}

// Helper function to make requests to Django backend
async function makeBackendRequest(method, headers = {}, body = null) {
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

    console.log(`Making ${method} request to ${BACKEND_URL}`, { 
      headers: Object.keys(headers), 
      body: body ? JSON.stringify(body) : null 
    })

    const djangoResponse = await fetch(BACKEND_URL, requestOptions)
    
    // Check if response is JSON
    const contentType = djangoResponse.headers.get('content-type')
    let data
    
    try {
      if (contentType && contentType.includes('application/json')) {
        data = await djangoResponse.json()
      } else {
        const textData = await djangoResponse.text()
        console.log('Non-JSON response:', textData)
        throw new Error('Invalid JSON response from backend')
      }
    } catch (parseError) {
      console.error('Failed to parse response:', parseError)
      return NextResponse.json(
        { message: 'Invalid response from backend server' },
        { status: 502 }
      )
    }
    
    console.log(`Backend response (${method}):`, { 
      status: djangoResponse.status, 
      ok: djangoResponse.ok, 
      data 
    })
    
    // Transform the response to include user data in expected format
    if (djangoResponse.ok && data) {
      const transformedData = {
        user: {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name,
          name: data.username || `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          userType: data.is_provider ? 'provider' : 'customer',
          isProvider: data.is_provider,
          canAccessProvider: data.is_provider,
          canAccessCustomer: true,
          contact: data.contact,
          phone: data.contact,
          address: data.address,
          bio: data.bio,
          experience_years: data.experience_years,
          verified: data.verified,
          document_category: data.document_category,
          document_id: data.document_id,
          document_file_url: data.document_file_url,
          serviceCategory: data.service_category,
          description: data.description,
          isOrganization: data.is_organization,
          organizationName: data.organization_name,
          taxId: data.tax_id,
          joinedDate: data.date_joined,
          lastLogin: data.last_login,
          ...data
        },
        message: data.message || (method === 'GET' ? 'Profile fetched successfully' : 'Profile updated successfully')
      }
      return NextResponse.json(transformedData, { status: djangoResponse.status })
    }
    
    // Handle error responses from Django
    return NextResponse.json(
      { 
        message: data.message || data.error || 'Backend request failed',
        details: data 
      }, 
      { status: djangoResponse.status }
    )
  } catch (error) {
    console.error(`${method} Profile API error:`, error)
    return NextResponse.json(
      { 
        message: 'Failed to connect to backend server',
        error: error.message 
      },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  // Get authorization header
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { message: 'Authorization token required' },
      { status: 401 }
    )
  }

  const token = authHeader.replace('Bearer ', '')
  console.log('Profile GET request with token:', token ? 'Present' : 'Missing')

  // If backend is not available, use mock profile
  if (!ENABLE_BACKEND) {
    console.log('Backend disabled, using mock profile')
    
    // For mock, extract user info from localStorage or return basic profile
    const mockProfile = getMockProfile(token)
    
    // Create a basic user profile from token (in real app this would come from database)
    const basicProfile = {
      id: 1,
      username: 'user',
      email: 'user@example.com',
      first_name: 'Test',
      last_name: 'User',
      is_provider: false,
      contact: '1234567890',
      address: { city: 'kathmandu', area: 'thamel' },
      verified: false,
      bio: 'This is a test user profile',
      ...mockProfile
    }
    
    return NextResponse.json({ 
      success: true,
      user: basicProfile
    }, { status: 200 })
  }

  const headers = {
    'Authorization': authHeader
  }
  
  // Try the profile endpoint first
  const result = await makeBackendRequest('GET', headers)
  
  // If profile endpoint returns 404, try to get user data from a different endpoint
  if (result.status === 404) {
    console.log('Profile endpoint not found, trying user endpoint...')
    
    // Try different possible endpoints
    const userEndpoints = [
      'https://citysewa.onrender.com/api/user/',
      'https://citysewa.onrender.com/api/auth/user/'
    ]
    
    for (const endpoint of userEndpoints) {
      try {
        const userResponse = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
          }
        })
        
        if (userResponse.ok) {
          const userData = await userResponse.json()
          console.log('Found user data from:', endpoint, userData)
          
          // Transform the response to match our expected format
          const transformedData = {
            user: {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              firstName: userData.first_name,
              lastName: userData.last_name,
              name: userData.username || `${userData.first_name || ''} ${userData.last_name || ''}`.trim(),
              userType: userData.is_provider ? 'provider' : 'customer',
              isProvider: userData.is_provider,
              canAccessProvider: userData.is_provider,
              canAccessCustomer: true,
              contact: userData.contact,
              phone: userData.contact,
              address: userData.address,
              bio: userData.bio,
              experience_years: userData.experience_years,
              verified: userData.verified,
              document_category: userData.document_category,
              document_id: userData.document_id,
              document_file_url: userData.document_file_url,
              serviceCategory: userData.service_category,
              description: userData.description,
              isOrganization: userData.is_organization,
              organizationName: userData.organization_name,
              taxId: userData.tax_id,
              joinedDate: userData.date_joined,
              lastLogin: userData.last_login,
              ...userData
            },
            message: 'Profile fetched successfully'
          }
          
          return NextResponse.json(transformedData, { status: 200 })
        }
      } catch (error) {
        console.log('Failed to fetch from', endpoint, error.message)
        continue
      }
    }
    
    // If all endpoints fail, return the original 404 result
    return result
  }
  
  return result
}

export async function PUT(request) {
  // Get authorization header
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { message: 'Authorization token required' },
      { status: 401 }
    )
  }

  const body = await request.json()
  const headers = {
    'Authorization': authHeader
  }
  
  return makeBackendRequest('PUT', headers, body)
}

export async function PATCH(request) {
  // Get authorization header
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { message: 'Authorization token required' },
      { status: 401 }
    )
  }

  const body = await request.json()
  const token = authHeader.replace('Bearer ', '')
  
  console.log('PATCH Profile - received data:', body)
  
  // If backend is not available, use mock profile update
  if (!ENABLE_BACKEND) {
    console.log('Backend disabled, using mock profile update')
    
    const updatedProfile = updateMockProfile(token, body)
    
    return NextResponse.json({ 
      success: true,
      message: 'Profile updated successfully (Mock)',
      user: updatedProfile
    }, { status: 200 })
  }

  const headers = {
    'Authorization': authHeader
  }
  
  // Try the profile endpoint first
  const result = await makeBackendRequest('PATCH', headers, body)
  
  // If profile endpoint returns 404, try to update user data via a different endpoint
  if (result.status === 404) {
    console.log('Profile PATCH endpoint not found, trying user endpoints...')
    
    // Try different possible endpoints for user update
    const userUpdateEndpoints = [
      'https://citysewa.onrender.com/api/user/',
      'https://citysewa.onrender.com/api/auth/user/',
      'https://citysewa.onrender.com/api/me/'
    ]
    
    for (const endpoint of userUpdateEndpoints) {
      try {
        console.log('Trying PATCH to:', endpoint)
        const userResponse = await fetch(endpoint, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
          },
          body: JSON.stringify(body)
        })
        
        if (userResponse.ok) {
          const userData = await userResponse.json()
          console.log('Profile updated successfully via:', endpoint, userData)
          
          // Transform the response to match our expected format
          const transformedData = {
            user: {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              firstName: userData.first_name,
              lastName: userData.last_name,
              name: userData.username || `${userData.first_name || ''} ${userData.last_name || ''}`.trim(),
              userType: userData.is_provider ? 'provider' : 'customer',
              isProvider: userData.is_provider,
              canAccessProvider: userData.is_provider,
              canAccessCustomer: true,
              contact: userData.contact,
              phone: userData.contact,
              address: userData.address,
              bio: userData.bio,
              experience_years: userData.experience_years,
              verified: userData.verified,
              document_category: userData.document_category,
              document_id: userData.document_id,
              document_file_url: userData.document_file_url,
              serviceCategory: userData.service_category,
              description: userData.description,
              isOrganization: userData.is_organization,
              organizationName: userData.organization_name,
              taxId: userData.tax_id,
              joinedDate: userData.date_joined,
              lastLogin: userData.last_login,
              ...userData
            },
            message: 'Profile updated successfully'
          }
          
          return NextResponse.json(transformedData, { status: 200 })
        } else {
          const errorData = await userResponse.json()
          console.log('Failed to update via', endpoint, 'Status:', userResponse.status, 'Error:', errorData)
        }
      } catch (error) {
        console.log('Failed to update via', endpoint, error.message)
        continue
      }
    }
    
    // If all endpoints fail, return a custom error message
    return NextResponse.json(
      { 
        message: 'Profile update endpoint not available on backend server',
        details: 'The backend may not support profile updates or the user profile may not exist'
      }, 
      { status: 404 }
    )
  }
  
  return result
}

export async function POST(request) {
  // Get authorization header
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { message: 'Authorization token required' },
      { status: 401 }
    )
  }

  const body = await request.json()
  const headers = {
    'Authorization': authHeader
  }
  
  console.log('POST Profile - received data:', body)
  
  // Try the profile endpoint first
  const result = await makeBackendRequest('POST', headers, body)
  
  // If profile endpoint returns 404 or 405, try to update user data via a different endpoint
  if (result.status === 404 || result.status === 405) {
    console.log('Profile POST endpoint not found/allowed, trying user endpoints...')
    
    // Try different possible endpoints for user update
    const userUpdateEndpoints = [
      'https://citysewa.onrender.com/api/user/',
      'https://citysewa.onrender.com/api/auth/user/',
      'https://citysewa.onrender.com/api/me/'
    ]
    
    for (const endpoint of userUpdateEndpoints) {
      try {
        // Try POST first
        console.log('Trying POST to:', endpoint)
        let userResponse = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
          },
          body: JSON.stringify(body)
        })
        
        // If POST fails with 405, try PATCH
        if (!userResponse.ok && userResponse.status === 405) {
          console.log('POST not allowed, trying PATCH to:', endpoint)
          userResponse = await fetch(endpoint, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader
            },
            body: JSON.stringify(body)
          })
        }
        
        if (userResponse.ok) {
          const userData = await userResponse.json()
          console.log('Profile updated successfully via:', endpoint, userData)
          
          // Transform the response to match our expected format
          const transformedData = {
            user: {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              firstName: userData.first_name,
              lastName: userData.last_name,
              name: userData.username || `${userData.first_name || ''} ${userData.last_name || ''}`.trim(),
              userType: userData.is_provider ? 'provider' : 'customer',
              isProvider: userData.is_provider,
              canAccessProvider: userData.is_provider,
              canAccessCustomer: true,
              contact: userData.contact,
              phone: userData.contact,
              address: userData.address,
              bio: userData.bio,
              experience_years: userData.experience_years,
              verified: userData.verified,
              document_category: userData.document_category,
              document_id: userData.document_id,
              document_file_url: userData.document_file_url,
              serviceCategory: userData.service_category,
              description: userData.description,
              isOrganization: userData.is_organization,
              organizationName: userData.organization_name,
              taxId: userData.tax_id,
              joinedDate: userData.date_joined,
              lastLogin: userData.last_login,
              ...userData
            },
            message: 'Profile updated successfully'
          }
          
          return NextResponse.json(transformedData, { status: 200 })
        } else {
          const errorData = await userResponse.json()
          console.log('Failed to update via', endpoint, 'Status:', userResponse.status, 'Error:', errorData)
        }
      } catch (error) {
        console.log('Failed to update via', endpoint, error.message)
        continue
      }
    }
    
    // If all endpoints fail, return a custom error message
    return NextResponse.json(
      { 
        message: 'Profile update endpoint not available on backend server',
        details: 'The backend may not support profile updates or the user profile may not exist'
      }, 
      { status: 404 }
    )
  }
  
  return result
}
