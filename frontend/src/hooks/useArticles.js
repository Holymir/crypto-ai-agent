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

export const useSentimentTrend = (hours = null, days = 7, granularity = 'daily') => {
  return useQuery({
    queryKey: ['stats', 'trend', hours, days, granularity],
    queryFn: async () => {
      const response = await api.getSentimentTrend(hours, days, granularity);
      return response.data;
    },
  });
};
