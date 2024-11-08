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
  const adminPassword = await bcrypt.hash('adminpass', 10);
  const employeePassword = await bcrypt.hash('adminpass', 10);

  const admin = await prisma.user.create({
    data: {
      fullname: 'Med Bankole',
      email: 'med97@gmail.com',
      role: 'ADMIN',
      password: adminPassword,
    },
  });

  const employee = await prisma.user.create({
    data: {
      fullname: 'Aichetou Gaye',
      email: 'aichagaye@gmail.com',
      role: 'EMPLOYE',
      password: employeePassword,
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
      userId: employee.id,
    },
  });

  // Créer des enregistrements de pointage
  await prisma.timeTracking.create({
    data: {
      checkin_time: new Date('2024-10-30T08:45:00Z'),
      checkout_time: new Date('2024-10-30T17:05:00Z'),
      userId: employee.id,
    },
  });

  await prisma.timeTracking.create({
    data: {
      checkin_time: new Date('2024-11-01T09:00:00Z'),
      checkout_time: new Date('2024-11-01T17:00:00Z'),
      userId: admin.id,
    },
  });

  // Créer des demandes de congé
  await prisma.requestLeave.create({
    data: {
      start_date: new Date('2024-12-01'),
      end_date: new Date('2024-12-10'),
      motif: 'Family event',
      status: 'APPROUVE',
      typeLeaveId: paidLeave.id,
      userId: employee.id,
    },
  });

  await prisma.requestLeave.create({
    data: {
      start_date: new Date('2024-12-15'),
      end_date: new Date('2024-12-20'),
      motif: 'Medical recovery',
      status: 'EN_ATTENTE',
      typeLeaveId: sickLeave.id,
      userId: admin.id,
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
