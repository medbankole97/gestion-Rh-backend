import express from 'express';
import AuthController from '../controllors/AuthController.js';
import { check } from 'express-validator';

const router = express.Router();

router.post(
  '/register',
  [
    check('fullname').notEmpty().withMessage('Fullname is required'),
    check('email').isEmail().withMessage('Email is not valid'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  AuthController.register
);

router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Email is not valid'),
    check('password').notEmpty().withMessage('Password is required'),
  ],
  AuthController.login
);

export default router;
