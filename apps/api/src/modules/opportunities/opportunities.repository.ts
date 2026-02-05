import { Injectable, Inject } from '@nestjs/common';
import { eq, and, gte, lte, desc, asc, ilike, sql } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '@/infrastructure/database/database.module';
import { opportunities, completedOpportunities } from './opportunities.schema';
import { categories } from '../categories/categories.schema';
import { users } from '../users/users.schema';
import { feedbacks } from '../feedback/feedback.schema';
import { CreateOpportunityDto, UpdateOpportunityDto, FilterOpportunityDto } from './dto';

@Injectable()
export class OpportunitiesRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: Database) {}

  async create(userId: string, data: CreateOpportunityDto) {
    const result = await this.db
      .insert(opportunities)
      .values({
        ...data,
        userId,
        priceMin: data.priceMin?.toString(),
        priceMax: data.priceMax?.toString(),
      })
      .returning();
    return result[0]!;
  }

  async findById(id: string) {
    const result = await this.db
      .select({
        opportunity: opportunities,
        category: categories,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          userPhoto: users.userPhoto,
          city: users.city,
          state: users.state,
          country: users.country,
        },
      })
      .from(opportunities)
      .leftJoin(categories, eq(opportunities.categoryId, categories.id))
      .leftJoin(users, eq(opportunities.userId, users.id))
      .where(eq(opportunities.id, id))
      .limit(1);
    return result[0] ?? null;
  }

  async findAll(filters: FilterOpportunityDto) {
    const { limit = 20, offset = 0, sort = 'newest' } = filters;
    const conditions = [eq(opportunities.isDeleted, false)];

    if (filters.category) {
      const cat = await this.db
        .select()
        .from(categories)
        .where(eq(categories.slug, filters.category))
        .limit(1);
      if (cat[0]) {
        conditions.push(eq(opportunities.categoryId, cat[0].id));
      }
    }

    if (filters.city) {
      conditions.push(ilike(opportunities.city, `%${filters.city}%`));
    }
    if (filters.state) {
      conditions.push(ilike(opportunities.state, `%${filters.state}%`));
    }
    if (filters.country) {
      conditions.push(ilike(opportunities.country, `%${filters.country}%`));
    }
    if (filters.priceMin !== undefined) {
      conditions.push(gte(opportunities.priceMin, filters.priceMin.toString()));
    }
    if (filters.priceMax !== undefined) {
      conditions.push(lte(opportunities.priceMax, filters.priceMax.toString()));
    }

    let orderBy;
    switch (sort) {
      case 'oldest':
        orderBy = asc(opportunities.createdAt);
        break;
      case 'price_asc':
        orderBy = asc(opportunities.priceMin);
        break;
      case 'price_desc':
        orderBy = desc(opportunities.priceMax);
        break;
      default:
        orderBy = desc(opportunities.createdAt);
    }

    const results = await this.db
      .select({
        opportunity: opportunities,
        category: categories,
        user: {
          id: users.id,
          name: users.name,
          userPhoto: users.userPhoto,
        },
      })
      .from(opportunities)
      .leftJoin(categories, eq(opportunities.categoryId, categories.id))
      .leftJoin(users, eq(opportunities.userId, users.id))
      .where(and(...conditions))
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    // Filter by poster relevancy if specified
    if (filters.minRating || filters.minCompletedJobs) {
      const filtered = [];
      for (const result of results) {
        if (!result.user) continue;

        const stats = await this.getUserStats(result.user.id);
        if (filters.minRating && stats.avgRating < filters.minRating) continue;
        if (filters.minCompletedJobs && stats.completedJobs < filters.minCompletedJobs) continue;
        filtered.push({ ...result, userStats: stats });
      }
      return filtered;
    }

    return results;
  }

  async findByUserId(userId: string, limit = 20, offset = 0) {
    return this.db
      .select()
      .from(opportunities)
      .where(and(eq(opportunities.userId, userId), eq(opportunities.isDeleted, false)))
      .orderBy(desc(opportunities.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async update(id: string, data: UpdateOpportunityDto) {
    const updateData: Record<string, unknown> = { ...data, updatedAt: new Date() };
    if (data.priceMin !== undefined) updateData.priceMin = data.priceMin.toString();
    if (data.priceMax !== undefined) updateData.priceMax = data.priceMax.toString();

    const result = await this.db
      .update(opportunities)
      .set(updateData)
      .where(eq(opportunities.id, id))
      .returning();
    return result[0] ?? null;
  }

  async softDelete(id: string) {
    const result = await this.db
      .update(opportunities)
      .set({ isDeleted: true, deletedAt: new Date(), updatedAt: new Date() })
      .where(eq(opportunities.id, id))
      .returning();
    return result[0] ?? null;
  }

  async markCompleted(opportunityId: string, completedByUserId: string) {
    await this.db.insert(completedOpportunities).values({
      opportunityId,
      completedByUserId,
    });

    return this.update(opportunityId, { status: 'completed' });
  }

  async count(filters: FilterOpportunityDto = {}) {
    const conditions = [eq(opportunities.isDeleted, false)];

    if (filters.category) {
      const cat = await this.db
        .select()
        .from(categories)
        .where(eq(categories.slug, filters.category))
        .limit(1);
      if (cat[0]) {
        conditions.push(eq(opportunities.categoryId, cat[0].id));
      }
    }

    const result = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(opportunities)
      .where(and(...conditions));

    return result[0]?.count ?? 0;
  }

  private async getUserStats(userId: string) {
    const [completedResult, ratingResult] = await Promise.all([
      this.db
        .select({ count: sql<number>`count(*)::int` })
        .from(completedOpportunities)
        .where(eq(completedOpportunities.completedByUserId, userId)),
      this.db
        .select({ avg: sql<number>`coalesce(avg(${feedbacks.rating}), 0)::float` })
        .from(feedbacks)
        .where(eq(feedbacks.revieweeId, userId)),
    ]);

    return {
      completedJobs: completedResult[0]?.count ?? 0,
      avgRating: ratingResult[0]?.avg ?? 0,
    };
  }
}
