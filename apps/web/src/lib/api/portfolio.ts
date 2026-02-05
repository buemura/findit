import { apiClient } from './client';
import { PortfolioItem } from '@/types';

export const portfolioApi = {
  create: async (
    token: string,
    data: { imageUrl: string; title?: string; description?: string }
  ) => {
    return apiClient<PortfolioItem>('/portfolio', {
      method: 'POST',
      token,
      body: JSON.stringify(data),
    });
  },

  update: async (
    token: string,
    id: string,
    data: { imageUrl?: string; title?: string; description?: string }
  ) => {
    return apiClient<PortfolioItem>(`/portfolio/${id}`, {
      method: 'PATCH',
      token,
      body: JSON.stringify(data),
    });
  },

  delete: async (token: string, id: string) => {
    return apiClient(`/portfolio/${id}`, { method: 'DELETE', token });
  },
};
