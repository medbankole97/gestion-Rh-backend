import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Supprimer les données existantes
  await prisma.requestLeave.deleteMany();
  await prisma.timeTracking.deleteMany();
  await prisma.typeLeave.deleteMany();
  await prisma.user.deleteMany();

  // Créer des utilisateurs avec des rôles et mots de passe hachés
  const adminPassword = await bcrypt.hash('pass123', 10);
  const employeePassword = await bcrypt.hash('pass123', 10);
  const managerPassword = await bcrypt.hash('pass123', 10);

  const admin = await prisma.user.create({
    data: {
      fullname: 'Mohamed Bankole',
      email: 'medbankole97@gmail.com',
      role: 'ADMIN',
      password: adminPassword,
    },
  });

  const employee = await prisma.user.create({
    data: {
      fullname: 'Coumba Diop',
      email: 'coumbadiop@gmail.com',
      role: 'EMPLOYE',
      password: employeePassword,
    },
  });

  const manager = await prisma.user.create({
    data: {
      fullname: 'Abdou Bankole',
      email: 'bankoleabdou00@gmail.com',
      role: 'MANAGER',
      password: managerPassword,
    },
  });

  // Créer des types de congé
  const paidLeave = await prisma.typeLeave.create({
    data: {
      name: 'Paid Leave',
      userId: admin.id,
    },
  });

  const sickLeave = await prisma.typeLeave.create({
    data: {
      name: 'Sick Leave',
      userId: admin.id,
    },
  });

  const unpaidLeave = await prisma.typeLeave.create({
    data: {
      name: 'Unpaid Leave',
      userId: manager.id,
    },
  });

  // Créer des demandes de congé avec différents statuts
  await prisma.requestLeave.create({
    data: {
      start_date: new Date('2024-11-01T14:00:00Z'),
      end_date: new Date('2024-11-10T14:00:00Z'),
      motif: 'Family event',
      status: 'APPROVED', // Status "APPROVED"
      typeLeaveId: paidLeave.id,
      userId: employee.id,
    },
  });

  await prisma.requestLeave.create({
    data: {
      start_date: new Date('2024-11-01T14:00:00Z'),
      end_date: new Date('2024-11-05T14:00:00Z'),
      motif: 'Medical recovery',
      status: 'REJECTED', // Status "REJECTED"
      typeLeaveId: sickLeave.id,
      userId: manager.id,
    },
  });

  await prisma.requestLeave.create({
    data: {
      start_date: new Date('2024-11-01T14:00:00Z'),
      end_date: new Date('2024-11-02T14:00:00Z'),
      motif: 'Personal reasons',
      status: 'PENDING', // Status "PENDING"
      typeLeaveId: unpaidLeave.id,
      userId: admin.id,
    },
  });

  // Créer des enregistrements de suivi du temps (Time Tracking)
  await prisma.timeTracking.create({
    data: {
      userId: employee.id,
      checkin_time: new Date('2024-10-01T10:45:00Z'),
      checkout_time: new Date('2024-10-30T18:05:00Z'),
      // Calculer le nombre d'heures travaillées
    },
  });

  await prisma.timeTracking.create({
    data: {
      userId: manager.id,
      checkin_time: new Date('2024-10-01T09:00:00Z'),
      checkout_time: new Date('2024-10-30T17:00:00Z'),
    },
  });

  await prisma.timeTracking.create({
    data: {
      userId: admin.id,
      checkin_time: new Date('2024-10-01T09:30:00Z'),
      checkout_time: new Date('2024-10-30T16:45:00Z'),
    },
  });

  console.log('Seeding completed');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
