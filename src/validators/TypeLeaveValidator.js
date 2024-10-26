// validators/TypeLeaveValidator.js
import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import prisma from '../config/prisma.js';

// Validator for adding a type of leave
const addTypeLeaveValidator = [
  check('name')
    .notEmpty()
    .withMessage('Name cannot be empty!')
    .bail()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long!'),

  check('description')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Description must be at most 255 characters long!'),

  check('status')
    .notEmpty()
    .withMessage('Status cannot be empty!'),

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

// Validator for updating a type of leave
const updateTypeLeaveValidator = [
  param('id')
    .notEmpty()
    .withMessage('TypeLeave ID is required!')
    .bail()
    .custom(async (value) => {
      const result = await prisma.typeLeave.findUnique({ where: { id: parseInt(value) } });
      if (!result) {
        throw new Error('TypeLeave does not exist!');
      }
      return true;
    }),

  check('name')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long!'),

  check('description')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Description must be at most 255 characters long!'),

  check('status')
    .optional()
    .notEmpty()
    .withMessage('Status cannot be empty!'),

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

// Validator for deleting a type of leave
const deleteTypeLeaveValidator = [
  param('id')
    .notEmpty()
    .withMessage('TypeLeave ID is required!')
    .bail()
    .custom(async (value) => {
      const result = await prisma.typeLeave.findUnique({ where: { id: parseInt(value) } });
      if (!result) {
        throw new Error('TypeLeave does not exist!');
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

export { addTypeLeaveValidator, updateTypeLeaveValidator, deleteTypeLeaveValidator };
