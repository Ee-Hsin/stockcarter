// src/api/axios.js
import axios from 'axios'
import { API_URL } from './constants'
import { auth } from '../firebase' // Ensure you import Firebase auth correctly

const API = axios.create({
  baseURL: API_URL,
})

// Interceptor to add User Token
API.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser
    if (user) {
      try {
        const token = await user.getIdToken()
        config.headers.Authorization = `Bearer ${token}`
      } catch (error) {
        console.error('Error getting ID token:', error)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// In extremely rare case where token expires between request and response
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true // Mark the request to avoid infinite retry loops
      const user = auth.currentUser
      if (user) {
        try {
          const newToken = await user.getIdToken(true)
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
          return API(originalRequest) // Retry the request with the new token
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError)
        }
      }
    }
    return Promise.reject(error)
  },
)

export default API
