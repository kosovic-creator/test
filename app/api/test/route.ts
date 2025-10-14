/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const artikli = await prisma.artikli.findMany();
  return NextResponse.json(artikli);
}
export async function POST(request: Request) {
  const data = await request.json();
  const newArtikal = await prisma.artikli.create({
    data: {
      naziv: data.naziv,
      cijena: data.cijena,
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

