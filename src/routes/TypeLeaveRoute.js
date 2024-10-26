import express from 'express';
import TypeLeaveController from '../controllers/TypeLeaveController.js';
import { addTypeLeaveValidator, updateTypeLeaveValidator, deleteTypeLeaveValidator } from '../validators/TypeLeaveValidator.js';

const router = express.Router();

// Create a new type of leaverouter.post('/', addTypeLeaveValidator, TypeLeaveController.createTypeLeave);

router.get('/', TypeLeaveController.getAllTypeLeaves);

router.get('/:id', TypeLeaveController.getTypeLeaveById);

router.put('/:id', updateTypeLeaveValidator, TypeLeaveController.updateTypeLeave);

router.delete('/:id', deleteTypeLeaveValidator, TypeLeaveController.deleteTypeLeave);

export default router;
