import axios, { AxiosInstance } from 'axios'
import { API_URL } from './constants'

const API: AxiosInstance = axios.create({ baseURL: API_URL })

export default API
