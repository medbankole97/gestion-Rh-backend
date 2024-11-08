import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

import transporter from '../config/transporter.js';
import { config } from 'dotenv';
import bcrypt from 'bcrypt'
config()
const prisma = new PrismaClient();


const JWT_SECRET =  process.env.JWT_SECRET
const EMAIL_USER =  process.env.EMAIL_USER
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET 


export async function getAdminEmails() {
  const admins = await prisma.user.findMany({
    where: { role: 'ADMIN' },
    select: { email: true },
  });

  return admins.map(admin => admin.email);
}

export async function sendPasswordResetEmail(email) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: '1h',
  });
  const resetUrl = `http://localhost:5173/reset-password?token=${token}`;

  // const mailOptions = {
  //   from: EMAIL_USER,
  //   to: email,
  //   subject: 'Réinitialisation de votre mot de passe',
  //   text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetUrl}`,
  // };
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Réinitialisation de votre mot de passe',
    text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetUrl}`,
    html: `<p>Cliquez sur ce lien pour réinitialiser votre mot de passe : <a href="${resetUrl}">Réinitialiser le mot de passe</a></p>`,
    headers: {
      'List-Unsubscribe': '<mailto:unsubscribe@votredomaine.com>',
    },
  };
  
  

  await transporter.sendMail(mailOptions);
  return { message: 'Email de réinitialisation envoyé.' };
}
export async function resetPassword(token, newPassword) {
  const decoded = jwt.verify(token, JWT_SECRET);
  const userId = decoded.id;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return { message: 'Mot de passe réinitialisé avec succès.' };
}
