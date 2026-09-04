import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('storepulse_access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('storepulse_access_token')
      localStorage.removeItem('storepulse_user')
      window.dispatchEvent(new Event('storepulse:unauthorized'))
    }
    return Promise.reject(error)
  },
)
