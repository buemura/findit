import { Injectable, Inject } from '@nestjs/common';
import { eq, and, desc } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '@/infrastructure/database/database.module';
import { portfolioItems } from './portfolio.schema';
import { CreatePortfolioItemDto, UpdatePortfolioItemDto } from './dto';

@Injectable()
export class PortfolioRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: Database) {}

  async create(userId: string, data: CreatePortfolioItemDto) {
    const result = await this.db
      .insert(portfolioItems)
      .values({ ...data, userId })
      .returning();
    return result[0]!;
  }

  async findByUserId(userId: string) {
    return this.db
      .select()
      .from(portfolioItems)
      .where(and(eq(portfolioItems.userId, userId), eq(portfolioItems.isDeleted, false)))
      .orderBy(desc(portfolioItems.createdAt));
  }

  async findById(id: string) {
    const result = await this.db
      .select()
      .from(portfolioItems)
      .where(eq(portfolioItems.id, id))
      .limit(1);
    return result[0] ?? null;
  }

  async update(id: string, data: UpdatePortfolioItemDto) {
    const result = await this.db
      .update(portfolioItems)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(portfolioItems.id, id))
      .returning();
    return result[0] ?? null;
  }

  async softDelete(id: string) {
    const result = await this.db
      .update(portfolioItems)
      .set({ isDeleted: true, deletedAt: new Date(), updatedAt: new Date() })
      .where(eq(portfolioItems.id, id))
      .returning();
    return result[0] ?? null;
  }
}
