import express from 'express';

import SkillController from '../controllers/skill.controller.js';
import { JwtAuthGuard } from '../guard/jwt-auth.guard.js';
import { SelfGuard } from '../guard/self.guard.js';

const router = express.Router();

router
  .post('/skills', JwtAuthGuard, SkillController.createSkill)
  .get('/skills', JwtAuthGuard, SkillController.getUserSkills)
  .get('/users/:userId/skills', JwtAuthGuard, SelfGuard, SkillController.getUserSkills)
  .get('/skills/:id', JwtAuthGuard, SkillController.getSkillById)
  .patch('/skills/:id', JwtAuthGuard, SkillController.updateSkill)
  .delete('/skills/:id', JwtAuthGuard, SkillController.deleteSkill);

export default router;
