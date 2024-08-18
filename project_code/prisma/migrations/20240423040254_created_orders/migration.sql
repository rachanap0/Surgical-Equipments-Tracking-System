/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `items` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_orderId_fkey`;

-- AlterTable
ALTER TABLE `Orders` ADD COLUMN `items` JSON NOT NULL,
    MODIFY `rfidTag` VARCHAR(191) NOT NULL DEFAULT '';

-- DropTable
DROP TABLE `Item`;
