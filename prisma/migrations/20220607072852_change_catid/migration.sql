/*
  Warnings:

  - The primary key for the `CategoriesOnProject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `CategoriesOnProject` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `CategoriesOnProject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CategoriesOnProject` DROP FOREIGN KEY `CategoriesOnProject_categoryId_fkey`;

-- AlterTable
ALTER TABLE `CategoriesOnProject` DROP PRIMARY KEY,
    DROP COLUMN `categoryId`,
    ADD COLUMN `categoryName` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`projectId`, `categoryName`);

-- AddForeignKey
ALTER TABLE `CategoriesOnProject` ADD CONSTRAINT `CategoriesOnProject_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
