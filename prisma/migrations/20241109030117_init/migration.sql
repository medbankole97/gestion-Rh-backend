-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'EMPLOYE', 'MANAGER');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "fullname" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "role" "UserRole" NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typeleaves" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "typeleaves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timetrackings" (
    "id" SERIAL NOT NULL,
    "checkin_time" TIMESTAMP(3) NOT NULL,
    "checkout_time" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "timetrackings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requestleaves" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "motif" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL,
    "typeLeaveId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "requestleaves_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "typeleaves_name_key" ON "typeleaves"("name");

-- AddForeignKey
ALTER TABLE "typeleaves" ADD CONSTRAINT "typeleaves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetrackings" ADD CONSTRAINT "timetrackings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requestleaves" ADD CONSTRAINT "requestleaves_typeLeaveId_fkey" FOREIGN KEY ("typeLeaveId") REFERENCES "typeleaves"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requestleaves" ADD CONSTRAINT "requestleaves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
