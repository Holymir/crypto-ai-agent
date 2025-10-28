import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
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

export const useInfiniteArticles = (params) => {
  return useInfiniteQuery({
    queryKey: ['articles', 'infinite', params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.getArticles({ ...params, page: pageParam });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
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

export const useTopSources = (days = 7, limit = 5) => {
  return useQuery({
    queryKey: ['stats', 'sources', days, limit],
    queryFn: async () => {
      const response = await api.getTopSources(days, limit);
      return response.data;
    },
  });
};

export const useAssetStats = (days = 7, limit = 10) => {
  return useQuery({
    queryKey: ['stats', 'assets', days, limit],
    queryFn: async () => {
      const response = await api.getAssetStats(days, limit);
      return response.data;
    },
  });
};

export const useCategoryStats = (days = 7, limit = 10) => {
  return useQuery({
    queryKey: ['stats', 'categories', days, limit],
    queryFn: async () => {
      const response = await api.getCategoryStats(days, limit);
      return response.data;
    },
  });
};

export const useChainStats = (days = 7, limit = 10) => {
  return useQuery({
    queryKey: ['stats', 'chains', days, limit],
    queryFn: async () => {
      const response = await api.getChainStats(days, limit);
      return response.data;
    },
  });
};

export const useTrendingKeywords = (days = 7, limit = 10) => {
  return useQuery({
    queryKey: ['stats', 'keywords', days, limit],
    queryFn: async () => {
      const response = await api.getTrendingKeywords(days, limit);
      return response.data;
    },
  });
};
