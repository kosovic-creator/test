import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';

async function resolveKorisnikIdFromRequest(req: Request): Promise<number | undefined | NextResponse> {
  const { searchParams } = new URL(req.url);
  const korisnikIdParam = searchParams.get('korisnikId');
  const korisnikEmailParam = searchParams.get('korisnikEmail');

  if (korisnikIdParam !== null) {
    const parsed = Number(korisnikIdParam);
    if (Number.isNaN(parsed) || !Number.isInteger(parsed)) {
      return new NextResponse(JSON.stringify({ error: 'Invalid korisnikId' }), { status: 400 });
    }
    return parsed;
  }

  if (korisnikEmailParam !== null) {
    const korisnik = await prisma.korisnik.findUnique({ where: { email: korisnikEmailParam } });
    if (!korisnik) return new NextResponse(JSON.stringify({ error: 'Korisnik not found' }), { status: 404 });
    return korisnik.id;
  }

  // fallback: try server-side session and resolve by email
  try {
    const sess = await getServerSession();
    const sessionEmail = (sess as unknown as { user?: { email?: string } })?.user?.email;
    if (sessionEmail) {
      const korisnik = await prisma.korisnik.findUnique({ where: { email: sessionEmail } });
      if (korisnik) return korisnik.id;
    }
  } catch {
    // ignore and allow unfiltered
  }

  return undefined;
}

export async function GET(req: Request) {
  const korisnikIdOrResp = await resolveKorisnikIdFromRequest(req);
  if (korisnikIdOrResp instanceof NextResponse) return korisnikIdOrResp;

  const whereClause = typeof korisnikIdOrResp === 'number' ? { korisnikId: korisnikIdOrResp } : {};

  const [artikli] = await Promise.all([
    prisma.artikal.findMany({ where: whereClause, include: { korisnik: true } }),
    // prisma.artikal.count({ where: whereClause }),
  ]);

  return NextResponse.json({ artikli });
}