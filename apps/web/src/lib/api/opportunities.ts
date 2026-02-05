import { apiClient, getStoredToken } from './client';
import { Opportunity, OpportunityWithRelations } from '@/types';

export interface OpportunityFilters {
  category?: string;
  city?: string;
  state?: string;
  country?: string;
  priceMin?: number;
  priceMax?: number;
  minRating?: number;
  minCompletedJobs?: number;
  sort?: 'newest' | 'oldest' | 'price_asc' | 'price_desc';
  limit?: number;
  offset?: number;
}

export const opportunitiesApi = {
  getAll: async (filters: OpportunityFilters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, String(value));
    });
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient<OpportunityWithRelations[]>(`/opportunities${query}`);
  },

  getById: async (id: string) => {
    return apiClient<OpportunityWithRelations>(`/opportunities/${id}`);
  },

  getByUserId: async (userId: string, limit?: number, offset?: number) => {
    const params = new URLSearchParams();
    if (limit) params.append('limit', String(limit));
    if (offset) params.append('offset', String(offset));
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient<Opportunity[]>(`/opportunities/user/${userId}${query}`);
  },

  getMyOpportunities: async (token: string) => {
    return apiClient<Opportunity[]>('/opportunities/user/me', { token });
  },

  create: async (
    token: string,
    data: {
      title: string;
      description: string;
      categoryId: string;
      country: string;
      priceMin?: number;
      priceMax?: number;
      city?: string;
      state?: string;
    }
  ) => {
    return apiClient<Opportunity>('/opportunities', {
      method: 'POST',
      token,
      body: JSON.stringify(data),
    });
  },

  update: async (token: string, id: string, data: Partial<Opportunity>) => {
    return apiClient<Opportunity>(`/opportunities/${id}`, {
      method: 'PATCH',
      token,
      body: JSON.stringify(data),
    });
  },

  delete: async (token: string, id: string) => {
    return apiClient(`/opportunities/${id}`, { method: 'DELETE', token });
  },

  markCompleted: async (token: string, id: string, completedByUserId: string) => {
    return apiClient<Opportunity>(`/opportunities/${id}/complete`, {
      method: 'PATCH',
      token,
      body: JSON.stringify({ completedByUserId }),
    });
  },

  getCount: async (filters: OpportunityFilters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, String(value));
    });
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient<{ count: number }>(`/opportunities/count${query}`);
  },
};
