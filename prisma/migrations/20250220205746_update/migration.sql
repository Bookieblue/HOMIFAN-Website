/*
  Warnings:

  - You are about to drop the column `state` on the `donations` table. All the data in the column will be lost.
  - Added the required column `cityAndState` to the `donations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "donations" DROP COLUMN "state",
ADD COLUMN     "cityAndState" TEXT NOT NULL;
