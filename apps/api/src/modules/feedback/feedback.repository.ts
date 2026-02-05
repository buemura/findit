import { Injectable, Inject } from '@nestjs/common';
import { eq, and, sql, desc } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '@/infrastructure/database/database.module';
import { feedbacks } from './feedback.schema';
import { users } from '../users/users.schema';
import { CreateFeedbackDto, UpdateFeedbackDto } from './dto';

@Injectable()
export class FeedbackRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: Database) {}

  async create(reviewerId: string, data: CreateFeedbackDto) {
    const result = await this.db
      .insert(feedbacks)
      .values({ ...data, reviewerId })
      .returning();
    return result[0]!;
  }

  async findById(id: string) {
    const result = await this.db
      .select()
      .from(feedbacks)
      .where(eq(feedbacks.id, id))
      .limit(1);
    return result[0] ?? null;
  }

  async findByRevieweeId(revieweeId: string, limit = 20, offset = 0) {
    return this.db
      .select({
        feedback: feedbacks,
        reviewer: {
          id: users.id,
          name: users.name,
          userPhoto: users.userPhoto,
        },
      })
      .from(feedbacks)
      .leftJoin(users, eq(feedbacks.reviewerId, users.id))
      .where(eq(feedbacks.revieweeId, revieweeId))
      .orderBy(desc(feedbacks.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async findExisting(reviewerId: string, revieweeId: string) {
    const result = await this.db
      .select()
      .from(feedbacks)
      .where(and(eq(feedbacks.reviewerId, reviewerId), eq(feedbacks.revieweeId, revieweeId)))
      .limit(1);
    return result[0] ?? null;
  }

  async getAverageRating(revieweeId: string) {
    const result = await this.db
      .select({
        avg: sql<number>`coalesce(avg(${feedbacks.rating}), 0)::float`,
        count: sql<number>`count(*)::int`,
      })
      .from(feedbacks)
      .where(eq(feedbacks.revieweeId, revieweeId));
    return {
      averageRating: Math.round((result[0]?.avg ?? 0) * 10) / 10,
      totalFeedbacks: result[0]?.count ?? 0,
    };
  }

  async update(id: string, data: UpdateFeedbackDto) {
    const result = await this.db
      .update(feedbacks)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(feedbacks.id, id))
      .returning();
    return result[0] ?? null;
  }

  async delete(id: string) {
    await this.db.delete(feedbacks).where(eq(feedbacks.id, id));
  }
}
