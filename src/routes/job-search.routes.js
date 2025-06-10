import express from 'express';
import { searchJobs } from '../controllers/job/job-search.controller.js';
import { validateRequest } from '../middlewares/validate-request.js';
import Joi from 'joi';

const router = express.Router();

const searchJobsSchema = {
  query: Joi.object({
    keywords: Joi.string().trim(),
    country: Joi.string().trim(),
    city: Joi.string().trim(),
    category: Joi.string().trim(),
    type: Joi.string().valid('full-time', 'part-time'),
    experienceLevel: Joi.string().trim(),
    salaryMin: Joi.number().integer().min(0),
    salaryMax: Joi.number().integer().min(0),
    visaSponsorship: Joi.boolean().cast('string'),
    relocationAssistance: Joi.boolean().cast('string'),
    remoteOption: Joi.boolean().cast('string'),
    limit: Joi.number().integer().min(1).max(100).default(10),
    offset: Joi.number().integer().min(0).default(0)
  }).unknown(false)
};

// Root route that describes API
router.get('/', validateRequest(searchJobsSchema), searchJobs);

export default router; 