import { pgTable, uuid, varchar, timestamp, text, date, boolean } from 'drizzle-orm/pg-core';

import { users } from './user.model.js';
import { Enums } from './all-enums.js';

export const workExperiences = pgTable('work_experiences', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  companyName: varchar('company_name', { length: 255 }),
  position: varchar('position', { length: 255 }),
  location: varchar('location', { length: 255 }),
  country: varchar('country', { length: 255 }),
  startDate: date('start_date'),
  endDate: date('end_date'),
  currentJobStatus: Enums.jobStatuses('current_job_status').default('inactive'),
  description: text('description'),
  isForeign: boolean('is_foreign'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
