import ThemeToggle from './ThemeToggle'
import NotificationsBell from './NotificationsBell'

export default function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="container flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold">Passion Monetizer</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search articles, users, deals"
            className="h-9 w-64 rounded-md border bg-transparent px-3 text-sm outline-none"
          />
          <NotificationsBell />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
