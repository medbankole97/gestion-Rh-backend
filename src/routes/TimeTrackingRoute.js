// routes/timeTrackingRoutes.js
import express from 'express';
import TimeTrackingController from '../controllers/TimeTrackingController.js';
import { addTimeTrackingValidator, updateTimeTrackingValidator, deleteTimeTrackingValidator } from '../validators/TimeTrackingValidator.js';

const router = express.Router();


router.post('/', addTimeTrackingValidator, TimeTrackingController.createTimeTracking);

router.get('/', TimeTrackingController.getAllTimeTrackings);

router.get('/:id', TimeTrackingController.getTimeTrackingById);

router.put('/:id', updateTimeTrackingValidator, TimeTrackingController.updateTimeTracking);

router.delete('/:id', deleteTimeTrackingValidator, TimeTrackingController.deleteTimeTracking);

export default router;
