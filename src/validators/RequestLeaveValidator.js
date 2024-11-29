// validators/RequestLeaveValidator.js
import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import prisma from '../config/prisma.js';

// Validator for adding a leave request
const addRequestLeaveValidator = [
  check('start_date')
    .notEmpty()
    .withMessage('Start date cannot be empty!')
    .isISO8601()
    .toDate()
    .withMessage('Start date must be a valid date!'),

  check('end_date')
    .notEmpty()
    .withMessage('End date cannot be empty!')
    .isISO8601()
    .toDate()
    .withMessage('End date must be a valid date!'),

  check('motif')
    .notEmpty()
    .withMessage('Motif cannot be empty!'),
    // .isLength({ max: 255 })
    // .withMessage('Motif must not exceed 255 characters!'),

  check('typeLeaveId')
    .notEmpty()
    .withMessage('Type leave ID cannot be empty!')
    .isInt()
    .withMessage('Type leave ID must be an integer!')
    .custom(async (value) => {
      const typeLeave = await prisma.typeLeave.findUnique({
        where: { id: value },
      });
      if (!typeLeave) {
        throw new Error('Type leave does not exist!');
      }
      return true;
    }),

  // La validation de userId est maintenant supprimée, car elle n'est pas nécessaire.

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

// Validator for updating a leave request
const updateRequestLeaveValidator = [
  param('id')
    .notEmpty()
    .withMessage('RequestLeave ID is required!')
    .isInt()
    .withMessage('RequestLeave ID must be an integer!')
    .custom(async (value) => {
      const result = await prisma.requestLeave.findUnique({
        where: { id: parseInt(value) },
      });
      if (!result) {
        throw new Error('RequestLeave does not exist!');
      }
      return true;
    }),

  check('start_date')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Start date must be a valid date!'),

  check('end_date')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('End date must be a valid date!'),

  check('motif')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Motif must not exceed 255 characters!'),

  check('typeLeaveId')
    .optional()
    .isInt()
    .withMessage('Type leave ID must be an integer!'),

  check('employeeId')
    .optional()
    .isInt()
    .withMessage('Employee ID must be an integer!')
    .custom(async (value) => {
      const employee = await prisma.employee.findUnique({
        where: { id: value },
      });
      if (!employee) {
        throw new Error('Employee does not exist!');
      }
      return true;
    }),

  // La validation de userId est maintenant supprimée.

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

// Validator for deleting a leave request
const deleteRequestLeaveValidator = [
  param('id')
    .notEmpty()
    .withMessage('RequestLeave ID is required!')
    .isInt()
    .withMessage('RequestLeave ID must be an integer!')
    .custom(async (value) => {
      const result = await prisma.requestLeave.findUnique({
        where: { id: parseInt(value) },
      });
      if (!result) {
        throw new Error('RequestLeave does not exist!');
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

export {
  addRequestLeaveValidator,
  updateRequestLeaveValidator,
  deleteRequestLeaveValidator,
};
