import { users } from './user-profile/user.model.js';
import { address } from './user-profile/address.model.js';
import { education } from './user-profile/education.model.js';
import { workExperiences } from './user-profile/work-experience.model.js';
import { visaInfo } from './user-profile/visa-info.model.js';
import { skills } from './user-profile/skills.model.js';
import { languages } from './user-profile/languages.model.js';
import { certifications } from './user-profile/certifications.model.js';
import { resumes } from './user-profile/resumes.model.js';
import { Enums } from './user-profile/all-enums.js';

export const models = {
  users: users,
  address: address,
  education: education,
  workExperiences: workExperiences,
  visaInfo: visaInfo,
  skills: skills,
  languages: languages,
  certifications: certifications,
  resumes: resumes,
  Enums: Enums,
};

export default models;
