import express from 'express';

import CertificationController from '../controllers/certification.controller.js';
import { JwtAuthGuard } from '../guard/jwt-auth.guard.js';
import { SelfGuard } from '../guard/self.guard.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Certification:
 *       type: object
 *       required:
 *         - name
 *         - issuingOrganization
 *         - credentialId
 *         - credentialUrl
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated unique identifier
 *         userId:
 *           type: string
 *           format: uuid
 *           description: Reference to the user
 *         name:
 *           type: string
 *           description: Name of the certification
 *         issuingOrganization:
 *           type: string
 *           description: Organization that issued the certification
 *         issueDate:
 *           type: string
 *           format: date
 *           description: Date the certification was issued
 *         expirationDate:
 *           type: string
 *           format: date
 *           description: Date the certification expires
 *         credentialId:
 *           type: string
 *           description: Credential identifier
 *         credentialUrl:
 *           type: string
 *           description: URL where the credential can be verified
 *         isForeign:
 *           type: boolean
 *           description: Whether the certification is from a foreign entity
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
 *         name: AWS Certified Solutions Architect
 *         issuingOrganization: Amazon Web Services
 *         issueDate: 2023-01-01
 *         expirationDate: 2026-01-01
 *         credentialId: AWS-123456
 *         credentialUrl: https://aws.amazon.com/verification
 *         isForeign: false
 *         createdAt: 2023-01-01T00:00:00.000Z
 *         updatedAt: 2023-01-01T00:00:00.000Z
 */

/**
 * @swagger
 * /certifications:
 *   post:
 *     summary: Create a new certification
 *     tags: [Certifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certification'
 *     responses:
 *       201:
 *         description: Certification created successfully
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
 *                   example: Certification created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Certification'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 *   get:
 *     summary: Get all certifications for the authenticated user
 *     tags: [Certifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of certifications
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
 *                     $ref: '#/components/schemas/Certification'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /users/{userId}/certifications:
 *   get:
 *     summary: Get all certifications for a specific user
 *     tags: [Certifications]
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
 *         description: List of certifications
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
 *                     $ref: '#/components/schemas/Certification'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /certifications/{id}:
 *   get:
 *     summary: Get a specific certification by ID
 *     tags: [Certifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Certification ID
 *     responses:
 *       200:
 *         description: Certification details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Certification'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Certification not found
 *       500:
 *         description: Server error
 *
 *   patch:
 *     summary: Update a certification
 *     tags: [Certifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Certification ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certification'
 *     responses:
 *       200:
 *         description: Certification updated successfully
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
 *                   example: Certification updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Certification'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Certification not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a certification
 *     tags: [Certifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Certification ID
 *     responses:
 *       200:
 *         description: Certification deleted successfully
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
 *                   example: Certification deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Certification not found
 *       500:
 *         description: Server error
 */

router
  .post('/certifications', JwtAuthGuard, CertificationController.createCertification)
  .get('/certifications', JwtAuthGuard, CertificationController.getUserCertifications)
  .get(
    '/users/:userId/certifications',
    JwtAuthGuard,
    SelfGuard,
    CertificationController.getUserCertifications
  )
  .get('/certifications/:id', JwtAuthGuard, CertificationController.getCertificationById)
  .patch('/certifications/:id', JwtAuthGuard, CertificationController.updateCertification)
  .delete('/certifications/:id', JwtAuthGuard, CertificationController.deleteCertification);

export default router;
