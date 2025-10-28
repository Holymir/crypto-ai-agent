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
  getSentimentTrend: (hours = null, days = 7, granularity = 'daily') => {
    const params = new URLSearchParams();
    if (hours !== null) {
      params.append('hours', hours);
    } else {
      params.append('days', days);
    }
    params.append('granularity', granularity);
    return apiClient.get(`/stats/trend?${params.toString()}`);
  },
  getTopSources: (days = 7, limit = 5) => apiClient.get('/stats/sources', { params: { days, limit } }),

  // Extended AI Analysis Stats
  getAssetStats: (days = 7, limit = 10) => apiClient.get('/stats/assets', { params: { days, limit } }),
  getCategoryStats: (days = 7, limit = 10) => apiClient.get('/stats/categories', { params: { days, limit } }),
  getChainStats: (days = 7, limit = 10) => apiClient.get('/stats/chains', { params: { days, limit } }),
  getTrendingKeywords: (days = 7, limit = 10) => apiClient.get('/stats/keywords', { params: { days, limit } }),
};

export default apiClient;
