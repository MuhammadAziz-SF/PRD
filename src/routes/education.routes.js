import express from 'express';

import EducationController from '../controllers/education.controller.js';
import { JwtAuthGuard } from '../guard/jwt-auth.guard.js';
import { SelfGuard } from '../guard/self.guard.js';

const router = express.Router();

router
  .post('/education', JwtAuthGuard, EducationController.createEducation)
  .get('/education', JwtAuthGuard, EducationController.getUserEducation)
  .get('/users/:userId/education', JwtAuthGuard, SelfGuard, EducationController.getUserEducation)
  .get('/education/:id', JwtAuthGuard, EducationController.getEducationById)
  .patch('/education/:id', JwtAuthGuard, EducationController.updateEducation)
  .delete('/education/:id', JwtAuthGuard, EducationController.deleteEducation);

export default router;
