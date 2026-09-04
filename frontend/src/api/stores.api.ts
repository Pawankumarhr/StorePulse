import { axiosClient } from './axiosClient'
import type { ApiResponse } from './auth.api'

export interface Store { id: number; name: string; email: string; address: string; averageRating: number; userRating: number | null; createdAt: string }
export interface StoreQuery { name?: string; address?: string; sortBy?: 'name' | 'address' | 'createdAt' | 'averageRating'; order?: 'ASC' | 'DESC'; page?: number; limit?: number }
export interface PaginationMeta { page: number; limit: number; total: number; totalPages: number }

const queryParams = (query: StoreQuery) => Object.fromEntries(Object.entries(query).filter(([, value]) => value !== undefined && value !== ''))

export const storesApi = {
  list: (query: StoreQuery) => axiosClient.get<ApiResponse<{ data: Store[]; meta: PaginationMeta }>>('/stores', { params: queryParams(query) }),
  submitRating: (storeId: number, rating: number) => axiosClient.post<ApiResponse<{ message: string; rating: { rating: number } }>>(`/stores/${storeId}/ratings`, { rating }),
  updateRating: (storeId: number, rating: number) => axiosClient.patch<ApiResponse<{ message: string; rating: { rating: number } }>>(`/stores/${storeId}/ratings`, { rating }),
}
