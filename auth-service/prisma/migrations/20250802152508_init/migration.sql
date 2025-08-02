-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('student', 'instructor');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "refresh" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
