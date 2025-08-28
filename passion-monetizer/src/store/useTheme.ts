import { create } from 'zustand'

type ThemeState = {
  theme: 'light' | 'dark'
  toggle: () => void
  set: (value: 'light' | 'dark') => void
}

export const useTheme = create<ThemeState>((set, get) => ({
  theme: (localStorage.getItem('pm_theme') as 'light' | 'dark') || 'light',
  toggle: () => get().set(get().theme === 'light' ? 'dark' : 'light'),
  set: (value) => {
    localStorage.setItem('pm_theme', value)
    const root = document.documentElement
    if (value === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    set({ theme: value })
  },
}))

export function initThemeFromStorage() {
  const stored = (localStorage.getItem('pm_theme') as 'light' | 'dark') || 'light'
  const root = document.documentElement
  if (stored === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}
