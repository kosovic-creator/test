/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const lang = searchParams.get('lang') || 'sr';
      const korisnikIdParam = searchParams.get('korisnikId');
      const korisnikEmailParam = searchParams.get('korisnikEmail');

      const filter: Prisma.ArtikalWhereInput = {};
      if (korisnikIdParam) {
        const korisnikId = Number(korisnikIdParam);
        if (isNaN(korisnikId)) {
          return NextResponse.json({ error: 'Invalid korisnikId, expected integer' }, { status: 400 });
        }
        filter.korisnikId = korisnikId;
      } else if (korisnikEmailParam) {
        filter.korisnik = { email: korisnikEmailParam };
      }

      const artikli = await prisma.artikal.findMany({
        where: filter,
        include: { korisnik: true },
      });

      return NextResponse.json({ artikli, count: artikli.length });
    } catch (error) {
      return NextResponse.json({ error: 'Greška pri učitavanju artikala' }, { status: 500 });
    }
}