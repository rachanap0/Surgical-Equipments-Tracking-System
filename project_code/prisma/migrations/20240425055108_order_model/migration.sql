/*
  Warnings:

  - Added the required column `requestorName` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surgeryType` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Orders` ADD COLUMN `additionalComments` VARCHAR(1000) NULL,
    ADD COLUMN `requestorName` VARCHAR(255) NOT NULL,
    ADD COLUMN `surgeryType` VARCHAR(255) NOT NULL;
