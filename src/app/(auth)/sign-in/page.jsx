'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to the auth page with login tab selected
    router.replace('/auth')
  }, [router])
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-muted-foreground">Redirecting to login page...</p>
    </div>
  )
}
