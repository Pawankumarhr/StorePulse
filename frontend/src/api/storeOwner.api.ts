import { axiosClient } from './axiosClient'
import type { ApiResponse } from './auth.api'

export interface OwnerDashboard {
  store: { id: number; name: string; email: string; address: string }
  averageRating: number
  totalRatings: number
  raters: { userId: number; name: string; email: string; rating: number; createdAt: string; updatedAt: string }[]
}

export const storeOwnerApi = {
  dashboard: () => axiosClient.get<ApiResponse<OwnerDashboard>>('/store-owner/dashboard'),
}
