import { apiClient } from './client';
import { ChatRoom, MessageWithSender, Message } from '@/types';

export const chatApi = {
  getRooms: async (token: string) => {
    return apiClient<ChatRoom[]>('/chat/rooms', { token });
  },

  getRoomById: async (token: string, roomId: string) => {
    return apiClient<ChatRoom>(`/chat/rooms/${roomId}`, { token });
  },

  createRoom: async (
    token: string,
    data: { receiverId: string; opportunityId?: string }
  ) => {
    return apiClient<ChatRoom>('/chat/rooms', {
      method: 'POST',
      token,
      body: JSON.stringify(data),
    });
  },

  getMessages: async (
    token: string,
    roomId: string,
    limit?: number,
    offset?: number
  ) => {
    const params = new URLSearchParams();
    if (limit) params.append('limit', String(limit));
    if (offset) params.append('offset', String(offset));
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient<MessageWithSender[]>(
      `/chat/rooms/${roomId}/messages${query}`,
      { token }
    );
  },

  sendMessage: async (token: string, roomId: string, content: string) => {
    return apiClient<Message>(`/chat/rooms/${roomId}/messages`, {
      method: 'POST',
      token,
      body: JSON.stringify({ content }),
    });
  },

  markAsRead: async (token: string, messageId: string) => {
    return apiClient(`/chat/messages/${messageId}/read`, {
      method: 'PATCH',
      token,
    });
  },
};
