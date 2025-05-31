/*
  Warnings:

  - You are about to drop the column `foto` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `user` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `foto`,
    DROP COLUMN `senha`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `picture` VARCHAR(191) NULL;
