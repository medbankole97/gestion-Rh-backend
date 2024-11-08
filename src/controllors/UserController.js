import prisma from '../config/prisma.js';
import bcrypt from 'bcryptjs';
import { resetPassword, sendPasswordResetEmail } from '../services/UserService.js';


// Créer un utilisateur
const createUser = async (req, res) => {
  const { fullname, email, password, role, status } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { fullname, email, password: hashedPassword, role, status },
    });

    res.status(201).json({
      message: `User ${fullname} created successfully.`,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user. Please try again.' });
  }
};

// Récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: 'asc', // Changez 'id' à tout autre champ que vous souhaitez utiliser pour le tri
      },
    });
    res.status(200).json({
      message: `${users.length} user(s) retrieved successfully.`,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving users.' });
  }
};
// Récupérer un utilisateur par ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found.` });
    }

    res.status(200).json({
      message: `User with ID ${id} retrieved successfully.`,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving user.' });
  }
};

// Mettre à jour un utilisateur
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullname, email, password, role, status } = req.body;

  const data = { fullname, email, role, status };

  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }

  try {
    const userExists = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!userExists) {
      return res.status(404).json({ message: `User with ID ${id} not found.` });
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data,
    });

    res.status(200).json({
      message: `User with ID ${id} updated successfully.`,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating user.' });
  }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userExists = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!userExists) {
      return res.status(404).json({ message: `User with ID ${id} not found.` });
    }

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      message: `User with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: `User with ID ${id} not found.` });
    }
    res.status(500).json({ message: 'Error deleting user.' });
  }
};
const  requestPasswordReset = async(req, res) => {
  const { email } = req.body;
  try {
    const response = await sendPasswordResetEmail(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const handleResetPassword = async(req, res) =>{
  const { token, newPassword } = req.body;
  try {
    const response = await resetPassword(token, newPassword);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  handleResetPassword,
  requestPasswordReset

};

export default UserController;
