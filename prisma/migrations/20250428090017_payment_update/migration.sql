/*
  Warnings:

  - Changed the type of `customer` on the `payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "customer",
ADD COLUMN     "customer" JSONB NOT NULL,
ALTER COLUMN "method" DROP NOT NULL;
