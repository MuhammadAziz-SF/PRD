import { pgTable, uuid, varchar, timestamp, text, date, boolean } from 'drizzle-orm/pg-core';

import { users } from './user.model.js';

export const education = pgTable('educations', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  institution: varchar('institution', { length: 255 }),
  degree: varchar('degree', { length: 255 }),
  fieldOfStudy: varchar('field_of_study', { length: 255 }),
  startDate: date('start_date'),
  endDate: date('end_date'),
  grade: varchar('grade', { length: 255 }),
  description: text('description'),
  country: varchar('country', { length: 255 }),
  isForeign: boolean('is_foreign').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
