import express from 'express';
import AuthController from '../controllors/AuthController.js'; // Assurez-vous que le chemin est correct
import { check } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js'; // Assurez-vous d'avoir ce middleware

// Importer Prisma Client
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const router = express.Router();

// Route pour l'enregistrement
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

// Route pour la connexion
router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Email is not valid'),
    check('password').notEmpty().withMessage('Password is required'),
  ],
  AuthController.login
);

// Nouvelle route pour récupérer les informations de l'utilisateur connecté
router.get('/user', authenticateToken, async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur depuis le token
    const userId = req.user.userId;

    // Utiliser Prisma pour récupérer l'utilisateur par son ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Retourner les informations de l'utilisateur
    res.json({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
