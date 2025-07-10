import { NextResponse } from 'next/server';

// Define paths that require authentication
const AUTH_PATHS = [
  '/user-dashboard',
  '/provider-dashboard',
  '/bookings',
  '/profile',
  '/my-services',
  '/settings',
];

// Define paths that are public but have auth state
const PUBLIC_AUTH_PATHS = [
  '/login',
  '/register',
];

export default function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Get the token from cookies
  const token = request.cookies.get('auth_token')?.value;
  
  // Check if the path requires authentication
  const isAuthPath = AUTH_PATHS.some(path => 
    pathname.startsWith(path)
  );
  
  // Check if the path is a public auth path (login/register)
  const isPublicAuthPath = PUBLIC_AUTH_PATHS.some(path => 
    pathname.startsWith(path)
  );
  
  // If path requires authentication and user is not logged in
  if (isAuthPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If user is logged in and trying to access login/register pages
  if (isPublicAuthPath && token) {
    return NextResponse.redirect(new URL('/user-dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Configure the paths that trigger the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (/api/*)
     * - static files (/_next/*)
     * - public files (/public/*)
     * - favicon.ico
     */
    '/((?!api|_next|public|favicon.ico).*)',
  ],
};
