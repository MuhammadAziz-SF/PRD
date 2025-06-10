import { workExperienceService } from '../services/work-experience.service.js';

class WorkExperienceController {
  async createWorkExperience(req, res, next) {
    try {
      const workExperienceData = req.body;
      workExperienceData.userId = req.user.id;

      const newWorkExperience =
        await workExperienceService.createWorkExperience(workExperienceData);

      res.status(201).json({
        success: true,
        message: 'Work experience created successfully',
        data: newWorkExperience,
      });
    } catch (error) {
      next(error);
    }
  }

  async getWorkExperienceById(req, res, next) {
    try {
      const { id } = req.params;
      const workExperience = await workExperienceService.getWorkExperienceById(id);

      if (!workExperience) {
        return res.status(404).json({
          success: false,
          message: 'Work experience not found',
        });
      }

      if (workExperience.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this work experience',
        });
      }

      res.status(200).json({
        success: true,
        data: workExperience,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserWorkExperiences(req, res, next) {
    try {
      const userId = req.params.userId || req.user.id;

      if (userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to these work experiences',
        });
      }

      const workExperiences = await workExperienceService.getWorkExperiencesByUserId(userId);

      res.status(200).json({
        success: true,
        count: workExperiences.length,
        data: workExperiences,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateWorkExperience(req, res, next) {
    try {
      const { id } = req.params;
      const workExperienceData = req.body;

      const existingWorkExperience = await workExperienceService.getWorkExperienceById(id);
      if (!existingWorkExperience) {
        return res.status(404).json({
          success: false,
          message: 'Work experience not found',
        });
      }

      if (existingWorkExperience.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this work experience',
        });
      }

      const updatedWorkExperience = await workExperienceService.updateWorkExperience(
        id,
        workExperienceData
      );

      res.status(200).json({
        success: true,
        message: 'Work experience updated successfully',
        data: updatedWorkExperience,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteWorkExperience(req, res, next) {
    try {
      const { id } = req.params;

      const existingWorkExperience = await workExperienceService.getWorkExperienceById(id);
      if (!existingWorkExperience) {
        return res.status(404).json({
          success: false,
          message: 'Work experience not found',
        });
      }

      if (existingWorkExperience.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this work experience',
        });
      }

      await workExperienceService.deleteWorkExperience(id);

      res.status(200).json({
        success: true,
        message: 'Work experience deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

const WorkExperience = new WorkExperienceController();
export default WorkExperience;
