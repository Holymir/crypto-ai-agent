import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Health check
  health: () => apiClient.get('/health'),

  // Articles
  getArticles: (params) => apiClient.get('/articles', { params }),
  getLatestArticles: (limit = 10) => apiClient.get(`/articles/latest?limit=${limit}`),
  getArticleById: (id) => apiClient.get(`/articles/${id}`),

  // Stats
  getSentimentStats: (params) => apiClient.get('/stats/sentiment', { params }),
  getSentimentTrend: (days = 7) => apiClient.get(`/stats/trend?days=${days}`),
};

export default apiClient;
