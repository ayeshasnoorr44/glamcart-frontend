import axios from 'axios';

const isServer = typeof window === 'undefined';
// In production client-side, we use relative paths to trigger Next.js rewrites (avoiding Mixed Content)
// In server-side or development, we use the full URL
const API_BASE_URL = isServer 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000')
  : (process.env.NODE_ENV === 'production' ? '' : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'));

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for image processing
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;

// API functions
export const productsAPI = {
  getAll: (params?: { category?: string; brand?: string }) =>
    api.get('/api/products', { params }),

  getById: (id: string) =>
    api.get(`/api/products/${id}`),

  create: (product: any) =>
    api.post('/api/products', product),
};

export const tryOnAPI = {
  applyLipstick: (formData: FormData) =>
    api.post('/api/try-on/apply', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

export const cartAPI = {
  getCart: (userId: string) =>
    api.get(`/api/cart/${userId}`),

  addToCart: (userId: string, item: { productId: string; colorHex: string; quantity: number }) =>
    api.post(`/api/cart/${userId}/add`, item),

  removeFromCart: (userId: string, productId: string) =>
    api.delete(`/api/cart/${userId}/${productId}`),
};