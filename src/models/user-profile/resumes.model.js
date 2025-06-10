import { pgTable, uuid, varchar, boolean, text, timestamp } from 'drizzle-orm/pg-core';

import { users } from './user.model.js';

export const resumes = pgTable('resumes', {
  id: uuid('id').defaultRandom().primaryKey(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  title: varchar('title', { length: 100 }).notNull(),
  filePath: text('file_path').notNull(),
  isDefault: boolean('is_default').default(false),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),

  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
