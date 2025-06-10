import { eq } from 'drizzle-orm';

import db from '../config/db.js';
import { languages } from '../models/user-profile/languages.model.js';

class LanguageService {
  async createLanguage(languageData) {
    const [newLanguage] = await db.insert(languages).values(languageData).returning();
    return newLanguage;
  }

  async getLanguageById(languageId) {
    const [foundLanguage] = await db
      .select()
      .from(languages)
      .where(eq(languages.id, languageId))
      .limit(1);
    return foundLanguage || null;
  }

  async getLanguagesByUserId(userId) {
    const userLanguages = await db.select().from(languages).where(eq(languages.userId, userId));
    return userLanguages;
  }

  async updateLanguage(languageId, languageData) {
    languageData.updatedAt = new Date();

    const [updatedLanguage] = await db
      .update(languages)
      .set(languageData)
      .where(eq(languages.id, languageId))
      .returning();

    return updatedLanguage || null;
  }

  async deleteLanguage(languageId) {
    const [deletedLanguage] = await db
      .delete(languages)
      .where(eq(languages.id, languageId))
      .returning();

    return !!deletedLanguage;
  }
}

export const languageService = new LanguageService();
export default LanguageService;
