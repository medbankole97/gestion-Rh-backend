// validators/AuthValidator.js
import { check, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import prisma from '../config/prisma.js';

// Validator for user registration
const registerValidator = [
  check('username')
    .notEmpty()
    .withMessage('Username cannot be empty!')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long!')
    .custom(async (value) => {
      const user = await prisma.user.findUnique({ where: { username: value } });
      if (user) {
        throw new Error('Username already in use!');
      }
      return true;
    }),

  check('email')
    .notEmpty()
    .withMessage('Email cannot be empty!')
    .isEmail()
    .withMessage('Must be a valid email address!')
    .custom(async (value) => {
      const user = await prisma.user.findUnique({ where: { email: value } });
      if (user) {
        throw new Error('Email already in use!');
      }
      return true;
    }),

  check('password')
    .notEmpty()
    .withMessage('Password cannot be empty!')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long!'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for user login
const loginValidator = [
  check('email')
    .notEmpty()
    .withMessage('Email cannot be empty!')
    .isEmail()
    .withMessage('Must be a valid email address!'),

  check('password').notEmpty().withMessage('Password cannot be empty!'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

export { registerValidator, loginValidator };
