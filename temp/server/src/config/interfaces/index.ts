interface IAuthRegister {
  name: string;
  email: string;
  password: string;
}

interface IAuthLogin {
  email: string;
  password: string;
}

interface IUsersUpdate {
  name: string;
  email: string;
  password?: string;
  user_photo?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  occupation?: string;
  about_me?: string;
  email_verified?: boolean;
}

interface IServicesCreate {
  user_id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  city: string;
  state: string;
  country: string;
}

interface IServicesCompleted {
  user_id: string;
  service_id: string;
}

interface ICommentCreate {
  sender_id: string;
  comment: string;
}

interface IChatroomCreate {
  sender_id: string;
  receiver_id: string;
}

interface IMessageCreate {
  sender_id: string;
  content: string;
}

interface IFeedbackCreate {
  user_id: string;
  reviewer_id: string;
  score: string;
}
