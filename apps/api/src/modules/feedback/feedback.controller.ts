import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto, UpdateFeedbackDto } from './dto';
import { Public } from '@/common/decorators/public.decorator';
import { CurrentUser, JwtPayload } from '@/common/decorators/current-user.decorator';

@ApiTags('Feedback')
@Controller()
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Public()
  @Get('users/:userId/feedbacks')
  @ApiOperation({ summary: 'Get user feedbacks' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  async findByUserId(
    @Param('userId') userId: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.feedbackService.findByUserId(userId, limit, offset);
  }

  @Public()
  @Get('users/:userId/rating')
  @ApiOperation({ summary: 'Get user average rating' })
  async getAverageRating(@Param('userId') userId: string) {
    return this.feedbackService.getAverageRating(userId);
  }

  @Post('feedbacks')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create feedback' })
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateFeedbackDto,
  ) {
    return this.feedbackService.create(user.sub, dto);
  }

  @Patch('feedbacks/:id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update feedback' })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateFeedbackDto,
  ) {
    return this.feedbackService.update(id, user.sub, dto);
  }

  @Delete('feedbacks/:id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete feedback' })
  async delete(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    await this.feedbackService.delete(id, user.sub);
    return { message: 'Feedback deleted successfully' };
  }
}
