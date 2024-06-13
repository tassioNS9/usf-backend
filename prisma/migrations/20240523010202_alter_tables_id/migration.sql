/*
  Warnings:

  - The primary key for the `evaluations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `evaluations` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `evaluations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_indicator` on the `evaluations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `valueNum` on the `evaluations` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Int`.
  - The primary key for the `indicators` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `indicators` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `refresh_token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `refresh_token` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userId` on the `refresh_token` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `units` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `units` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `type_user` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_unit` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[description]` on the table `indicators` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `evaluator` to the `evaluations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_unit` to the `evaluations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `evaluations` DROP FOREIGN KEY `evaluations_id_indicator_fkey`;

-- DropForeignKey
ALTER TABLE `evaluations` DROP FOREIGN KEY `evaluations_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `refresh_token` DROP FOREIGN KEY `refresh_token_userId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_id_unit_fkey`;

-- AlterTable
ALTER TABLE `evaluations` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `evaluator` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_unit` INTEGER NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_indicator` INTEGER NOT NULL,
    ALTER COLUMN `date_evaluation` DROP DEFAULT,
    MODIFY `valueNum` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `indicators` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `refresh_token` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `units` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `type_user`,
    ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_unit` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `indicators_description_key` ON `indicators`(`description`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_id_unit_fkey` FOREIGN KEY (`id_unit`) REFERENCES `units`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refresh_token` ADD CONSTRAINT `refresh_token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evaluations` ADD CONSTRAINT `evaluations_id_indicator_fkey` FOREIGN KEY (`id_indicator`) REFERENCES `indicators`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evaluations` ADD CONSTRAINT `evaluations_id_unit_fkey` FOREIGN KEY (`id_unit`) REFERENCES `units`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
