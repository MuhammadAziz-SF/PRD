import { pgTable, uuid, varchar, boolean, text, timestamp, date } from 'drizzle-orm/pg-core';

import { users } from './user.model.js';
import { Enums } from './all-enums.js';

export const visaInfo = pgTable('visa_info', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  visaType: varchar('visa_type', { length: 255 }),
  visaCountry: varchar('visa_country', { length: 255 }),
  visaStatus: Enums.visaStatuses('visa_status').default('applied'),
  expiryDate: date('expiry_date'),
  multipleEntry: boolean('multiple_entry'),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
