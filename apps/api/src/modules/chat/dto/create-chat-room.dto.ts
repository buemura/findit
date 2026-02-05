import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChatRoomDto {
  @ApiProperty({ description: 'User ID to chat with' })
  @IsString()
  @IsNotEmpty()
  receiverId: string;

  @ApiPropertyOptional({ description: 'Opportunity ID if chat is about an opportunity' })
  @IsOptional()
  @IsString()
  opportunityId?: string;
}
