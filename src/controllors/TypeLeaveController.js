import prisma from '../config/prisma.js';

// Créer un type de congé
const createTypeLeave = async (req, res) => {
  const { name, userId } = req.body;

  try {
    // Vérifie si l'utilisateur existe
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return res.status(404).json({ message: `User with ID ${userId} not found.` });
    }

    // Crée le type de congé après validation de l'utilisateur
    const typeLeave = await prisma.typeLeave.create({
      data: {
        name,
        userId,
      },
    });

    res.status(201).json({
      message: `Type leave ${name} created successfully.`,
      typeLeave,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating type leave. Please try again.' });
  }
};

// Récupérer tous les types de congé
const getAllTypeLeaves = async (req, res) => {
  try {
    const typeLeaves = await prisma.typeLeave.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json({
      message: `${typeLeaves.length} type leave(s) retrieved successfully.`,
      typeLeaves,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving type leaves.' });
  }
};

// Récupérer un type de congé par ID
const getTypeLeaveById = async (req, res) => {
  const { id } = req.params;

  try {
    const typeLeave = await prisma.typeLeave.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
      },
    });

    if (!typeLeave) {
      return res
        .status(404)
        .json({ message: `Type leave with ID ${id} not found.` });
    }

    res.status(200).json({
      message: `Type leave with ID ${id} retrieved successfully.`,
      typeLeave,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving type leave.' });
  }
};

// Mettre à jour un type de congé
const updateTypeLeave = async (req, res) => {
  const { id } = req.params;
  const { name, userId } = req.body;

  try {
    // Vérifie d'abord l'existence du type de congé
    const typeLeaveExists = await prisma.typeLeave.findUnique({
      where: { id: Number(id) },
    });

    if (!typeLeaveExists) {
      return res.status(404).json({ message: `Type leave with ID ${id} not found.` });
    }

    // Vérifie l'existence de l'utilisateur
    if (userId) {
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        return res.status(404).json({ message: `User with ID ${userId} not found.` });
      }
    }

    // Met à jour le type de congé
    const updatedTypeLeave = await prisma.typeLeave.update({
      where: { id: Number(id) },
      data: {
        name,
        userId,
      },
    });

    res.status(200).json({
      message: `Type leave with ID ${id} updated successfully.`,
      typeLeave: updatedTypeLeave,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating type leave.' });
  }
};

// Supprimer un type de congé
const deleteTypeLeave = async (req, res) => {
  const { id } = req.params;

  try {
    const typeLeaveExists = await prisma.typeLeave.findUnique({
      where: { id: parseInt(id) },
    });

    if (!typeLeaveExists) {
      return res
        .status(404)
        .json({ message: `Type leave with ID ${id} not found.` });
    }

    await prisma.typeLeave.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      message: `Type leave with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res
        .status(404)
        .json({ message: `Type leave with ID ${id} not found.` });
    }
    res.status(500).json({ message: 'Error deleting type leave.' });
  }
};

// Exporter le contrôleur en tant qu'objet
const TypeLeaveController = {
  createTypeLeave,
  getAllTypeLeaves,
  getTypeLeaveById,
  updateTypeLeave,
  deleteTypeLeave,
};

export default TypeLeaveController;
