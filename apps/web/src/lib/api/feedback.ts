import { apiClient } from './client';
import { Feedback } from '@/types';

export const feedbackApi = {
  create: async (
    token: string,
    data: { revieweeId: string; rating: number; comment?: string }
  ) => {
    return apiClient<Feedback>('/feedbacks', {
      method: 'POST',
      token,
      body: JSON.stringify(data),
    });
  },

  update: async (
    token: string,
    id: string,
    data: { rating?: number; comment?: string }
  ) => {
    return apiClient<Feedback>(`/feedbacks/${id}`, {
      method: 'PATCH',
      token,
      body: JSON.stringify(data),
    });
  },

  delete: async (token: string, id: string) => {
    return apiClient(`/feedbacks/${id}`, { method: 'DELETE', token });
  },
};
