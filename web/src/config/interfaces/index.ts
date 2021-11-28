export interface IUserData {
  id?: string;
  name: string;
  email: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  occupation: string;
  about_me: string;
  user_photo: string;
  email_verified?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IServiceData {
  id: string;
  user_id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  city: string;
  state: string;
  country: string;
  created_at: string;
  updated_at: string;
  user: IUserData;
}

export interface IUserInfo {
  id: string;
  name: string;
}

export interface IChatRoomsData {
  id: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  updated_at: string;
  userInfo: IUserInfo;
}

export interface IMessageData {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}
