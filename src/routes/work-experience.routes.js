import express from 'express';

import WorkExperienceController from '../controllers/work-experience.controller.js';
import { JwtAuthGuard } from '../guard/jwt-auth.guard.js';
import { SelfGuard } from '../guard/self.guard.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     WorkExperience:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated unique identifier
 *         userId:
 *           type: string
 *           format: uuid
 *           description: Reference to the user
 *         companyName:
 *           type: string
 *           description: Name of the company
 *         position:
 *           type: string
 *           description: Job title or position
 *         location:
 *           type: string
 *           description: Location of the job
 *         country:
 *           type: string
 *           description: Country where job was performed
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date of employment
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date of employment
 *         currentJobStatus:
 *           type: string
 *           enum: [active, inactive, terminated]
 *           description: Current status of the job
 *         description:
 *           type: string
 *           description: Job description or responsibilities
 *         isForeign:
 *           type: boolean
 *           description: Whether this is a foreign work experience
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *       example:
 *         id: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *         userId: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *         companyName: Google Inc.
 *         position: Software Engineer
 *         location: Mountain View, CA
 *         country: USA
 *         startDate: 2020-01-15
 *         endDate: 2022-07-31
 *         currentJobStatus: inactive
 *         description: Worked on search algorithms and infrastructure
 *         isForeign: false
 *         createdAt: 2023-01-01T00:00:00.000Z
 *         updatedAt: 2023-01-01T00:00:00.000Z
 */

/**
 * @swagger
 * /work-experiences:
 *   post:
 *     summary: Create a new work experience
 *     tags: [Work Experiences]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkExperience'
 *     responses:
 *       201:
 *         description: Work experience created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Work experience created successfully
 *                 data:
 *                   $ref: '#/components/schemas/WorkExperience'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 *   get:
 *     summary: Get all work experiences for the authenticated user
 *     tags: [Work Experiences]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of work experiences
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WorkExperience'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /users/{userId}/work-experiences:
 *   get:
 *     summary: Get all work experiences for a specific user
 *     tags: [Work Experiences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of work experiences
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WorkExperience'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /work-experiences/{id}:
 *   get:
 *     summary: Get a specific work experience by ID
 *     tags: [Work Experiences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Work Experience ID
 *     responses:
 *       200:
 *         description: Work experience details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/WorkExperience'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Work experience not found
 *       500:
 *         description: Server error
 *
 *   patch:
 *     summary: Update a work experience
 *     tags: [Work Experiences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Work Experience ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkExperience'
 *     responses:
 *       200:
 *         description: Work experience updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Work experience updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/WorkExperience'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Work experience not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a work experience
 *     tags: [Work Experiences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Work Experience ID
 *     responses:
 *       200:
 *         description: Work experience deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Work experience deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Work experience not found
 *       500:
 *         description: Server error
 */

router
  .post('/work-experiences', JwtAuthGuard, WorkExperienceController.createWorkExperience)
  .get('/work-experiences', JwtAuthGuard, WorkExperienceController.getUserWorkExperiences)
  .get(
    '/users/:userId/work-experiences',
    JwtAuthGuard,
    SelfGuard,
    WorkExperienceController.getUserWorkExperiences
  )
  .get('/work-experiences/:id', JwtAuthGuard, WorkExperienceController.getWorkExperienceById)
  .patch('/work-experiences/:id', JwtAuthGuard, WorkExperienceController.updateWorkExperience)
  .delete('/work-experiences/:id', JwtAuthGuard, WorkExperienceController.deleteWorkExperience);

export default router;
