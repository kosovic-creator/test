-- AlterTable
ALTER TABLE "Artikli" ADD COLUMN     "korisniciId" TEXT;

-- CreateTable
CREATE TABLE "Korisnici" (
    "id" TEXT NOT NULL,
    "ime" TEXT,
    "prezime" TEXT,
    "email" TEXT,
    "lozinka" TEXT,

    CONSTRAINT "Korisnici_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Korisnici_email_key" ON "Korisnici"("email");

-- AddForeignKey
ALTER TABLE "Artikli" ADD CONSTRAINT "Artikli_korisniciId_fkey" FOREIGN KEY ("korisniciId") REFERENCES "Korisnici"("id") ON DELETE SET NULL ON UPDATE CASCADE;
