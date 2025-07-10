'use client'

import { useTheme } from '@/context/ThemeProvider'

export default function TestThemePage() {
  const { theme } = useTheme()
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-accent-custom">
        Current Theme: {theme === 'dark' ? 'Dark' : 'Light'} Mode
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <div className="p-8 rounded-lg bg-card shadow-lg">
          <h2 className="text-2xl font-semibold text-cityserve-pink mb-4">Default Card</h2>
          <p className="text-foreground">
            This card uses the default theme colors that adjust automatically based on the theme.
          </p>
        </div>
        
        <div className="p-8 rounded-lg bg-custom shadow-lg">
          <h2 className="text-2xl font-semibold text-accent-custom mb-4">Custom Colors Card</h2>
          <p className="text-foreground">
            This card uses our custom background color (#f2f8fc in light mode and #000302 in dark mode).
          </p>
        </div>
        
        <div className="p-8 rounded-lg bg-accent-custom text-white shadow-lg col-span-1 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Accent Color Card</h2>
          <p>
            This card uses our accent color (#ff3131) which stays the same in both themes.
          </p>
        </div>
      </div>
      
      <p className="mt-8 text-muted-foreground">
        Click the floating button in the bottom right corner to toggle the theme.
      </p>
    </div>
  )
}
