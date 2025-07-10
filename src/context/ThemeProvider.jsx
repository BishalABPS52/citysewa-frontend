'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// Create theme context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  // Set theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('cityserve-theme')
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }
  }, [])

  // Update document class and localStorage when theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('cityserve-theme', theme)
    
    // Update CSS variables for custom colors
    if (theme === 'light') {
      document.documentElement.style.setProperty('--custom-background', '#f2f8fc')
      document.documentElement.style.setProperty('--custom-accent', '#ff3131')
    } else {
      document.documentElement.style.setProperty('--custom-background', '#000302')
      document.documentElement.style.setProperty('--custom-accent', '#ff3131')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook for using theme
export const useTheme = () => useContext(ThemeContext)
