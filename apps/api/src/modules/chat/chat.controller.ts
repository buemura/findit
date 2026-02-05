import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

import { ChatService } from './chat.service';
import { CreateChatRoomDto, SendMessageDto } from './dto';
import { CurrentUser, JwtPayload } from '@/common/decorators/current-user.decorator';

@ApiTags('Chat')
@Controller('chat')
@ApiBearerAuth('JWT-auth')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('rooms')
  @ApiOperation({ summary: 'Get user chat rooms' })
  async getUserRooms(@CurrentUser() user: JwtPayload) {
    return this.chatService.getUserRooms(user.sub);
  }

  @Get('rooms/:id')
  @ApiOperation({ summary: 'Get chat room by ID' })
  async getRoomById(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.chatService.getRoomById(id, user.sub);
  }

  @Post('rooms')
  @ApiOperation({ summary: 'Create chat room' })
  async createRoom(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateChatRoomDto,
  ) {
    return this.chatService.createRoom(user.sub, dto);
  }

  @Get('rooms/:id/messages')
  @ApiOperation({ summary: 'Get chat room messages' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  async getMessages(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.chatService.getMessages(id, user.sub, limit, offset);
  }

  @Post('rooms/:id/messages')
  @ApiOperation({ summary: 'Send message to chat room' })
  async sendMessage(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: SendMessageDto,
  ) {
    return this.chatService.sendMessage(id, user.sub, dto);
  }

  @Patch('messages/:id/read')
  @ApiOperation({ summary: 'Mark message as read' })
  async markAsRead(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.chatService.markAsRead(id, user.sub);
  }
}
