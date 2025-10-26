-- CreateTable
CREATE TABLE "Korpa" (
    "id" SERIAL NOT NULL,
    "korisnikId" INTEGER NOT NULL,
    "artikalId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Korpa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Korpa_korisnikId_artikalId_key" ON "Korpa"("korisnikId", "artikalId");

-- AddForeignKey
ALTER TABLE "Korpa" ADD CONSTRAINT "Korpa_korisnikId_fkey" FOREIGN KEY ("korisnikId") REFERENCES "Korisnik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Korpa" ADD CONSTRAINT "Korpa_artikalId_fkey" FOREIGN KEY ("artikalId") REFERENCES "Artikal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
