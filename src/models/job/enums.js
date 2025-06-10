import { pgEnum } from 'drizzle-orm/pg-core';

const jobTypes = pgEnum('job_types', ['full-time', 'part-time']);
const applicationStatuses = pgEnum('application_statuses', ['pending', 'reviewed', 'rejected', 'shortlisted', 'interviewed', 'offered', 'hired', 'withdrawn']);
const jobCategories = pgEnum('job_categories', ['technology', 'healthcare', 'finance', 'education', 'marketing', 'sales', 'engineering', 'customer_service', 'administrative', 'other']);
const experienceLevels = pgEnum('experience_levels', ['entry', 'mid', 'senior', 'executive']);
const jobStatuses = pgEnum('job_statuses', ['draft', 'active', 'closed', 'expired']);

export const JobEnums = {
  jobTypes,
  applicationStatuses,
  jobCategories,
  experienceLevels,
  jobStatuses
}; 