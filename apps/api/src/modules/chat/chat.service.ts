import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { CreateChatRoomDto, SendMessageDto } from './dto';

@Injectable()
export class ChatService {
  constructor(private chatRepository: ChatRepository) {}

  async createRoom(senderId: string, dto: CreateChatRoomDto) {
    if (senderId === dto.receiverId) {
      throw new BadRequestException('Cannot create chat room with yourself');
    }

    // Check if room already exists
    const existing = await this.chatRepository.findExistingRoom(
      senderId,
      dto.receiverId,
      dto.opportunityId,
    );

    if (existing) {
      return existing;
    }

    return this.chatRepository.createRoom(senderId, dto);
  }

  async getUserRooms(userId: string) {
    const rooms = await this.chatRepository.findUserRooms(userId);

    // Enrich with other participant info
    const enrichedRooms = await Promise.all(
      rooms.map(async (r) => {
        const roomWithParticipant = await this.chatRepository.getRoomWithParticipants(
          r.room.id,
          userId,
        );
        return {
          ...r.room,
          opportunity: r.opportunity,
          otherUser: roomWithParticipant?.otherUser,
        };
      }),
    );

    return enrichedRooms;
  }

  async getRoomById(roomId: string, userId: string) {
    const room = await this.chatRepository.getRoomWithParticipants(roomId, userId);
    if (!room) {
      throw new NotFoundException('Chat room not found');
    }

    if (room.senderId !== userId && room.receiverId !== userId) {
      throw new ForbiddenException('Not a participant of this chat room');
    }

    return room;
  }

  async sendMessage(roomId: string, senderId: string, dto: SendMessageDto) {
    const room = await this.chatRepository.findRoomById(roomId);
    if (!room) {
      throw new NotFoundException('Chat room not found');
    }

    if (room.room.senderId !== senderId && room.room.receiverId !== senderId) {
      throw new ForbiddenException('Not a participant of this chat room');
    }

    return this.chatRepository.createMessage(roomId, senderId, dto.content);
  }

  async getMessages(roomId: string, userId: string, limit?: number, offset?: number) {
    const room = await this.chatRepository.findRoomById(roomId);
    if (!room) {
      throw new NotFoundException('Chat room not found');
    }

    if (room.room.senderId !== userId && room.room.receiverId !== userId) {
      throw new ForbiddenException('Not a participant of this chat room');
    }

    return this.chatRepository.getMessages(roomId, limit, offset);
  }

  async markAsRead(messageId: string, userId: string) {
    return this.chatRepository.markMessageAsRead(messageId);
  }
}
