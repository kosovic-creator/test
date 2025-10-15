/*
  Warnings:

  - A unique constraint covering the columns `[artikliId]` on the table `Detalji` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Detalji_artikliId_key" ON "Detalji"("artikliId");
