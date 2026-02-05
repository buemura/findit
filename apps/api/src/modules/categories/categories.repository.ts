import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '@/infrastructure/database/database.module';
import { categories } from './categories.schema';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: Database) {}

  async create(data: CreateCategoryDto) {
    const result = await this.db.insert(categories).values(data).returning();
    return result[0]!;
  }

  async findAll(activeOnly = true) {
    if (activeOnly) {
      return this.db
        .select()
        .from(categories)
        .where(eq(categories.isActive, true));
    }
    return this.db.select().from(categories);
  }

  async findById(id: string) {
    const result = await this.db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);
    return result[0] ?? null;
  }

  async findBySlug(slug: string) {
    const result = await this.db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1);
    return result[0] ?? null;
  }

  async update(id: string, data: UpdateCategoryDto) {
    const result = await this.db
      .update(categories)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .returning();
    return result[0] ?? null;
  }

  async delete(id: string) {
    await this.db.delete(categories).where(eq(categories.id, id));
  }
}
