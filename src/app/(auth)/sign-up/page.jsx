'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to the auth page with signup tab selected
    router.replace('/auth?tab=signup')
  }, [router])
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-muted-foreground">Redirecting to signup page...</p>
    </div>
  )
}
