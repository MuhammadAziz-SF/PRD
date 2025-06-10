import { pgTable, uuid, varchar, boolean, timestamp, date } from 'drizzle-orm/pg-core';

import { users } from './user.model.js';

export const certifications = pgTable('certifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  issuingOrganization: varchar('issuing_organization', { length: 255 }).notNull(),
  issueDate: date('issue_date'),
  expirationDate: date('expiration_date'),
  credentialId: varchar('credential_id', { length: 255 }).notNull(),
  credentialUrl: varchar('credential_url', { length: 255 }).notNull(),
  isForeign: boolean('is_foreign'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
