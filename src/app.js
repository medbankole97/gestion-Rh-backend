import express from 'express';
import bodyParser from 'body-parser';
// import userRoutes from './routes/userRoutes.js';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import router from './routes/EmployeeRoutes.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());

// Routes
app.use(router);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
