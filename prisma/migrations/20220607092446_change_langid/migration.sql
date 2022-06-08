/*
  Warnings:

  - The primary key for the `LanguageOnProject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `languageId` on the `LanguageOnProject` table. All the data in the column will be lost.
  - Added the required column `languageName` to the `LanguageOnProject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `LanguageOnProject` DROP FOREIGN KEY `LanguageOnProject_languageId_fkey`;

-- AlterTable
ALTER TABLE `LanguageOnProject` DROP PRIMARY KEY,
    DROP COLUMN `languageId`,
    ADD COLUMN `languageName` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`projectId`, `languageName`);

-- AddForeignKey
ALTER TABLE `LanguageOnProject` ADD CONSTRAINT `LanguageOnProject_languageName_fkey` FOREIGN KEY (`languageName`) REFERENCES `Language`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
