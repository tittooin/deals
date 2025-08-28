import { create } from 'zustand'
import type { Session, User } from '@supabase/supabase-js'
import supabase from '../lib/supabaseClient'

type AuthState = {
  session: Session | null
  user: User | null
  initialized: boolean
  signOut: () => Promise<void>
}

export const useAuth = create<AuthState>(() => ({
  session: null,
  user: null,
  initialized: false,
  async signOut() {
    await supabase.auth.signOut()
  },
}))

export async function initAuthListener() {
  const { data } = await supabase.auth.getSession()
  useAuth.setState({ session: data.session, user: data.session?.user ?? null, initialized: true })
  supabase.auth.onAuthStateChange((_event, session) => {
    useAuth.setState({ session: session ?? null, user: session?.user ?? null, initialized: true })
  })
}
