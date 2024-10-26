/*
  Warnings:

  - You are about to drop the column `dateHiring` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `employees` table. All the data in the column will be lost.
  - You are about to alter the column `fullname` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `position` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `phone` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `status` on the `employees` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the column `endDate` on the `requestleaves` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `requestleaves` table. All the data in the column will be lost.
  - You are about to drop the column `checkinTime` on the `timetrackings` table. All the data in the column will be lost.
  - You are about to drop the column `checkoutTime` on the `timetrackings` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `typeleaves` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `status` on the `typeleaves` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the column `createDate` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `status` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - Added the required column `date_hiring` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `requestleaves` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `requestleaves` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkin_time` to the `timetrackings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `typeleaves` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdate` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullname` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_userId_fkey";

-- DropIndex
DROP INDEX "employees_email_key";

-- DropIndex
DROP INDEX "employees_userId_key";

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "dateHiring",
DROP COLUMN "email",
DROP COLUMN "userId",
ADD COLUMN     "date_hiring" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "fullname" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "position" DROP NOT NULL,
ALTER COLUMN "position" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "requestleaves" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "motif" DROP NOT NULL;

-- AlterTable
ALTER TABLE "timetrackings" DROP COLUMN "checkinTime",
DROP COLUMN "checkoutTime",
ADD COLUMN     "checkin_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "checkout_time" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "typeleaves" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createDate",
ADD COLUMN     "createdate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "employeeId" INTEGER NOT NULL,
ADD COLUMN     "fullname" VARCHAR(100) NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "role" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "status" SET DATA TYPE VARCHAR(50);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "typeleaves" ADD CONSTRAINT "typeleaves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
