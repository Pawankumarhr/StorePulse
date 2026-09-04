import { axiosClient } from './axiosClient'
import type { AuthResponse } from '../types'

export interface ApiResponse<T> {
  success: boolean
  data: T
  timestamp: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  name: string
  email: string
  password: string
  address: string
}

export const authApi = {
  login: (payload: LoginPayload) => axiosClient.post<ApiResponse<AuthResponse>>('/auth/login', payload),
  signup: (payload: SignupPayload) => axiosClient.post<ApiResponse<AuthResponse>>('/auth/signup', payload),
  updatePassword: (payload: { currentPassword: string; newPassword: string }) =>
    axiosClient.patch('/auth/update-password', payload),
}
