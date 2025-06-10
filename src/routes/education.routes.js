import express from 'express';

import EducationController from '../controllers/education.controller.js';
import { JwtAuthGuard } from '../guard/jwt-auth.guard.js';
import { SelfGuard } from '../guard/self.guard.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Education:
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
 *         institution:
 *           type: string
 *           description: Name of the educational institution
 *         degree:
 *           type: string
 *           description: Degree earned
 *         fieldOfStudy:
 *           type: string
 *           description: Field or major of study
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date of education
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date of education
 *         grade:
 *           type: string
 *           description: Grade or GPA achieved
 *         description:
 *           type: string
 *           description: Additional details about the education
 *         country:
 *           type: string
 *           description: Country where the institution is located
 *         isForeign:
 *           type: boolean
 *           description: Whether this is a foreign education
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
 *         institution: Harvard University
 *         degree: Bachelor of Science
 *         fieldOfStudy: Computer Science
 *         startDate: 2019-09-01
 *         endDate: 2023-05-31
 *         grade: 3.8
 *         description: Graduated with honors
 *         country: United States
 *         isForeign: false
 *         createdAt: 2023-01-01T00:00:00.000Z
 *         updatedAt: 2023-01-01T00:00:00.000Z
 */

/**
 * @swagger
 * /educations:
 *   post:
 *     summary: Create a new education record
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *     responses:
 *       201:
 *         description: Education record created successfully
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
 *                   example: Education record created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Education'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 *   get:
 *     summary: Get all education records for the authenticated user
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of education records
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
 *                     $ref: '#/components/schemas/Education'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /users/{userId}/educations:
 *   get:
 *     summary: Get all education records for a specific user
 *     tags: [Education]
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
 *         description: List of education records
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
 *                     $ref: '#/components/schemas/Education'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /educations/{id}:
 *   get:
 *     summary: Get a specific education record by ID
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Education ID
 *     responses:
 *       200:
 *         description: Education record details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Education'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Education record not found
 *       500:
 *         description: Server error
 *
 *   patch:
 *     summary: Update an education record
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Education ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *     responses:
 *       200:
 *         description: Education record updated successfully
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
 *                   example: Education record updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Education'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Education record not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete an education record
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Education ID
 *     responses:
 *       200:
 *         description: Education record deleted successfully
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
 *                   example: Education record deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Education record not found
 *       500:
 *         description: Server error
 */

router
  .post('/educations', JwtAuthGuard, EducationController.createEducation)
  .get('/educations', JwtAuthGuard, EducationController.getUserEducations)
  .get('/users/:userId/educations', JwtAuthGuard, SelfGuard, EducationController.getUserEducations)
  .get('/educations/:id', JwtAuthGuard, EducationController.getEducationById)
  .patch('/educations/:id', JwtAuthGuard, EducationController.updateEducation)
  .delete('/educations/:id', JwtAuthGuard, EducationController.deleteEducation);

export default router;
