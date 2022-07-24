/*
  Warnings:

  - You are about to drop the column `current` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `Image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_projectId_fkey`;

-- DropIndex
DROP INDEX `Image_publicId_key` ON `Image`;

-- AlterTable
ALTER TABLE `Account` ADD COLUMN `refresh_token_expires_in` INTEGER NULL;

-- AlterTable
ALTER TABLE `Experience` DROP COLUMN `current`,
    ADD COLUMN `complete` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `organisation` VARCHAR(191) NULL,
    MODIFY `startDate` DATETIME(3) NULL,
    MODIFY `endDate` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Image` DROP COLUMN `publicId`,
    ADD COLUMN `alt` VARCHAR(191) NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL,
    MODIFY `projectId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Language` ADD COLUMN `experties` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Project` ADD COLUMN `ended` DATETIME(3) NULL,
    ADD COLUMN `showcase` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `started` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Image_url_key` ON `Image`(`url`);

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
