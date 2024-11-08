import express from 'express';
import UserController from '../controllors/UserController.js';
import {
  addUserValidator,
  updateUserValidator,
  deleteUserValidator,
} from '../validators/UserValidator.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

// Routes utilisateurs
router.post('/',addUserValidator, UserController.createUser);
router.get('/',  UserController.getAllUsers);
router.get('/:id', 
//  authenticateToken, 
UserController.getUserById);
router.put(
  '/:id',
  // authenticateToken,
  // authorizeRole('ADMIN'),
  updateUserValidator,
  UserController.updateUser
);
router.delete(
  '/:id',
  // authenticateToken,
  // authorizeRole('ADMIN'), 
  deleteUserValidator,
  UserController.deleteUser
);
router.post('/request-password-reset', UserController.requestPasswordReset);
router.post('/reset-password', UserController.handleResetPassword);

export default router;
