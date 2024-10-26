// controllers/TimeTrackingController.js
import prisma from '../config/prisma.js';

// Create a new time tracking entry
const createTimeTracking = async (req, res) => {
  const { checkin_time, checkout_time, employeeId, userId } = req.body;
  try {
    const timeTracking = await prisma.timeTracking.create({
      data: {
        checkin_time: new Date(checkin_time),
        checkout_time: checkout_time ? new Date(checkout_time) : null,
        employeeId,
        userId,
      },
    });
    res.status(201).json({ timeTracking });
  } catch (error) {
    res.status(500).json({ error: 'Error while creating the time tracking entry' });
  }
};

// Get all time tracking entries
const getAllTimeTrackings = async (req, res) => {
  try {
    const timeTrackings = await prisma.timeTracking.findMany({
      include: {
        employee: true, // Include employee data
        user: true,     // Include user data
      },
    });
    res.status(200).json({ timeTrackings });
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching time tracking entries' });
  }
};

// Get a time tracking entry by ID
const getTimeTrackingById = async (req, res) => {
  const { id } = req.params;
  try {
    const timeTracking = await prisma.timeTracking.findUnique({
      where: { id: parseInt(id) },
      include: {
        employee: true,
        user: true,
      },
    });
    if (!timeTracking) {
      return res.status(404).json({ error: 'Time tracking entry not found' });
    }
    res.status(200).json({ timeTracking });
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching the time tracking entry' });
  }
};

// Update a time tracking entry
const updateTimeTracking = async (req, res) => {
  const { id } = req.params;
  const { checkin_time, checkout_time, employeeId, userId } = req.body;
  try {
    const timeTracking = await prisma.timeTracking.update({
      where: { id: parseInt(id) },
      data: {
        checkin_time: new Date(checkin_time),
        checkout_time: checkout_time ? new Date(checkout_time) : null,
        employeeId,
        userId,
      },
    });
    res.status(200).json({ timeTracking });
  } catch (error) {
    res.status(500).json({ error: 'Error while updating the time tracking entry' });
  }
};

// Delete a time tracking entry
const deleteTimeTracking = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.timeTracking.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error while deleting the time tracking entry' });
  }
};

// Export all the functions as part of TimeTrackingController object
const TimeTrackingController = {
  createTimeTracking,
  getAllTimeTrackings,
  getTimeTrackingById,
  updateTimeTracking,
  deleteTimeTracking,
};

export default TimeTrackingController;
