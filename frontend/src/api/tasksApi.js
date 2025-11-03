import axios from 'axios';
const BASE = (process.env.REACT_APP_API_BASE || process.env.VITE_API_BASE) || 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: BASE
});

export const fetchTasks = (params) => api.get('/tasks', { params });
export const fetchTask = (id) => api.get(`/tasks/${id}`);
export const createTask = (data) => api.post('/tasks', data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
