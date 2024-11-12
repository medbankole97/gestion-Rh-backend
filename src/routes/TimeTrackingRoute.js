// routes/timeTrackingRoutes.js
import express from 'express';
import TimeTrackingController from '../controllors/TimeTrackingController.js';
import {
  addTimeTrackingValidator,
  updateTimeTrackingValidator,
  deleteTimeTrackingValidator,
} from '../validators/TimeTrackingValidator.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js'; // Assurez-vous que le chemin est correct

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  addTimeTrackingValidator,
  TimeTrackingController.createTimeTracking
);

router.get('/', authenticateToken, TimeTrackingController.getAllTimeTrackings);

router.get(
  '/:id',
  authenticateToken,
  TimeTrackingController.getTimeTrackingById
);

router.put(
  '/:id',
  authenticateToken,
  updateTimeTrackingValidator,
  TimeTrackingController.updateTimeTracking
);

router.delete(
  '/:id',
  authenticateToken,
  deleteTimeTrackingValidator,
  TimeTrackingController.deleteTimeTracking
);

export default router;
