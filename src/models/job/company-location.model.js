import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { companies } from './company.model.js';

export const companyLocations = pgTable('companylocations', {
  id: uuid('id').primaryKey().defaultRandom(),
  companyId: uuid('company_id').notNull().references(() => companies.id),
  country: varchar('country', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  address: varchar('address', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}); 