import { apiClient } from './client';
import { Category } from '@/types';

export const categoriesApi = {
  getAll: async (all = false) => {
    const query = all ? '?all=true' : '';
    return apiClient<Category[]>(`/categories${query}`);
  },

  getById: async (id: string) => {
    return apiClient<Category>(`/categories/${id}`);
  },
};
