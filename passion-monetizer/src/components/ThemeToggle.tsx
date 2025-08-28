import { useEffect } from 'react'
import { useTheme, initThemeFromStorage } from '../store/useTheme'

export default function ThemeToggle() {
  const theme = useTheme((s) => s.theme)
  const toggle = useTheme((s) => s.toggle)

  useEffect(() => { initThemeFromStorage() }, [])

  return (
    <button
      className="rounded-md border px-3 py-1 text-sm hover:bg-foreground/5"
      onClick={() => toggle()}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
