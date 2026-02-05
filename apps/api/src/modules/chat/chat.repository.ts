import { Injectable, Inject } from '@nestjs/common';
import { eq, and, or, desc } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '@/infrastructure/database/database.module';
import { chatRooms, messages } from './chat.schema';
import { users } from '../users/users.schema';
import { opportunities } from '../opportunities/opportunities.schema';
import { CreateChatRoomDto, SendMessageDto } from './dto';

@Injectable()
export class ChatRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: Database) {}

  async createRoom(senderId: string, data: CreateChatRoomDto) {
    const result = await this.db
      .insert(chatRooms)
      .values({ ...data, senderId })
      .returning();
    return result[0]!;
  }

  async findRoomById(id: string) {
    const result = await this.db
      .select({
        room: chatRooms,
        sender: {
          id: users.id,
          name: users.name,
          userPhoto: users.userPhoto,
        },
      })
      .from(chatRooms)
      .leftJoin(users, eq(chatRooms.senderId, users.id))
      .where(eq(chatRooms.id, id))
      .limit(1);
    return result[0] ?? null;
  }

  async findExistingRoom(user1Id: string, user2Id: string, opportunityId?: string) {
    const conditions = [
      or(
        and(eq(chatRooms.senderId, user1Id), eq(chatRooms.receiverId, user2Id)),
        and(eq(chatRooms.senderId, user2Id), eq(chatRooms.receiverId, user1Id)),
      ),
    ];

    if (opportunityId) {
      conditions.push(eq(chatRooms.opportunityId, opportunityId));
    }

    const result = await this.db
      .select()
      .from(chatRooms)
      .where(and(...conditions))
      .limit(1);
    return result[0] ?? null;
  }

  async findUserRooms(userId: string) {
    return this.db
      .select({
        room: chatRooms,
        opportunity: {
          id: opportunities.id,
          title: opportunities.title,
        },
      })
      .from(chatRooms)
      .leftJoin(opportunities, eq(chatRooms.opportunityId, opportunities.id))
      .where(or(eq(chatRooms.senderId, userId), eq(chatRooms.receiverId, userId)))
      .orderBy(desc(chatRooms.updatedAt));
  }

  async getRoomWithParticipants(roomId: string, currentUserId: string) {
    const room = await this.db
      .select()
      .from(chatRooms)
      .where(eq(chatRooms.id, roomId))
      .limit(1);

    if (!room[0]) return null;

    const otherUserId =
      room[0].senderId === currentUserId ? room[0].receiverId : room[0].senderId;

    const otherUser = await this.db
      .select({
        id: users.id,
        name: users.name,
        userPhoto: users.userPhoto,
      })
      .from(users)
      .where(eq(users.id, otherUserId))
      .limit(1);

    return { ...room[0], otherUser: otherUser[0] ?? null };
  }

  async createMessage(chatRoomId: string, senderId: string, content: string) {
    const result = await this.db
      .insert(messages)
      .values({ chatRoomId, senderId, content })
      .returning();

    await this.db
      .update(chatRooms)
      .set({ updatedAt: new Date() })
      .where(eq(chatRooms.id, chatRoomId));

    return result[0]!;
  }

  async getMessages(chatRoomId: string, limit = 50, offset = 0) {
    return this.db
      .select({
        message: messages,
        sender: {
          id: users.id,
          name: users.name,
          userPhoto: users.userPhoto,
        },
      })
      .from(messages)
      .leftJoin(users, eq(messages.senderId, users.id))
      .where(eq(messages.chatRoomId, chatRoomId))
      .orderBy(desc(messages.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async markMessageAsRead(messageId: string) {
    const result = await this.db
      .update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, messageId))
      .returning();
    return result[0] ?? null;
  }

  async markAllMessagesAsRead(chatRoomId: string, userId: string) {
    await this.db
      .update(messages)
      .set({ isRead: true })
      .where(
        and(
          eq(messages.chatRoomId, chatRoomId),
          eq(messages.isRead, false),
          // Don't mark own messages
        ),
      );
  }
}
