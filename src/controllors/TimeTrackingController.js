import prisma from '../config/prisma.js';

// Créer un enregistrement de suivi du temps
const createTimeTracking = async (req, res) => {
  const { checkin_time, checkout_time, userId } = req.body;

  try {
    const timeTracking = await prisma.timeTracking.create({
      data: {
        checkin_time: new Date(checkin_time),
        checkout_time: checkout_time ? new Date(checkout_time) : null,
        userId,
      },
    });

    res.status(201).json({
      message: `Time tracking record created successfully.`,
      timeTracking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error creating time tracking record. Please try again.',
    });
  }
};

// Récupérer tous les enregistrements de suivi du temps
const getAllTimeTrackings = async (req, res) => {
  try {
    const timeTrackings = await prisma.timeTracking.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json({
      message: `${timeTrackings.length} time tracking record(s) retrieved successfully.`,
      timeTrackings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving time tracking records.' });
  }
};

// Récupérer un enregistrement de suivi du temps par ID
const getTimeTrackingById = async (req, res) => {
  const { id } = req.params;

  try {
    const timeTracking = await prisma.timeTracking.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
      },
    });

    if (!timeTracking) {
      return res
        .status(404)
        .json({ message: `Time tracking record with ID ${id} not found.` });
    }

    res.status(200).json({
      message: `Time tracking record with ID ${id} retrieved successfully.`,
      timeTracking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving time tracking record.' });
  }
};

// Mettre à jour un enregistrement de suivi du temps
const updateTimeTracking = async (req, res) => {
  const { id } = req.params;
  const { checkin_time, checkout_time, userId } = req.body;

  const data = {
    checkin_time: new Date(checkin_time),
    checkout_time: checkout_time ? new Date(checkout_time) : null,
    userId,
  };

  try {
    const timeTrackingExists = await prisma.timeTracking.findUnique({
      where: { id: Number(id) },
    });

    if (!timeTrackingExists) {
      return res
        .status(404)
        .json({ message: `Time tracking record with ID ${id} not found.` });
    }

    const updatedTimeTracking = await prisma.timeTracking.update({
      where: { id: Number(id) },
      data,
    });

    res.status(200).json({
      message: `Time tracking record with ID ${id} updated successfully.`,
      timeTracking: updatedTimeTracking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating time tracking record.' });
  }
};

// Supprimer un enregistrement de suivi du temps
const deleteTimeTracking = async (req, res) => {
  const { id } = req.params;

  try {
    const timeTrackingExists = await prisma.timeTracking.findUnique({
      where: { id: parseInt(id) },
    });

    if (!timeTrackingExists) {
      return res
        .status(404)
        .json({ message: `Time tracking record with ID ${id} not found.` });
    }

    await prisma.timeTracking.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      message: `Time tracking record with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res
        .status(404)
        .json({ message: `Time tracking record with ID ${id} not found.` });
    }
    res.status(500).json({ message: 'Error deleting time tracking record.' });
  }
};

// Exporter le contrôleur en tant qu'objet
const TimeTrackingController = {
  createTimeTracking,
  getAllTimeTrackings,
  getTimeTrackingById,
  updateTimeTracking,
  deleteTimeTracking,
};

export default TimeTrackingController;
