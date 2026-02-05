import { Injectable, Inject } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '@/infrastructure/database/database.module';
import { users } from './users.schema';
import { completedOpportunities } from '../opportunities/opportunities.schema';
import { feedbacks } from '../feedback/feedback.schema';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: Database) {}

  async create(data: CreateUserDto) {
    const result = await this.db.insert(users).values(data).returning();
    return result[0]!;
  }

  async findById(id: string) {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return result[0] ?? null;
  }

  async findByEmail(email: string) {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return result[0] ?? null;
  }

  async findAll(limit = 20, offset = 0) {
    return this.db.select().from(users).limit(limit).offset(offset);
  }

  async update(id: string, data: UpdateUserDto) {
    const result = await this.db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0] ?? null;
  }

  async updatePhoto(id: string, userPhoto: string) {
    const result = await this.db
      .update(users)
      .set({ userPhoto, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0] ?? null;
  }

  async delete(id: string) {
    await this.db.delete(users).where(eq(users.id, id));
  }

  async getCompletedOpportunitiesCount(userId: string): Promise<number> {
    const result = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(completedOpportunities)
      .where(eq(completedOpportunities.completedByUserId, userId));
    return result[0]?.count ?? 0;
  }

  async getAverageRating(userId: string): Promise<number> {
    const result = await this.db
      .select({ avg: sql<number>`coalesce(avg(${feedbacks.rating}), 0)::float` })
      .from(feedbacks)
      .where(eq(feedbacks.revieweeId, userId));
    return result[0]?.avg ?? 0;
  }

  async getFeedbackCount(userId: string): Promise<number> {
    const result = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(feedbacks)
      .where(eq(feedbacks.revieweeId, userId));
    return result[0]?.count ?? 0;
  }
}
