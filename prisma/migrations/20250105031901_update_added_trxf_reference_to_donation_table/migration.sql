-- AlterTable
ALTER TABLE "donations" ADD COLUMN     "trxf_reference" TEXT,
ALTER COLUMN "payment_status" SET DEFAULT 'pending';
