import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { jobs } from './job.model.js';
import { users } from '../user-profile/user.model.js';
import { resumes } from '../user-profile/resumes.model.js';
import { JobEnums } from './enums.js';

export const applications = pgTable('applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id),
  jobId: uuid('job_id').notNull().references(() => jobs.id),
  resumeId: uuid('resume_id').notNull().references(() => resumes.id),
  coverLetter: text('cover_letter'),
  status: JobEnums.applicationStatuses('status').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}); 