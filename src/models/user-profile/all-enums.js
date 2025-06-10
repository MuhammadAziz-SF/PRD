import { pgEnum } from 'drizzle-orm/pg-core';

// const applicationStatuses = pgEnum('application_statuses', ['submitted', 'under_review', 'shortlisted', 'rejected', 'withdrawn', 'hired', 'interviewing']);
// const contractStatuses = pgEnum('contract_statuses', ['draft', 'active', 'completed', 'terminated']);
const genders = pgEnum('genders', ['male', 'female']);
const jobStatuses = pgEnum('job_statuses', ['active', 'inactive', 'terminated']);
// const jobTypes = pgEnum('job_types', ['full-time', 'part-time']);
const languageProficiencyLevels = pgEnum('language_proficiency_levels', [
  'basic',
  'conversational',
  'fluent',
  'native',
]);
// const notificationTypes = pgEnum('notification_types', ['job_alert', 'interview', 'contract', 'application_update', 'system', 'read', 'unread']);
const proficiencyLevels = pgEnum('proficiency_levels', [
  'beginner',
  'intermediate',
  'advanced',
  'expert',
]);
const roles = pgEnum('roles', [
  'admin',
  'employer',
  'job_seeker',
  'recruiter',
  'moderator',
  'superAdmin',
]);
// const userActions = pgEnum('user_actions', ['suspend', 'delete', 'warn', 'restrict']);
const visaStatuses = pgEnum('visa_statuses', ['applied', 'approved', 'rejected', 'expired']);
const certificateStatuses = pgEnum('certificate_statuses', [
  'valid',
  'expired',
  'revoked',
  'pending',
]);

export const Enums = {
  jobStatuses,
  certificateStatuses,
  genders,
  languageLevel: languageProficiencyLevels,
  proficiency: proficiencyLevels,
  roles,
  visaStatuses,
};
