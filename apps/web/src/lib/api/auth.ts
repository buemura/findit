import { apiClient, setStoredTokens, clearStoredTokens } from './client';
import { AuthResponse, User } from '@/types';

export const authApi = {
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await apiClient<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setStoredTokens(response.accessToken, response.refreshToken);
    return response;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await apiClient<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setStoredTokens(response.accessToken, response.refreshToken);
    return response;
  },

  logout: async (token: string) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      await apiClient('/auth/logout', {
        method: 'POST',
        token,
        body: JSON.stringify({ refreshToken }),
      }).catch(() => {});
    }
    clearStoredTokens();
  },

  getMe: async (token: string) => {
    return apiClient<User>('/auth/me', { token });
  },

  refresh: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');

    const response = await apiClient<{ accessToken: string; refreshToken: string }>(
      '/auth/refresh',
      {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      }
    );
    setStoredTokens(response.accessToken, response.refreshToken);
    return response;
  },
};
