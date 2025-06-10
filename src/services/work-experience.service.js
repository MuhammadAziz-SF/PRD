import { eq } from 'drizzle-orm';

import db from '../config/db.js';
import { workExperiences } from '../models/user-profile/work-experience.model.js';

class WorkExperienceService {
  async createWorkExperience(workExperienceData) {
    const [newWorkExperience] = await db
      .insert(workExperiences)
      .values(workExperienceData)
      .returning();
    return newWorkExperience;
  }

  async getWorkExperienceById(workExperienceId) {
    const [foundWorkExperience] = await db
      .select()
      .from(workExperiences)
      .where(eq(workExperiences.id, workExperienceId))
      .limit(1);
    return foundWorkExperience || null;
  }

  async getWorkExperiencesByUserId(userId) {
    const userWorkExperiences = await db
      .select()
      .from(workExperiences)
      .where(eq(workExperiences.userId, userId));
    return userWorkExperiences;
  }

  async updateWorkExperience(workExperienceId, workExperienceData) {
    workExperienceData.updatedAt = new Date();

    const [updatedWorkExperience] = await db
      .update(workExperiences)
      .set(workExperienceData)
      .where(eq(workExperiences.id, workExperienceId))
      .returning();

    return updatedWorkExperience || null;
  }

  async deleteWorkExperience(workExperienceId) {
    const [deletedWorkExperience] = await db
      .delete(workExperiences)
      .where(eq(workExperiences.id, workExperienceId))
      .returning();

    return !!deletedWorkExperience;
  }
}

export const workExperienceService = new WorkExperienceService();
export default WorkExperienceService;
