import express from 'express';

import * as AuthController from '../controllers/auth.controller.js';
import { JwtAuthGuard } from '../guard/jwt-auth.guard.js';
import { SelfGuard } from '../guard/self.guard.js';
import { AdminGuard } from '../guard/admin.guard.js';

const router = express.Router();

router
  .get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Auth API',
      availableEndpoints: [
        { path: '/api/auth/signUp', method: 'POST', description: 'Register a new user' },
        { path: '/api/auth/singIn', method: 'POST', description: 'Login a user' },
        { path: '/api/auth/users', method: 'GET', description: 'Get all users (requires authentication)' },
        { path: '/api/auth/user/:id', method: 'GET', description: 'Get a user by ID (requires authentication)' },
        { path: '/api/auth/user/:id', method: 'PATCH', description: 'Update a user (requires authentication)' },
        { path: '/api/auth/user/:id', method: 'DELETE', description: 'Delete a user (requires admin role)' }
      ]
    });
  })
  .post('/signUp', AuthController.signUp)
  .post('/singIn', AuthController.singIn)
  .get('/users', JwtAuthGuard, AuthController.getUsers)
  .get('/user/:id', JwtAuthGuard, SelfGuard, AuthController.getUserByID)
  .patch('/user/:id', JwtAuthGuard, SelfGuard, AuthController.updateUserById)
  .delete('/user/:id', JwtAuthGuard, AdminGuard, AuthController.deleteUserById);

export default router;
