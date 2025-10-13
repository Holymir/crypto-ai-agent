import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export const useArticles = (params) => {
  return useQuery({
    queryKey: ['articles', params],
    queryFn: async () => {
      const response = await api.getArticles(params);
      return response.data;
    },
  });
};

export const useLatestArticles = (limit = 10) => {
  return useQuery({
    queryKey: ['articles', 'latest', limit],
    queryFn: async () => {
      const response = await api.getLatestArticles(limit);
      return response.data;
    },
  });
};

export const useSentimentStats = (params) => {
  return useQuery({
    queryKey: ['stats', 'sentiment', params],
    queryFn: async () => {
      const response = await api.getSentimentStats(params);
      return response.data;
    },
  });
};

export const useSentimentTrend = (days = 7) => {
  return useQuery({
    queryKey: ['stats', 'trend', days],
    queryFn: async () => {
      const response = await api.getSentimentTrend(days);
      return response.data;
    },
  });
};
