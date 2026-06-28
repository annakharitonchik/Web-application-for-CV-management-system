/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('CERTIFICATION', 'PROFESSIONAL_KNOWLEDGE', 'PERSONAL_INFORMATION', 'SOFT_SKILLS');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('STRING', 'MARKDOWN', 'IMAGE', 'NUMBER', 'DATE', 'PERIOD', 'BOOLEAN');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "categories" "Category" NOT NULL,
    "name" TEXT NOT NULL,
    "dataTypes" "Type" NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_name_key" ON "Attribute"("name");
