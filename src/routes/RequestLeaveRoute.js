// routes/requestLeaveRoutes.js
import express from 'express';
import RequestLeaveController from '../controllors/RequestLeaveController.js';
import {
  addRequestLeaveValidator,
  updateRequestLeaveValidator,
  deleteRequestLeaveValidator,
} from '../validators/RequestLeaveValidator.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js'; // Assurez-vous que le chemin est correct

const router = express.Router();

router.post(
  '',
  authenticateToken,
  addRequestLeaveValidator,
  RequestLeaveController.createRequestLeave
);

router.get('/', authenticateToken, RequestLeaveController.getAllRequestLeaves);

router.get(
  '/:id',
  authenticateToken,
  RequestLeaveController.getRequestLeaveById
);

router.put(
  '/:id',
  authenticateToken,
  updateRequestLeaveValidator,
  RequestLeaveController.updateRequestLeave
);

router.delete(
  '/:id',
  authenticateToken,
  deleteRequestLeaveValidator,
  RequestLeaveController.deleteRequestLeave
);

export default router;
