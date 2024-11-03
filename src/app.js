import express from 'express';
import bodyParser from 'body-parser';
// import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import cors from 'cors';
import i18n from 'i18n';

dotenv.config();

const app = express();
// const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

i18n.configure({
  locales: ['en', 'fr', 'ar'],
  directory: './translations',
  defaultLocale: 'en',
  cookie: 'lang',
});

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(i18n.init);

app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
