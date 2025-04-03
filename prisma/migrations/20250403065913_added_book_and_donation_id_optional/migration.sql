/*
  Warnings:

  - The `payment_status` column on the `donations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('initiated', 'failed', 'success');

-- AlterTable
ALTER TABLE "donations" DROP COLUMN "payment_status",
ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL DEFAULT 'initiated';

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "book_id" TEXT,
ADD COLUMN     "donation_id" TEXT,
ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL DEFAULT 'initiated';

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_donation_id_fkey" FOREIGN KEY ("donation_id") REFERENCES "donations"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
