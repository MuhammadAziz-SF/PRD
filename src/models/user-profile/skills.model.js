import { pgTable, uuid, varchar, timestamp, integer } from 'drizzle-orm/pg-core';

import { users } from './user.model.js';
import { Enums } from './all-enums.js';

export const skills = pgTable('skills', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  name: varchar('name', { length: 255 }).notNull(),
  proficiency: Enums.proficiency('proficiency').default('beginner'),
  yearsOfExperience: integer('years_of_experience'),
  certificateStatus: Enums.certificateStatuses('certificate_status').default('expired'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
