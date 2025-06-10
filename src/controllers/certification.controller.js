import { certificationService } from '../services/certification.service.js';

class CertificationController {
  async createCertification(req, res, next) {
    try {
      const certificationData = req.body;
      certificationData.userId = req.user.id;

      const newCertification = await certificationService.createCertification(certificationData);

      res.status(201).json({
        success: true,
        message: 'Certification created successfully',
        data: newCertification,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCertificationById(req, res, next) {
    try {
      const { id } = req.params;
      const certification = await certificationService.getCertificationById(id);

      if (!certification) {
        return res.status(404).json({
          success: false,
          message: 'Certification not found',
        });
      }

      if (certification.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this certification',
        });
      }

      res.status(200).json({
        success: true,
        data: certification,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserCertifications(req, res, next) {
    try {
      const userId = req.params.userId || req.user.id;

      if (userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to these certifications',
        });
      }

      const certifications = await certificationService.getCertificationsByUserId(userId);

      res.status(200).json({
        success: true,
        count: certifications.length,
        data: certifications,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCertification(req, res, next) {
    try {
      const { id } = req.params;
      const certificationData = req.body;

      const existingCertification = await certificationService.getCertificationById(id);
      if (!existingCertification) {
        return res.status(404).json({
          success: false,
          message: 'Certification not found',
        });
      }

      if (existingCertification.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this certification',
        });
      }

      const updatedCertification = await certificationService.updateCertification(
        id,
        certificationData
      );

      res.status(200).json({
        success: true,
        message: 'Certification updated successfully',
        data: updatedCertification,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCertification(req, res, next) {
    try {
      const { id } = req.params;

      const existingCertification = await certificationService.getCertificationById(id);
      if (!existingCertification) {
        return res.status(404).json({
          success: false,
          message: 'Certification not found',
        });
      }

      if (existingCertification.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this certification',
        });
      }

      await certificationService.deleteCertification(id);

      res.status(200).json({
        success: true,
        message: 'Certification deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

const Certification = new CertificationController();
export default Certification;
