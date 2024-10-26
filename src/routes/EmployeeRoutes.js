import express from 'express';
import { addEmployeeValidator, updateEmployeeValidator, deleteEmployeeValidator } from '../validators/EmployeeValidator.js';
import EmployeeController from '../controllors/EmployeeController.js';

const router = express.Router();


router.get('/employees', EmployeeController.getAllEmployees);

router.post('/employees', addEmployeeValidator, EmployeeController.createEmployee);

router.delete(
  '/employees/:id',
  deleteEmployeeValidator,
  EmployeeController.deleteEmployee
);


router.put(
  '/employees/:id',
  updateEmployeeValidator,
  EmployeeController.updateEmployee
);


router.get('/employees/:id', deleteEmployeeValidator, EmployeeController.getEmployeeById);

export default router;

