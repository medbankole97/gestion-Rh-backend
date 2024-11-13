import express from 'express';
import UserController from '../controllors/UserController.js';
import {
  addUserValidator,
  updateUserValidator,
  deleteUserValidator,
} from '../validators/UserValidator.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

// Routes utilisateurs
router.post('/', authenticateToken,  authorizeRole('ADMIN'), addUserValidator, UserController.createUser);
router.get('/', authenticateToken, authorizeRole('ADMIN'), UserController.getAllUsers);
router.get('/:id', 
 authenticateToken, 
UserController.getUserById);
router.put(
  '/:id',
  authenticateToken,
  authorizeRole('ADMIN'),
  updateUserValidator,
  UserController.updateUser
);
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('ADMIN'), 
  deleteUserValidator,
  UserController.deleteUser
);
router.post('/request-password-reset', UserController.requestPasswordReset);
router.post('/reset-password', UserController.handleResetPassword);
// router.post('/me', authenticateToken);

// router.get("/me", authenticateToken, async (req, res) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: req.user.userId }
//     });

//     if (!user) {
//       return res.status(404).json({ message: "user non trouvé" });
//     }
//     return res.status(200).json({
//       user: {
//         fullname: user.fullname,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     return res.status(500).json({ message: "Erreur serveur", error });
//   }
// });

export default router;
