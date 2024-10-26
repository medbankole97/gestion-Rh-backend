// validators/UserValidator.js
import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import prisma from '../config/prisma.js';

// Validator for adding a user
const addUserValidator = [
  check('fullname')
    .notEmpty()
    .withMessage('Fullname cannot be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Fullname must be at least 3 characters long!'),

  check('email')
    .notEmpty()
    .withMessage('Email cannot be empty!')
    .bail()
    .isEmail()
    .withMessage('Invalid email format!'),

  check('password')
    .notEmpty()
    .withMessage('Password cannot be empty!')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long!'),

  check('role')
    .optional()
    .isIn(['admin', 'user'])
    .withMessage('Role must be either "admin" or "user"!'),

  check('status')
    .optional()
    .isIn(['active', 'inactive'])
    .withMessage('Status must be either "active" or "inactive"!'),

  check('employeeId')
    .optional()
    .isNumeric()
    .withMessage('Employee ID must be a number!'),

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

// Validator for updating a user
const updateUserValidator = [
  param('id')
    .notEmpty()
    .withMessage('User ID is required!')
    .bail()
    .custom(async (value) => {
      const result = await prisma.user.findUnique({ where: { id: parseInt(value) } });
      if (!result) {
        throw new Error('User does not exist!');
      }
      return true;
    }),

  check('fullname')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Fullname must be at least 3 characters long!'),

  check('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format!'),

  check('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long!'),

  check('role')
    .optional()
    .isIn(['admin', 'user'])
    .withMessage('Role must be either "admin" or "user"!'),

  check('status')
    .optional()
    .isIn(['active', 'inactive'])
    .withMessage('Status must be either "active" or "inactive"!'),

  check('employeeId')
    .optional()
    .isNumeric()
    .withMessage('Employee ID must be a number!'),

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

// Validator for deleting a user
const deleteUserValidator = [
  param('id')
    .notEmpty()
    .withMessage('User ID is required!')
    .bail()
    .custom(async (value) => {
      const result = await prisma.user.findUnique({ where: { id: parseInt(value) } });
      if (!result) {
        throw new Error('User does not exist!');
      }
      return true;
    }),

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

export { addUserValidator, updateUserValidator, deleteUserValidator };
