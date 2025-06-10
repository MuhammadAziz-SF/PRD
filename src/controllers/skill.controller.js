import { skillService } from '../services/skill.service.js';

class SkillController {
  async createSkill(req, res, next) {
    try {
      const skillData = req.body;
      skillData.userId = req.user.id;

      const newSkill = await skillService.createSkill(skillData);

      res.status(201).json({
        success: true,
        message: 'Skill created successfully',
        data: newSkill,
      });
    } catch (error) {
      next(error);
    }
  }

  async getSkillById(req, res, next) {
    try {
      const { id } = req.params;
      const skill = await skillService.getSkillById(id);

      if (!skill) {
        return res.status(404).json({
          success: false,
          message: 'Skill not found',
        });
      }

      if (skill.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this skill',
        });
      }

      res.status(200).json({
        success: true,
        data: skill,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserSkills(req, res, next) {
    try {
      const userId = req.params.userId || req.user.id;

      if (userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to these skills',
        });
      }

      const skills = await skillService.getSkillsByUserId(userId);

      res.status(200).json({
        success: true,
        count: skills.length,
        data: skills,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSkill(req, res, next) {
    try {
      const { id } = req.params;
      const skillData = req.body;

      const existingSkill = await skillService.getSkillById(id);
      if (!existingSkill) {
        return res.status(404).json({
          success: false,
          message: 'Skill not found',
        });
      }

      if (existingSkill.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this skill',
        });
      }

      const updatedSkill = await skillService.updateSkill(id, skillData);

      res.status(200).json({
        success: true,
        message: 'Skill updated successfully',
        data: updatedSkill,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteSkill(req, res, next) {
    try {
      const { id } = req.params;

      const existingSkill = await skillService.getSkillById(id);
      if (!existingSkill) {
        return res.status(404).json({
          success: false,
          message: 'Skill not found',
        });
      }

      if (existingSkill.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this skill',
        });
      }

      await skillService.deleteSkill(id);

      res.status(200).json({
        success: true,
        message: 'Skill deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

const Skill = new SkillController();
export default Skill;
