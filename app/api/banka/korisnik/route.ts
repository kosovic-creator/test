import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');
  if (!email) {
    return NextResponse.json({ message: 'Email je obavezan.' }, { status: 400 });
  }
  const korisnik = await prisma.account.findUnique({ where: { email } });
  if (!korisnik) {
    return NextResponse.json({ message: `Račun sa emailom ${email} ne postoji.` }, { status: 404 });
  }
  return NextResponse.json({ korisnik }, { status: 200 });
}
