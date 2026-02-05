import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';
import { users } from '../users/users.schema';

export const feedbacks = pgTable('feedbacks', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  reviewerId: text('reviewer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  revieweeId: text('reviewee_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const feedbacksRelations = relations(feedbacks, ({ one }) => ({
  reviewer: one(users, { fields: [feedbacks.reviewerId], references: [users.id], relationName: 'reviewer' }),
  reviewee: one(users, { fields: [feedbacks.revieweeId], references: [users.id], relationName: 'reviewee' }),
}));
