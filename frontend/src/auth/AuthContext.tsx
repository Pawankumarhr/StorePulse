import { useEffect, useState, type ReactNode } from 'react'
import type { AuthResponse, User } from '../types'
import { AuthContext } from './auth.context'
const TOKEN_KEY = 'storepulse_access_token'
const USER_KEY = 'storepulse_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(USER_KEY)
    return storedUser ? JSON.parse(storedUser) as User : null
  })

  const signIn = (response: AuthResponse) => {
    localStorage.setItem(TOKEN_KEY, response.accessToken)
    localStorage.setItem(USER_KEY, JSON.stringify(response.user))
    setToken(response.accessToken)
    setUser(response.user)
  }

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    const handleUnauthorized = () => signOut()
    window.addEventListener('storepulse:unauthorized', handleUnauthorized)
    return () => window.removeEventListener('storepulse:unauthorized', handleUnauthorized)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: Boolean(token && user), signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

