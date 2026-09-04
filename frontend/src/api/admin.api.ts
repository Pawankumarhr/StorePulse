import { axiosClient } from './axiosClient'
import type { Role, User } from '../types'
import type { ApiResponse } from './auth.api'

export interface PaginationMeta { page: number; limit: number; total: number; totalPages: number }
export interface AdminQuery { name?: string; email?: string; address?: string; role?: Role; sortBy?: string; order?: 'ASC' | 'DESC'; page?: number; limit?: number }
export interface AdminUser extends User { createdAt: string; updatedAt: string }
export interface AdminStore { id: number; name: string; email: string; address: string; ownerId: number; owner: { id: number; name: string; email: string } | null; createdAt: string }
export interface UserDetail { user: AdminUser; ratings: { id: number; storeId: number; storeName: string; rating: number; createdAt: string; updatedAt: string }[] }
export interface Dashboard { totalUsers: number; totalStores: number; totalRatings: number; usersByRole: Partial<Record<Role, number>> }

const queryParams = (query: AdminQuery) => Object.fromEntries(Object.entries(query).filter(([, value]) => value !== undefined && value !== ''))

export const adminApi = {
  dashboard: () => axiosClient.get<ApiResponse<Dashboard>>('/admin/dashboard'),
  users: (query: AdminQuery) => axiosClient.get<ApiResponse<{ data: AdminUser[]; meta: PaginationMeta }>>('/admin/users', { params: queryParams(query) }),
  user: (id: number) => axiosClient.get<ApiResponse<UserDetail>>(`/admin/users/${id}`),
  stores: (query: AdminQuery) => axiosClient.get<ApiResponse<{ data: AdminStore[]; meta: PaginationMeta }>>('/admin/stores', { params: queryParams(query) }),
  createUser: (payload: { name: string; email: string; password: string; address: string; role: Role }) => axiosClient.post<ApiResponse<AdminUser>>('/admin/users', payload),
  createStore: (payload: { name: string; email: string; address: string; ownerId: number }) => axiosClient.post<ApiResponse<AdminStore>>('/admin/stores', payload),
}
