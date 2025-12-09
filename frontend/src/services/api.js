import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data) => api.post('/api/auth/signup', data),
  login: (data) => api.post('/api/auth/login', data)
};

export const eventsAPI = {
  getAll: (params) => api.get('/api/events', { params }),
  getById: (id) => api.get(`/api/events/${id}`),
  create: (data) => api.post('/api/events', data),
  update: (id, data) => api.put(`/api/events/${id}`, data),
  delete: (id) => api.delete(`/api/events/${id}`)
};

export const bookingsAPI = {
  create: (data) => api.post('/api/bookings', data),
  getMyBookings: () => api.get('/api/bookings/my-bookings'),
  getEventBookings: (eventId) => api.get(`/api/bookings/event/${eventId}`),
  cancel: (eventId) => api.delete(`/api/bookings/${eventId}`)
};

export default api;
