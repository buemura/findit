import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { FeedbackRepository } from './feedback.repository';
import { CreateFeedbackDto, UpdateFeedbackDto } from './dto';

@Injectable()
export class FeedbackService {
  constructor(private feedbackRepository: FeedbackRepository) {}

  async create(reviewerId: string, dto: CreateFeedbackDto) {
    if (reviewerId === dto.revieweeId) {
      throw new BadRequestException('Cannot leave feedback for yourself');
    }

    const existing = await this.feedbackRepository.findExisting(
      reviewerId,
      dto.revieweeId,
    );
    if (existing) {
      throw new BadRequestException('You have already left feedback for this user');
    }

    return this.feedbackRepository.create(reviewerId, dto);
  }

  async findByUserId(userId: string, limit?: number, offset?: number) {
    return this.feedbackRepository.findByRevieweeId(userId, limit, offset);
  }

  async getAverageRating(userId: string) {
    return this.feedbackRepository.getAverageRating(userId);
  }

  async update(id: string, reviewerId: string, dto: UpdateFeedbackDto) {
    const feedback = await this.feedbackRepository.findById(id);
    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }
    if (feedback.reviewerId !== reviewerId) {
      throw new ForbiddenException('Cannot update other users feedback');
    }
    return this.feedbackRepository.update(id, dto);
  }

  async delete(id: string, reviewerId: string) {
    const feedback = await this.feedbackRepository.findById(id);
    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }
    if (feedback.reviewerId !== reviewerId) {
      throw new ForbiddenException('Cannot delete other users feedback');
    }
    await this.feedbackRepository.delete(id);
  }
}
