/*
  Warnings:

  - You are about to alter the column `type_Indicator` on the `indicators` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `evaluations` MODIFY `date_evaluation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `indicators` MODIFY `type_Indicator` ENUM('BOOL', 'NUMERIC') NOT NULL;
