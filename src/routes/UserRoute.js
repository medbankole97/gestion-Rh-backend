import express from 'express';
import UserController from '../controllers/UserController.js';
import { addUserValidator, updateUserValidator, deleteUserValidator } from '../validators/UserValidator.js';

const router = express.Router();

router.post('/', addUserValidator, UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', updateUserValidator, UserController.updateUser);
router.delete('/:id', deleteUserValidator, UserController.deleteUser);

export default router;
