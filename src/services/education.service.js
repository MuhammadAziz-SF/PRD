import { eq } from 'drizzle-orm';

import db from '../config/db.js';
import { education } from '../models/user-profile/education.model.js';

class EducationService {
  async createEducation(educationData) {
    const [newEducation] = await db.insert(education).values(educationData).returning();
    return newEducation;
  }

  async getEducationById(educationId) {
    const [foundEducation] = await db
      .select()
      .from(education)
      .where(eq(education.id, educationId))
      .limit(1);
    return foundEducation || null;
  }

  async getEducationsByUserId(userId) {
    const userEducations = await db.select().from(education).where(eq(education.userId, userId));
    return userEducations;
  }

  async updateEducation(educationId, educationData) {
    educationData.updatedAt = new Date();

    const [updatedEducation] = await db
      .update(education)
      .set(educationData)
      .where(eq(education.id, educationId))
      .returning();

    return updatedEducation || null;
  }

  async deleteEducation(educationId) {
    const [deletedEducation] = await db
      .delete(education)
      .where(eq(education.id, educationId))
      .returning();

    return !!deletedEducation;
  }
}

export const educationService = new EducationService();
export default EducationService;
