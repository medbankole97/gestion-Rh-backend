import express from 'express';
import TypeLeaveController from '../controllors/TypeLeaveController.js';
import {
  addTypeLeaveValidator,
  updateTypeLeaveValidator,
  deleteTypeLeaveValidator,
} from '../validators/TypeLeaveValidator.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js'; // Assurez-vous que le chemin est correct

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  addTypeLeaveValidator,
  TypeLeaveController.createTypeLeave
);

router.get('/', authenticateToken,TypeLeaveController.getAllTypeLeaves);

router.get('/:id', authenticateToken, TypeLeaveController.getTypeLeaveById);

router.put(
  '/:id',
  authenticateToken,
  updateTypeLeaveValidator,
  TypeLeaveController.updateTypeLeave
);

router.delete(
  '/:id',
  authenticateToken,
  deleteTypeLeaveValidator,
  TypeLeaveController.deleteTypeLeave
);

export default router;
