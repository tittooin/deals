import { useState } from 'react'

export default function NotificationsBell() {
  const [count] = useState(0)
  return (
    <button className="relative h-9 w-9 rounded-full border hover:bg-foreground/5" aria-label="Notifications">
      <span className="absolute right-1 top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
        {count}
      </span>
      <span className="sr-only">Notifications</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mx-auto h-5 w-5">
        <path d="M12 2a7 7 0 00-7 7v3.586L3.293 16.293A1 1 0 004 18h16a1 1 0 00.707-1.707L19 12.586V9a7 7 0 00-7-7zm0 20a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
      </svg>
    </button>
  )
}
