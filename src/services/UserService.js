import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAdminEmails() {
  const admins = await prisma.user.findMany({
    where: { role: 'ADMIN' },
    select: { email: true },
  });

  return admins.map(admin => admin.email);
}
