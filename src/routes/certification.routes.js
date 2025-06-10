import express from 'express';

import CertificationController from '../controllers/certification.controller.js';
import { JwtAuthGuard } from '../guard/jwt-auth.guard.js';
import { SelfGuard } from '../guard/self.guard.js';

const router = express.Router();

router
  .post('/certifications', JwtAuthGuard, CertificationController.createCertification)
  .get('/certifications', JwtAuthGuard, CertificationController.getUserCertifications)
  .get('/users/:userId/certifications', JwtAuthGuard, SelfGuard, CertificationController.getUserCertifications)
  .get('/certifications/:id', JwtAuthGuard, CertificationController.getCertificationById)
  .patch('/certifications/:id', JwtAuthGuard, CertificationController.updateCertification)
  .delete('/certifications/:id', JwtAuthGuard, CertificationController.deleteCertification);

export default router;
