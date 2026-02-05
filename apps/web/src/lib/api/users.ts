import { apiClient } from './client';
import { User, UserStats, PortfolioItem, FeedbackWithReviewer } from '@/types';

export const usersApi = {
  getById: async (id: string) => {
    return apiClient<User>(`/users/${id}`);
  },

  getMe: async (token: string) => {
    return apiClient<User>('/users/me', { token });
  },

  updateMe: async (token: string, data: Partial<User>) => {
    return apiClient<User>('/users/me', {
      method: 'PATCH',
      token,
      body: JSON.stringify(data),
    });
  },

  getStats: async (userId: string) => {
    return apiClient<UserStats>(`/users/${userId}/stats`);
  },

  getPortfolio: async (userId: string) => {
    return apiClient<PortfolioItem[]>(`/users/${userId}/portfolio`);
  },

  getFeedbacks: async (userId: string, limit?: number, offset?: number) => {
    const params = new URLSearchParams();
    if (limit) params.append('limit', String(limit));
    if (offset) params.append('offset', String(offset));
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient<FeedbackWithReviewer[]>(`/users/${userId}/feedbacks${query}`);
  },

  getRating: async (userId: string) => {
    return apiClient<{ averageRating: number; totalFeedbacks: number }>(
      `/users/${userId}/rating`
    );
  },
};
