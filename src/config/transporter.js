import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config();
// const transporter = nodemailer.createTransport({
//     service: 'gmail', // ou un autre service SMTP si nécessaire
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true pour le port 465, sinon utilisez false pour le port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;
