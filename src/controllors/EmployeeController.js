import prisma from '../config/prisma.js';

// Create a new employee
const createEmployee = async (req, res) => {
  const { fullname, position, address, phone, status, date_hiring } = req.body;
  try {
    const employee = await prisma.employee.create({
      data: {
        fullname,
        position,
        address,
        phone,
        status,
        date_hiring: new Date(date_hiring),
      },
    });
    res.status(201).json({ employee });
  } catch (error) {
    res.status(500).json({ error: 'Error while creating the employee' });
  }
};

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching employees' });
  }
};

// Get an employee by ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id) },
    });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ employee });
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching the employee' });
  }
};

// Update an employee
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { fullname, position, address, phone, status, date_hiring } = req.body;
  try {
    const employee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: {
        fullname,
        position,
        address,
        phone,
        status,
        date_hiring: new Date(date_hiring),
      },
    });
    res.status(200).json({ employee });
  } catch (error) {
    res.status(500).json({ error: 'Error while updating the employee' });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.employee.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error while deleting the employee' });
  }
};

// Export all the functions as part of EmployeeController object
const EmployeeController = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};

export default EmployeeController;
