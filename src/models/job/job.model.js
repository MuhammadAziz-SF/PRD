import { pgTable, uuid, varchar, text, integer, boolean, timestamp, date } from 'drizzle-orm/pg-core';
import { companies } from './company.model.js';
import { JobEnums } from './enums.js';

export const jobs = pgTable('jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  companyId: uuid('company_id').notNull().references(() => companies.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 255 }).notNull(),
  type: JobEnums.jobTypes('type').notNull(),
  country: varchar('country', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  relocationAssistance: boolean('relocation_assistance').notNull(),
  remoteOption: boolean('remote_option').notNull(),
  salaryMin: integer('salary_min').notNull(),
  salaryMax: integer('salary_max').notNull(),
  salaryCurrency: varchar('salary_currency', { length: 255 }).notNull(),
  salaryPeriod: boolean('salary_period').notNull(),
  visaSponsorship: boolean('visa_sponsorship').notNull(),
  experienceLevel: varchar('experience_level', { length: 255 }).notNull(),
  educationRequirement: text('education_requirement').notNull(),
  status: JobEnums.jobStatuses('status').notNull(),
  deadline: date('deadline').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}); 