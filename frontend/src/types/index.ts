export type Role = 'ADMIN' | 'NORMAL_USER' | 'STORE_OWNER'

export interface User {
  id: number
  name: string
  email: string
  address: string
  role: Role
}

export interface AuthResponse {
  accessToken: string
  user: User
}
