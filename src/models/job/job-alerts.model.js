import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { users } from '../user-profile/user.model.js';

export const jobAlerts = pgTable('jobalerts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  keywords: text('keywords').notNull(),
  filters: jsonb('filters').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}); 