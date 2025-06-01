/*
  Warnings:

  - You are about to drop the column `status` on the `readme` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Readme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `readme` DROP COLUMN `status`,
    ADD COLUMN `stats` VARCHAR(191) NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `tag` VARCHAR(191) NULL;
