export interface User {
  id: string;
  name: string;
  email: string;
  userPhoto?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  occupation?: string;
  bio?: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  isActive: boolean;
}

export interface Opportunity {
  id: string;
  userId: string;
  categoryId: string;
  title: string;
  description: string;
  priceMin?: string;
  priceMax?: string;
  city?: string;
  state?: string;
  country: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OpportunityWithRelations {
  opportunity: Opportunity;
  category: Category | null;
  user: Pick<User, 'id' | 'name' | 'email' | 'userPhoto' | 'city' | 'state' | 'country'> | null;
  userStats?: { completedJobs: number; avgRating: number };
}

export interface PortfolioItem {
  id: string;
  userId: string;
  imageUrl: string;
  title?: string;
  description?: string;
  createdAt: string;
}

export interface ChatRoom {
  id: string;
  opportunityId?: string;
  senderId: string;
  receiverId: string;
  opportunity?: { id: string; title: string } | null;
  otherUser?: { id: string; name: string; userPhoto?: string } | null;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatRoomId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface MessageWithSender {
  message: Message;
  sender: { id: string; name: string; userPhoto?: string } | null;
}

export interface Feedback {
  id: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface FeedbackWithReviewer {
  feedback: Feedback;
  reviewer: { id: string; name: string; userPhoto?: string } | null;
}

export interface UserStats {
  completedJobs: number;
  averageRating: number;
  feedbackCount: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse extends AuthTokens {
  user: User;
}

export interface ApiError {
  statusCode: number;
  message: string;
  errors?: string[];
}
