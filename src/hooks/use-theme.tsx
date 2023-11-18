import { useEffect, useState } from 'react'

interface ThemeProps {
  theme: string
  isDark: boolean
  toggleTheme: () => void
}

const getTheme = () => {
  const storedTheme = localStorage.getItem('theme')
  const preferredIsDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches

  if (storedTheme) return storedTheme
  if (preferredIsDark) return 'dark'

  return 'light'
}

export const useTheme = (): ThemeProps => {
  const [theme, setTheme] = useState(getTheme)
  const isDark = theme === 'dark'

  useEffect(() => {
    const root = window.document.documentElement

    isDark ? root.classList.add('dark') : root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [isDark, theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return { theme, isDark, toggleTheme }
}
