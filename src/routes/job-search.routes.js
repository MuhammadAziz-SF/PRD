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

/**
 * @swagger
 * components:
 *   schemas:
 *     JobSearchParams:
 *       type: object
 *       properties:
 *         keywords:
 *           type: string
 *           description: Search keywords in job title and description
 *         country:
 *           type: string
 *           description: Filter by country
 *         city:
 *           type: string
 *           description: Filter by city
 *         category:
 *           type: string
 *           description: Filter by job category
 *         type:
 *           type: string
 *           enum: [full-time, part-time]
 *           description: Filter by job type
 *         experienceLevel:
 *           type: string
 *           description: Filter by required experience level
 *         salaryMin:
 *           type: integer
 *           description: Minimum salary range
 *         salaryMax:
 *           type: integer
 *           description: Maximum salary range
 *         visaSponsorship:
 *           type: boolean
 *           description: Filter by visa sponsorship availability
 *         relocationAssistance:
 *           type: boolean
 *           description: Filter by relocation assistance availability
 *         remoteOption:
 *           type: boolean
 *           description: Filter by remote work option
 */

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job search and management
 */

/**
 * @swagger
 * /jobs/search:
 *   get:
 *     summary: Search for jobs with various filters
 *     description: Search and filter jobs based on multiple criteria including keywords, location, job type, salary, and more.
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: keywords
 *         schema:
 *           type: string
 *         description: Search keywords in job title and description
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filter by country
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by job category
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [full-time, part-time]
 *         description: Filter by job type
 *       - in: query
 *         name: experienceLevel
 *         schema:
 *           type: string
 *         description: Filter by required experience level
 *       - in: query
 *         name: salaryMin
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Minimum salary range
 *       - in: query
 *         name: salaryMax
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Maximum salary range
 *       - in: query
 *         name: visaSponsorship
 *         schema:
 *           type: boolean
 *         description: Filter by visa sponsorship availability
 *       - in: query
 *         name: relocationAssistance
 *         schema:
 *           type: boolean
 *         description: Filter by relocation assistance availability
 *       - in: query
 *         name: remoteOption
 *         schema:
 *           type: boolean
 *         description: Filter by remote work option
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of results per page
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of results to skip
 *     responses:
 *       200:
 *         description: A list of jobs matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobSearchResponse'
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Root route that describes API
router.get('/', validateRequest(searchJobsSchema), searchJobs);

export default router; 