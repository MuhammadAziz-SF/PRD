import { eq } from 'drizzle-orm';

import db from '../config/db.js';
import { skills } from '../models/user-profile/skills.model.js';

class SkillService {
  async createSkill(skillData) {
    const [newSkill] = await db.insert(skills).values(skillData).returning();
    return newSkill;
  }

  async getSkillById(skillId) {
    const [foundSkill] = await db.select().from(skills).where(eq(skills.id, skillId)).limit(1);
    return foundSkill || null;
  }

  async getSkillsByUserId(userId) {
    const userSkills = await db.select().from(skills).where(eq(skills.userId, userId));
    return userSkills;
  }

  async updateSkill(skillId, skillData) {
    skillData.updatedAt = new Date();

    const [updatedSkill] = await db
      .update(skills)
      .set(skillData)
      .where(eq(skills.id, skillId))
      .returning();

    return updatedSkill || null;
  }

  async deleteSkill(skillId) {
    const [deletedSkill] = await db.delete(skills).where(eq(skills.id, skillId)).returning();

    return !!deletedSkill;
  }
}

export const skillService = new SkillService();
export default SkillService;
