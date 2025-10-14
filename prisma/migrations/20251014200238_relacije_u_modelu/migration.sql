-- CreateTable
CREATE TABLE "Detalji" (
    "id" TEXT NOT NULL,
    "opis" TEXT,
    "artikliId" TEXT NOT NULL,

    CONSTRAINT "Detalji_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Detalji" ADD CONSTRAINT "Detalji_artikliId_fkey" FOREIGN KEY ("artikliId") REFERENCES "Artikli"("id") ON DELETE CASCADE ON UPDATE CASCADE;
