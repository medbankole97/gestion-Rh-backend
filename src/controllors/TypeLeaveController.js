// controllers/TypeLeaveController.js
import prisma from '../config/prisma.js';

// Create a new type of leave
const createTypeLeave = async (req, res) => {
  const { name, description, status, userId } = req.body;
  try {
    const typeLeave = await prisma.typeLeave.create({
      data: {
        name,
        description,
        status,
        userId,
      },
    });
    res.status(201).json({ typeLeave });
  } catch (error) {
    res.status(500).json({ error: 'Error while creating the type of leave' });
  }
};

// Get all types of leave
const getAllTypeLeaves = async (req, res) => {
  try {
    const typeLeaves = await prisma.typeLeave.findMany();
    res.status(200).json({ typeLeaves });
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching types of leave' });
  }
};

// Get a type of leave by ID
const getTypeLeaveById = async (req, res) => {
  const { id } = req.params;
  try {
    const typeLeave = await prisma.typeLeave.findUnique({
      where: { id: parseInt(id) },
    });
    if (!typeLeave) {
      return res.status(404).json({ error: 'Type of leave not found' });
    }
    res.status(200).json({ typeLeave });
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching the type of leave' });
  }
};

// Update a type of leave
const updateTypeLeave = async (req, res) => {
  const { id } = req.params;
  const { name, description, status, userId } = req.body;
  try {
    const typeLeave = await prisma.typeLeave.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        status,
        userId,
      },
    });
    res.status(200).json({ typeLeave });
  } catch (error) {
    res.status(500).json({ error: 'Error while updating the type of leave' });
  }
};

// Delete a type of leave
const deleteTypeLeave = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.typeLeave.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error while deleting the type of leave' });
  }
};

// Export all the functions as part of TypeLeaveController object
const TypeLeaveController = {
  createTypeLeave,
  getAllTypeLeaves,
  getTypeLeaveById,
  updateTypeLeave,
  deleteTypeLeave,
};

export default TypeLeaveController;
