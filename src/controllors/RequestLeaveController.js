// controllers/RequestLeaveController.js
import prisma from '../config/prisma.js';

// Create a new leave request
const createRequestLeave = async (req, res) => {
  const { start_date, end_date, motif, typeLeaveId, employeeId, userId } = req.body;
  try {
    const requestLeave = await prisma.requestLeave.create({
      data: {
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        motif,
        typeLeaveId,
        employeeId,
        userId,
      },
    });
    res.status(201).json({ requestLeave });
  } catch (error) {
    res.status(500).json({ error: 'Error while creating the leave request' });
  }
};

// Get all leave requests
const getAllRequestLeaves = async (req, res) => {
  try {
    const requestLeaves = await prisma.requestLeave.findMany({
      include: {
        typeLeave: true, // Include type leave data
        employee: true,  // Include employee data
        user: true,      // Include user data
      },
    });
    res.status(200).json({ requestLeaves });
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching leave requests' });
  }
};

// Get a leave request by ID
const getRequestLeaveById = async (req, res) => {
  const { id } = req.params;
  try {
    const requestLeave = await prisma.requestLeave.findUnique({
      where: { id: parseInt(id) },
      include: {
        typeLeave: true,
        employee: true,
        user: true,
      },
    });
    if (!requestLeave) {
      return res.status(404).json({ error: 'Leave request not found' });
    }
    res.status(200).json({ requestLeave });
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching the leave request' });
  }
};

// Update a leave request
const updateRequestLeave = async (req, res) => {
  const { id } = req.params;
  const { start_date, end_date, motif, typeLeaveId, employeeId, userId } = req.body;
  try {
    const requestLeave = await prisma.requestLeave.update({
      where: { id: parseInt(id) },
      data: {
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        motif,
        typeLeaveId,
        employeeId,
        userId,
      },
    });
    res.status(200).json({ requestLeave });
  } catch (error) {
    res.status(500).json({ error: 'Error while updating the leave request' });
  }
};

// Delete a leave request
const deleteRequestLeave = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.requestLeave.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error while deleting the leave request' });
  }
};

// Export all the functions as part of RequestLeaveController object
const RequestLeaveController = {
  createRequestLeave,
  getAllRequestLeaves,
  getRequestLeaveById,
  updateRequestLeave,
  deleteRequestLeave,
};

export default RequestLeaveController;
