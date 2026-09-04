import { createContext } from 'react'
import type { AuthResponse, User } from '../types'

export interface AuthContextValue {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  signIn: (response: AuthResponse) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
