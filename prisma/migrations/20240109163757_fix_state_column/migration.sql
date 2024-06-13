/*
  Warnings:

  - You are about to drop the column `State` on the `units` table. All the data in the column will be lost.
  - Added the required column `state` to the `units` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_id_unit_fkey`;

-- AlterTable
ALTER TABLE `units` DROP COLUMN `State`,
    ADD COLUMN `state` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_id_unit_fkey` FOREIGN KEY (`id_unit`) REFERENCES `units`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
