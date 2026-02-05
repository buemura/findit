import { pgTable, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  userPhoto: text('user_photo'),
  city: text('city'),
  state: text('state'),
  country: text('country'),
  phone: text('phone'),
  occupation: text('occupation'),
  bio: text('bio'),
  isAdmin: boolean('is_admin').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  opportunities: many(opportunities),
  portfolioItems: many(portfolioItems),
  feedbacksGiven: many(feedbacks, { relationName: 'reviewer' }),
  feedbacksReceived: many(feedbacks, { relationName: 'reviewee' }),
  refreshTokens: many(refreshTokens),
}));

// Forward declarations for relations
import { opportunities } from '../opportunities/opportunities.schema';
import { portfolioItems } from '../portfolio/portfolio.schema';
import { feedbacks } from '../feedback/feedback.schema';
import { refreshTokens } from '../auth/auth.schema';
