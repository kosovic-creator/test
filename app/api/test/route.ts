/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const artikli = await prisma.artikli.findMany({
      select: {
       id: true,
       naziv: true,
       cijena: true,
       detalji: { select: {  opis: true } },
       //ovo je za relaciju sa korisnici tabelom Korisnik  Jedan korisnik može imati više artikala(one-to-many)
       korisnici: { select: { ime: true, prezime: true, email: true } }
    }
    });

    return new Response(JSON.stringify(artikli), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response('Error fetching artikli', { status: 500 });
  }
}
export async function POST(request: Request) {
  const reqBody = await request.json();
  const newArtikal = await prisma.artikli.create({
    data: {
      naziv: reqBody.naziv,
      cijena: reqBody.cijena,
      detalji: {
        create: {
          opis: reqBody.opis
        }
      }
    },
  });
  return NextResponse.json(newArtikal);
}

// export async function GET(request: NextRequest) {
//   const artikalId = request.nextUrl.searchParams.get('artikalId');
//   if (!artikalId) return NextResponse.json({ error: 'Missing artikalId' }, { status: 400 });
//   const podaci = await prisma.artikli.findMany({ where: { id: artikalId } });
//   return NextResponse.json(podaci);
// }

