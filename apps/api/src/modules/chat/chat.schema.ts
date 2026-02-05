import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';
import { users } from '../users/users.schema';
import { opportunities } from '../opportunities/opportunities.schema';

export const chatRooms = pgTable('chat_rooms', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  opportunityId: text('opportunity_id').references(() => opportunities.id, { onDelete: 'cascade' }),
  senderId: text('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  receiverId: text('receiver_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const chatRoomsRelations = relations(chatRooms, ({ one, many }) => ({
  opportunity: one(opportunities, { fields: [chatRooms.opportunityId], references: [opportunities.id] }),
  sender: one(users, { fields: [chatRooms.senderId], references: [users.id], relationName: 'sender' }),
  receiver: one(users, { fields: [chatRooms.receiverId], references: [users.id], relationName: 'receiver' }),
  messages: many(messages),
}));

export const messages = pgTable('messages', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  chatRoomId: text('chat_room_id').notNull().references(() => chatRooms.id, { onDelete: 'cascade' }),
  senderId: text('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  chatRoom: one(chatRooms, { fields: [messages.chatRoomId], references: [chatRooms.id] }),
  sender: one(users, { fields: [messages.senderId], references: [users.id] }),
}));
