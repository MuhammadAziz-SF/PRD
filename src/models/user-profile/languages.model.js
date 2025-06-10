import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

import { users } from './user.model.js';
import { Enums } from './all-enums.js';

export const languages = pgTable('languages', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  proficiency: Enums.languageLevel('proficiency').default('basic'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
