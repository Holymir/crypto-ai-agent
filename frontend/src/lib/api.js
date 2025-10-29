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

  // Sentiment Analysis
  getSentimentStats: (params) => apiClient.get('/sentiment/stats', { params }),
  getSentimentTrend: (hours = null, days = 7, granularity = 'daily') => {
    const params = new URLSearchParams();
    if (hours !== null) {
      params.append('hours', hours);
    } else {
      params.append('days', days);
    }
    params.append('granularity', granularity);
    return apiClient.get(`/sentiment/trend?${params.toString()}`);
  },
  getTopSources: (days = 7, limit = 5) => apiClient.get('/sentiment/sources', { params: { days, limit } }),

  // Extended AI Analysis Stats
  getAssetStats: (days = 7, limit = 10) => apiClient.get('/sentiment/assets', { params: { days, limit } }),
  getCategoryStats: (days = 7, limit = 10) => apiClient.get('/sentiment/categories', { params: { days, limit } }),
  getChainStats: (days = 7, limit = 10) => apiClient.get('/sentiment/chains', { params: { days, limit } }),
  getTrendingKeywords: (days = 7, limit = 10) => apiClient.get('/sentiment/keywords', { params: { days, limit } }),
};

export default apiClient;
