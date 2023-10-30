import api from "./baseURL";
import router from "next/router";

export class Chats {
  static async getChatByID(id: string, token: string) {
    try {
      const { data } = await api.get(`/api/chats/chatsById/${id}`, {
        headers: {
          authorization: token,
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getChatByUserID(id: string, token: string) {
    try {
      const { data } = await api.get(`/api/chats/chatsByUser/${id}`, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getChatMessages(id: string, token: string) {
    try {
      const { data } = await api.get(`/api/chats/messages/${id}`, {
        headers: {
          authorization: token,
        },
      });
      return data[data.length - 1].content;
    } catch (error) {
      console.log(error);
    }
  }

  static async createChatRoom(
    myId: string,
    id: string,
    token: string
  ): Promise<void> {
    try {
      const { data } = await api.post(
        `/api/chats/create-chat`,
        {
          sender_id: myId,
          receiver_id: id,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      console.log(data);

      router.push(`/messages/${data.chat_id}`);
    } catch (error) {
      console.log(error);
    }
  }

  static async sendMessage(
    id: string,
    sender_id: string,
    content: string,
    token: string
  ) {
    try {
      await api.post(
        `/api/chats/send-message/${id}`,
        {
          sender_id,
          content,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
