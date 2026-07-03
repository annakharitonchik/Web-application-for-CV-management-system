-- CreateEnum
CREATE TYPE "Category" AS ENUM ('CERTIFICATION', 'PROFESSIONAL_KNOWLEDGE', 'PERSONAL_INFORMATION', 'SOFT_SKILLS');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('STRING', 'MARKDOWN', 'IMAGE', 'NUMBER', 'DATE', 'PERIOD', 'BOOLEAN');

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "category" "Category" NOT NULL,
    "name" TEXT NOT NULL,
    "dataType" "Type" NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_name_key" ON "Attribute"("name");
