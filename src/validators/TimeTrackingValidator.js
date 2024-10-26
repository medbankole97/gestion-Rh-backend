// validators/TimeTrackingValidator.js
import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import prisma from '../config/prisma.js';

// Validator for adding a time tracking entry
const addTimeTrackingValidator = [
  check('checkin_time')
    .notEmpty()
    .withMessage('Check-in time cannot be empty!')
    .isISO8601()
    .toDate()
    .withMessage('Check-in time must be a valid date!'),

  check('checkout_time')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Checkout time must be a valid date!'),

  check('employeeId')
    .notEmpty()
    .withMessage('Employee ID cannot be empty!')
    .bail()
    .isInt()
    .withMessage('Employee ID must be an integer!')
    .custom(async (value) => {
      const employee = await prisma.employee.findUnique({ where: { id: value } });
      if (!employee) {
        throw new Error('Employee does not exist!');
      }
      return true;
    }),

  check('userId')
    .notEmpty()
    .withMessage('User ID cannot be empty!')
    .isInt()
    .withMessage('User ID must be an integer!'),

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

// Validator for updating a time tracking entry
const updateTimeTrackingValidator = [
  param('id')
    .notEmpty()
    .withMessage('TimeTracking ID is required!')
    .bail()
    .isInt()
    .withMessage('TimeTracking ID must be an integer!')
    .custom(async (value) => {
      const result = await prisma.timeTracking.findUnique({ where: { id: parseInt(value) } });
      if (!result) {
        throw new Error('TimeTracking does not exist!');
      }
      return true;
    }),

  check('checkin_time')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Check-in time must be a valid date!'),

  check('checkout_time')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Checkout time must be a valid date!'),

  check('employeeId')
    .optional()
    .isInt()
    .withMessage('Employee ID must be an integer!'),

  check('userId')
    .optional()
    .isInt()
    .withMessage('User ID must be an integer!'),

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

// Validator for deleting a time tracking entry
const deleteTimeTrackingValidator = [
  param('id')
    .notEmpty()
    .withMessage('TimeTracking ID is required!')
    .isInt()
    .withMessage('TimeTracking ID must be an integer!')
    .bail()
    .custom(async (value) => {
      const result = await prisma.timeTracking.findUnique({ where: { id: parseInt(value) } });
      if (!result) {
        throw new Error('TimeTracking does not exist!');
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

export { addTimeTrackingValidator, updateTimeTrackingValidator, deleteTimeTrackingValidator };
