import express from 'express';

import LanguageController from '../controllers/language.controller.js';
import { JwtAuthGuard } from '../guard/jwt-auth.guard.js';
import { SelfGuard } from '../guard/self.guard.js';

const router = express.Router();

router
  .post('/languages', JwtAuthGuard, LanguageController.createLanguage)
  .get('/languages', JwtAuthGuard, LanguageController.getUserLanguages)
  .get('/users/:userId/languages', JwtAuthGuard, SelfGuard, LanguageController.getUserLanguages)
  .get('/languages/:id', JwtAuthGuard, LanguageController.getLanguageById)
  .patch('/languages/:id', JwtAuthGuard, LanguageController.updateLanguage)
  .delete('/languages/:id', JwtAuthGuard, LanguageController.deleteLanguage);

export default router;
