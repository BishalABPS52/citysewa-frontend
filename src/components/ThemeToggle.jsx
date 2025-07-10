'use client'

import { useTheme } from '@/context/ThemeProvider'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {showTooltip && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-full mb-2 right-0 bg-card text-card-foreground px-3 py-1 rounded-md text-sm font-medium shadow-lg whitespace-nowrap"
        >
          Toggle Theme
          <div className="absolute top-full right-4 -mt-1 w-2 h-2 bg-card rotate-45"></div>
        </motion.div>
      )}
      
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg overflow-hidden relative"
        aria-label="Toggle theme"
      >
        <div className={`absolute inset-0 transition-all duration-500 ${
          theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
          : 'bg-gradient-to-br from-blue-50 to-blue-100'
        }`}></div>

        {/* Sun and Moon container */}
        <div className="relative z-10">
          {theme === 'dark' ? (
            <motion.div
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 relative"
            >
              {/* Moon */}
              <div className="w-6 h-6 rounded-full bg-gray-200 absolute right-0 shadow-inner"></div>
              <div className="w-5 h-5 rounded-full bg-gray-900 absolute right-1 top-0 shadow-inner"></div>
              
              {/* Stars */}
              <div className="w-1 h-1 rounded-full bg-white absolute left-0 top-1"></div>
              <div className="w-1 h-1 rounded-full bg-white absolute left-2 top-3"></div>
              <div className="w-0.5 h-0.5 rounded-full bg-white absolute left-1 bottom-1"></div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-7 h-7 relative"
            >
              {/* Sun */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg"></div>
              
              {/* Sun rays */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 + (i * 0.05), duration: 0.3 }}
                  style={{ 
                    position: 'absolute',
                    width: '2px',
                    height: '6px',
                    background: '#ff3131',
                    left: '50%',
                    top: '50%',
                    transformOrigin: '0 0',
                    transform: `rotate(${i * 45}deg) translate(-50%, -50%)`,
                    marginLeft: Math.sin(i * 45 * Math.PI / 180) * 10,
                    marginTop: Math.cos(i * 45 * Math.PI / 180) * 10
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>
        
        {/* Ripple effect on click */}
        <div className="absolute inset-0 bg-black opacity-0 group-active:opacity-10 rounded-full transition-opacity" />
      </button>
    </motion.div>
  )
}
