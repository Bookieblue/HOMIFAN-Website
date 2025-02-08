/*
  Warnings:

  - Added the required column `event_id` to the `event_form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event_form" ADD COLUMN     "event_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "event_form" ADD CONSTRAINT "event_form_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
