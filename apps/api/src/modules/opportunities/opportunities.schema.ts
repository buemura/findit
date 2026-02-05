import { pgTable, text, timestamp, boolean, decimal, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';
import { users } from '../users/users.schema';
import { categories } from '../categories/categories.schema';

export const opportunityStatusEnum = pgEnum('opportunity_status', [
  'open',
  'in_progress',
  'completed',
  'cancelled',
]);

export const opportunities = pgTable('opportunities', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  categoryId: text('category_id').notNull().references(() => categories.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  priceMin: decimal('price_min', { precision: 10, scale: 2 }),
  priceMax: decimal('price_max', { precision: 10, scale: 2 }),
  city: text('city'),
  state: text('state'),
  country: text('country').notNull(),
  status: opportunityStatusEnum('status').default('open').notNull(),
  isDeleted: boolean('is_deleted').default(false).notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const opportunitiesRelations = relations(opportunities, ({ one, many }) => ({
  user: one(users, { fields: [opportunities.userId], references: [users.id] }),
  category: one(categories, { fields: [opportunities.categoryId], references: [categories.id] }),
  chatRooms: many(chatRooms),
}));

export const completedOpportunities = pgTable('completed_opportunities', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  opportunityId: text('opportunity_id').notNull().references(() => opportunities.id),
  completedByUserId: text('completed_by_user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

import { chatRooms } from '../chat/chat.schema';
