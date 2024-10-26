import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import prisma from '../config/prisma.js';

// Validator for adding an employee
const addEmployeeValidator = [
  check('fullname')
    .notEmpty()
    .withMessage('Fullname cannot be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Fullname must be at least 3 characters long!'),
  
  check('date_hiring')
    .notEmpty()
    .withMessage('Hiring date cannot be empty!')
    .bail()
    .isISO8601()
    .withMessage('Invalid date format (expected ISO8601)!'),
  
  check('position')
    .notEmpty()
    .withMessage('Position cannot be empty!')
    .bail()
    .isLength({ min: 2 })
    .withMessage('Position must be at least 2 characters long!'),

  check('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Invalid phone number format!'),

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

// Validator for updating an employee
const updateEmployeeValidator = [
  param('id')
    .notEmpty()
    .withMessage('Employee ID is required!')
    .bail()
    .custom(async (value) => {
      const result = await prisma.employee.findUnique({ where: { id: parseInt(value) } });
      if (!result) {
        throw new Error('Employee does not exist!');
      }
      return true;
    }),

  check('fullname')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Fullname must be at least 3 characters long!'),

  check('date_hiring')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format (expected ISO8601)!'),

  check('position')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Position must be at least 2 characters long!'),

  check('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Invalid phone number format!'),

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

// Validator for deleting an employee
const deleteEmployeeValidator = [
  param('id')
    .notEmpty()
    .withMessage('Employee ID is required!')
    .bail()
    .custom(async (value) => {
      const result = await prisma.employee.findUnique({ where: { id: parseInt(value) } });
      if (!result) {
        throw new Error('Employee does not exist!');
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

export { addEmployeeValidator, updateEmployeeValidator, deleteEmployeeValidator };
