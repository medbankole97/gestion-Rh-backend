// controllers/UserController.js
import prisma from '../config/prisma.js';

// Create a new user
const createUser = async (req, res) => {
  const { fullname, email, password, role, status, employeeId } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        password,
        role,
        status,
        createdate: new Date(),
        employeeId,
      },
    });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error while creating the user' });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching users' });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching the user' });
  }
};

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullname, email, password, role, status, employeeId } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        fullname,
        email,
        password,
        role,
        status,
        employeeId,
      },
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error while updating the user' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error while deleting the user' });
  }
};

// Export all the functions as part of UserController object
const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

export default UserController;
