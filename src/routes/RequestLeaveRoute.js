// routes/requestLeaveRoutes.js
import express from 'express';
import RequestLeaveController from '../controllers/RequestLeaveController.js';
import { addRequestLeaveValidator, updateRequestLeaveValidator, deleteRequestLeaveValidator } from '../validators/RequestLeaveValidator.js';

const router = express.Router();

router.post('/', addRequestLeaveValidator, RequestLeaveController.createRequestLeave);

router.get('/', RequestLeaveController.getAllRequestLeaves);

router.get('/:id', RequestLeaveController.getRequestLeaveById);

router.put('/:id', updateRequestLeaveValidator, RequestLeaveController.updateRequestLeave);

router.delete('/:id', deleteRequestLeaveValidator, RequestLeaveController.deleteRequestLeave);

export default router;
