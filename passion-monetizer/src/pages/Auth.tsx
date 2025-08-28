import { useState } from 'react'
import { signInWithEmail, signUpWithEmail, signInWithProvider } from '../lib/auth'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (mode === 'signin') await signInWithEmail(email, password)
      else await signUpWithEmail(email, password)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h2 className="text-2xl font-semibold">{mode === 'signin' ? 'Sign in' : 'Create account'}</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-md border bg-transparent px-3 py-2"
          placeholder="you@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full rounded-md border bg-transparent px-3 py-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button disabled={loading} className="w-full rounded-md border px-3 py-2 hover:bg-foreground/5">
          {loading ? 'Please wait...' : mode === 'signin' ? 'Sign in' : 'Sign up'}
        </button>
      </form>
      <div className="flex gap-2">
        <button className="flex-1 rounded-md border px-3 py-2" onClick={() => signInWithProvider('google')}>Google</button>
        <button className="flex-1 rounded-md border px-3 py-2" onClick={() => signInWithProvider('github')}>GitHub</button>
      </div>
      <button
        className="text-sm text-foreground/70 underline"
        onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
      >
        {mode === 'signin' ? "Don't have an account? Sign up" : 'Have an account? Sign in'}
      </button>
    </div>
  )
}
