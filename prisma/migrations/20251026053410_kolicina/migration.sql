/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "Artikal" ADD COLUMN     "cena" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "kolicina" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "public"."Post";

-- DropTable
DROP TABLE "public"."User";
