/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const korisnici = await prisma.korisnici.findMany({
       // ovo je za relaciju sa korisnici tabelom Korisnik  Jedan korisnik može imati više artikala(one-to-many)
      select: {
       id: true,
       ime: true,
       prezime: true,
       email: true,
       lozinka: true,
       artikli: { select: { naziv: true, cijena: true, detalji: { select: { opis: true } } } }
      }
    });

    return new Response(JSON.stringify(korisnici), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {

    return new Response('Error fetching korisnici', { status: 500 });
  }
}