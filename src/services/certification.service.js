import { eq } from 'drizzle-orm';

import db from '../config/db.js';
import { certifications } from '../models/user-profile/certifications.model.js';

class CertificationService {
  async createCertification(certificationData) {
    const [newCertification] = await db
      .insert(certifications)
      .values(certificationData)
      .returning();
    return newCertification;
  }

  async getCertificationById(certificationId) {
    const [foundCertification] = await db
      .select()
      .from(certifications)
      .where(eq(certifications.id, certificationId))
      .limit(1);
    return foundCertification || null;
  }

  async getCertificationsByUserId(userId) {
    const userCertifications = await db
      .select()
      .from(certifications)
      .where(eq(certifications.userId, userId));
    return userCertifications;
  }

  async updateCertification(certificationId, certificationData) {
    certificationData.updatedAt = new Date();

    const [updatedCertification] = await db
      .update(certifications)
      .set(certificationData)
      .where(eq(certifications.id, certificationId))
      .returning();

    return updatedCertification || null;
  }

  async deleteCertification(certificationId) {
    const [deletedCertification] = await db
      .delete(certifications)
      .where(eq(certifications.id, certificationId))
      .returning();

    return !!deletedCertification;
  }
}

export const certificationService = new CertificationService();
export default CertificationService;
