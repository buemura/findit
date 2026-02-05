import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '@/infrastructure/database/database.module';
import { refreshTokens } from './auth.schema';

@Injectable()
export class AuthRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: Database) {}

  async createRefreshToken(data: { userId: string; token: string; expiresAt: Date }) {
    const result = await this.db
      .insert(refreshTokens)
      .values(data)
      .returning();
    return result[0]!;
  }

  async findRefreshToken(token: string) {
    const result = await this.db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.token, token))
      .limit(1);
    return result[0] ?? null;
  }

  async deleteRefreshToken(token: string) {
    await this.db.delete(refreshTokens).where(eq(refreshTokens.token, token));
  }

  async deleteUserRefreshTokens(userId: string) {
    await this.db.delete(refreshTokens).where(eq(refreshTokens.userId, userId));
  }
}
