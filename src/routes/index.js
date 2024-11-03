import express from 'express';
import UserRoute from './UserRoute.js';
import RequestLeaveRoute from './RequestLeaveRoute.js';
import TimeTrackingRoute from './TimeTrackingRoute.js';
import TypeLeaveRoute from './TypeLeaveRoute.js';
import AuthRoute from './AuthRoute.js';

const router = express.Router();

// Regrouper les routes sous des préfixes
router.use('/users', UserRoute);
router.use('/request-leaves', RequestLeaveRoute);
router.use('/time-trackings', TimeTrackingRoute);
router.use('/type-leaves', TypeLeaveRoute);
router.use('/auth', AuthRoute);

export default router;
