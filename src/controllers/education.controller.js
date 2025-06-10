import { educationService } from '../services/education.service.js';

class EducationController {
  async createEducation(req, res, next) {
    try {
      const educationData = req.body;
      educationData.userId = req.user.id;

      const newEducation = await educationService.createEducation(educationData);

      res.status(201).json({
        success: true,
        message: 'Education record created successfully',
        data: newEducation,
      });
    } catch (error) {
      next(error);
    }
  }

  async getEducationById(req, res, next) {
    try {
      const { id } = req.params;
      const education = await educationService.getEducationById(id);

      if (!education) {
        return res.status(404).json({
          success: false,
          message: 'Education record not found',
        });
      }

      if (education.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this education record',
        });
      }

      res.status(200).json({
        success: true,
        data: education,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserEducations(req, res, next) {
    try {
      const userId = req.params.userId || req.user.id;

      if (userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to these education records',
        });
      }

      const educations = await educationService.getEducationsByUserId(userId);

      res.status(200).json({
        success: true,
        count: educations.length,
        data: educations,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateEducation(req, res, next) {
    try {
      const { id } = req.params;
      const educationData = req.body;

      const existingEducation = await educationService.getEducationById(id);
      if (!existingEducation) {
        return res.status(404).json({
          success: false,
          message: 'Education record not found',
        });
      }

      if (existingEducation.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this education record',
        });
      }

      const updatedEducation = await educationService.updateEducation(id, educationData);

      res.status(200).json({
        success: true,
        message: 'Education record updated successfully',
        data: updatedEducation,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteEducation(req, res, next) {
    try {
      const { id } = req.params;

      const existingEducation = await educationService.getEducationById(id);
      if (!existingEducation) {
        return res.status(404).json({
          success: false,
          message: 'Education record not found',
        });
      }

      if (existingEducation.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this education record',
        });
      }

      await educationService.deleteEducation(id);

      res.status(200).json({
        success: true,
        message: 'Education record deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

const Education = new EducationController();
export default Education;
