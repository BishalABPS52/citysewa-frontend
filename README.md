This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Cityसेवा Features

Cityसेवा is a platform connecting customers with local service providers. Key features include:

### 1. User Profiles
- Consistent user profile cards for both providers and customers
- Profile ratings, booking history, availability status
- Direct messaging functionality
- Profile pages accessible at `/dashboard/user/[id]` and `/dashboard/provider/user/[id]`

### 2. Search & Booking
- Advanced search with live suggestions for services
- Booking confirmation dialog
- Filter by category, location, price range
- Sort by rating, price, or reviews

### 3. Payment Methods
- Integration with local payment services (eSewa, Khalti)
- Generic bank card option
- Secure payment display (no sensitive details shown)

### 4. Navigation & Authentication
- Smart redirection based on user type
- Logo click redirects to appropriate dashboard for logged-in users
- Session persistence across page refreshes

## Recent Updates

### User Profiles
- Created reusable `UserProfileCard` component
- Integrated user profiles across messages and booking pages
- Added profile access from calendar and message views

### Search Functionality
- Implemented `SearchSuggestions` component with live service suggestions
- Added booking confirmation dialog
- Fixed and optimized `SearchSection` component to eliminate errors
- Created test page at `/search-test` to verify functionality

### Payment Methods
- Added SVG logos for eSewa, Khalti, and bank cards
- Updated payment methods UI to use local payment options
- Removed display of sensitive payment information

### Navigation Improvements
- Updated `LogoAnimation` to redirect users based on login state
- Enhanced user experience with contextual navigation

## Testing

You can test the new search functionality by visiting `/search-test`. This page demonstrates the integration of search suggestions and the booking confirmation flow.
