-- CreateTable
CREATE TABLE "Korisnik" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "ime" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Korisnik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artikal" (
    "id" SERIAL NOT NULL,
    "naziv" TEXT NOT NULL,
    "opis" TEXT,
    "kolicina" INTEGER NOT NULL DEFAULT 0,
    "cena" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "korisnikId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artikal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Korpa" (
    "id" SERIAL NOT NULL,
    "korisnikId" INTEGER NOT NULL,
    "artikalId" INTEGER,
    "kolicina" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Korpa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Korisnik_email_key" ON "Korisnik"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Korpa_korisnikId_artikalId_key" ON "Korpa"("korisnikId", "artikalId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- AddForeignKey
ALTER TABLE "Artikal" ADD CONSTRAINT "Artikal_korisnikId_fkey" FOREIGN KEY ("korisnikId") REFERENCES "Korisnik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Korpa" ADD CONSTRAINT "Korpa_korisnikId_fkey" FOREIGN KEY ("korisnikId") REFERENCES "Korisnik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Korpa" ADD CONSTRAINT "Korpa_artikalId_fkey" FOREIGN KEY ("artikalId") REFERENCES "Artikal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
