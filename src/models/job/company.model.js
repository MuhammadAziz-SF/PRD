import { pgTable, uuid, varchar, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const companies = pgTable('companies', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).unique(),
  description: text('description'),
  industry: varchar('industry', { length: 255 }),
  foundedYear: integer('founded_year'),
  website: varchar('website', { length: 255 }),
  logo: varchar('logo', { length: 255 }),
  headquartersCountry: varchar('headquarters_country', { length: 255 }),
  isVerified: boolean('is_verified').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}); 