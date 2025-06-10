import { pgTable, uuid, varchar, timestamp, text, date } from 'drizzle-orm/pg-core';

import { Enums } from './all-enums.js';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: Enums.roles('role').default('job_seeker'),
  password: varchar('password', { length: 255 }),
  firstName: varchar('first_name', { length: 255 }).default(''),
  lastName: varchar('last_name', { length: 255 }).default(''),
  phoneNumber: varchar('phone_number', { length: 20 }).unique(),
  dateOfBirth: date('date_of_birth'),
  profilePicture: varchar('profile_picture', { length: 255 }),
  bio: text('bio'),
  gender: Enums.genders('gender'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
