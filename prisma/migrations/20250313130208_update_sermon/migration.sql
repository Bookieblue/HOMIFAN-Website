/*
  Warnings:

  - You are about to drop the column `date` on the `sermons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sermons" DROP COLUMN "date",
ADD COLUMN     "publishedDate" TIMESTAMP(3),
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'unpublish';
