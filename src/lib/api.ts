import axios from 'axios';

// Always use the full backend URL for both server and client
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance with CORS-compatible settings
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for image processing
  withCredentials: false, // Don't send credentials for CORS requests (unless needed)
  headers: {
    'Content-Type': 'application/json'
  }
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

  update: (id: string, product: any) =>
    api.put(`/api/products/${id}`, product),

  delete: (id: string) =>
    api.delete(`/api/products/${id}`),
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