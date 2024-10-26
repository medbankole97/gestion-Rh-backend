/*
  Warnings:

  - Made the column `position` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `employees` required. This step will fail if there are existing NULL values in that column.
  - Made the column `motif` on table `requestleaves` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `typeleaves` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `typeleaves` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "typeleaves" DROP CONSTRAINT "typeleaves_userId_fkey";

-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "position" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "requestleaves" ALTER COLUMN "motif" SET NOT NULL;

-- AlterTable
ALTER TABLE "typeleaves" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "typeleaves" ADD CONSTRAINT "typeleaves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
