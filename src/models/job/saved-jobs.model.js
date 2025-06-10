import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { jobs } from './job.model.js';
import { users } from '../user-profile/user.model.js';

export const savedJobs = pgTable('savedjobss', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  jobId: uuid('job_id').notNull().references(() => jobs.id),
  notes: text('notes'),
  savedAt: timestamp('saved_at').notNull().defaultNow(),
}); 