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

  // check('checkout_time')
  //   .optional()
  //   .isISO8601()
  //   .toDate()
  //   .withMessage('Checkout time must be a valid date!')
  //   .custom((value, { req }) => {
  //     if (value && new Date(value) <= new Date(req.body.checkin_time)) {
  //       throw new Error('Checkout time must be after check-in time!');
  //     }
  //     return true;
  //   }),

  // La validation de userId est maintenant supprimée, car elle est gérée via le token d'authentification dans le contrôleur.

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
      const result = await prisma.timeTracking.findUnique({
        where: { id: parseInt(value) },
      });
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
    .withMessage('Checkout time must be a valid date!')
    .custom((value, { req }) => {
      if (value && new Date(value) <= new Date(req.body.checkin_time)) {
        throw new Error('Checkout time must be after check-in time!');
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

// Validator for deleting a time tracking entry
const deleteTimeTrackingValidator = [
  param('id')
    .notEmpty()
    .withMessage('TimeTracking ID is required!')
    .isInt()
    .withMessage('TimeTracking ID must be an integer!')
    .bail()
    .custom(async (value) => {
      const result = await prisma.timeTracking.findUnique({
        where: { id: parseInt(value) },
      });
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

export {
  addTimeTrackingValidator,
  updateTimeTrackingValidator,
  deleteTimeTrackingValidator,
};
