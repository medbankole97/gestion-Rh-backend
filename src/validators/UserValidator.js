import { body, param, validationResult } from 'express-validator';
import prisma from '../config/prisma.js';

// Règles de validation pour l'ajout d'un utilisateur
export const addUserValidator = [
  body('fullname')
  .trim() // Supprime les espaces en début et fin de chaîne
  .notEmpty()
  .withMessage('Full name is required and cannot contain only spaces.')
  .bail()
  .isLength({ min: 5, max: 100 })
  .withMessage('Full name must be between 5 and 100 characters long.')
  .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
  .withMessage(
    'Full name must contain only letters, spaces, hyphens, or apostrophes.'
  ),

  body('email')
  .isEmail()
  .withMessage('Invalid email format.')
  .bail()
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
  .withMessage('Email must have a valid domain (e.g., example.com).')
  .custom(async (value) => {
    const existingUser = await prisma.user.findUnique({
      where: { email: value },
    });
    if (existingUser) {
      throw new Error('Email already exists.');
    }
    return true;
  }),


  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),

  body('role').isString().notEmpty().withMessage('Role is required.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Règles de validation pour la mise à jour d'un utilisateur
export const updateUserValidator = [
  // Validation pour le fullname
  body('fullname')
  .optional() // Rendre le champ optionnel
  .trim() // Supprime les espaces au début et à la fin
  .notEmpty()
  .withMessage('Full name cannot contain only spaces.')
  .bail()
  .isString()
  .withMessage('Full name must be a string.')
  .isLength({ min: 5, max: 100 })
  .withMessage('Full name must be between 5 and 100 characters long.')
  .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
  .withMessage(
    'Full name must contain only letters, spaces, hyphens, or apostrophes.'
  ),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format.')
    .bail()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
    .withMessage('Email must have a valid domain (e.g., example.com).')
    .custom(async (value, { req }) => {
      const existingUser = await prisma.user.findUnique({
        where: { email: value },
      });
      if (existingUser && existingUser.id !== parseInt(req.params.id, 10)) {
        throw new Error('Email already exists.');
      }
      return true;
    }),

  // Validation pour le password
  // body('password')
  //   .optional()
  //   .isLength({ min: 6 })
  //   .withMessage('Password must be at least 6 characters long.'),

  // Validation pour le role
  // body('role')
  //   .optional()
  //   .isString()
  //   .notEmpty()
  //   .withMessage('Role must be a non-empty string.'),

  // Validation finale pour capturer les erreurs
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// export const deleteUserValidator = [
//   body('id').isInt().withMessage('Valid ID is required'),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   },
// ];

export const deleteUserValidator = [
  param('id').isInt().withMessage('Valid ID is required in the URL parameter.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
