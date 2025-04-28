/*
  Warnings:

  - You are about to drop the column `customer` on the `payments` table. All the data in the column will be lost.
  - Added the required column `metadata` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "customer",
ADD COLUMN     "metadata" JSONB NOT NULL;
