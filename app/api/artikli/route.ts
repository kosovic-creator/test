/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/options";

interface SessionUser {
  id: number;
  name?: string | null;
  email?: string | null;
}

interface Session {
  user: SessionUser;
  expires?: string;
}

interface Korisnik {
  id: number;
  name?: string | null;
  email?: string | null;
}

interface Artikal {
  id: number;
  naziv: string;
  opis?: string | null;
  korisnikId: number;
  korisnik?: Korisnik | null;
}

// prilagodi na svoj auth konfiguraciju

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Nije prijavljen" }, { status: 401 });
  }

  // Try to coerce the session user id to a numeric DB id.
  let korisnikId = Number(session.user.id);

  // If coercion failed (for example when using OAuth provider ids), try to find the user by email
  // and use their numeric DB id.
  if (isNaN(korisnikId) || korisnikId <= 0) {
    if (session.user?.email) {
      try {
        const korisnikRecord = await prisma.korisnik.findUnique({ where: { email: session.user.email } });
        if (korisnikRecord && typeof korisnikRecord.id === 'number') {
          korisnikId = korisnikRecord.id;
        }
      } catch (err) {
        // ignore lookup errors here; we'll handle invalid user below
      }
    }
  }

  if (isNaN(korisnikId) || korisnikId <= 0) {
    // In development return diagnostic details to help debugging.
    if (process.env.NODE_ENV !== 'production') {
      // Avoid leaking sensitive info in production.
      return NextResponse.json(
        {
          message: "Neispravan korisnik",
          debug: {
            sessionTypeof: typeof session.user?.id,
            sessionUserIdRaw: session.user?.id,
            session,
            resolvedKorisnikId: korisnikId,
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Neispravan korisnik" }, { status: 400 });
  }

  const artikli = await prisma.artikal.findMany({
    where: { korisnikId },
    include: { korisnik: true }
  });

  return NextResponse.json(artikli);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { naziv, opis } = data;
    // accept number or string for korisnikId and coerce to number
    const rawKorisnikId = data.korisnikId;
    const korisnikId = Number(rawKorisnikId);

    if (!naziv || !rawKorisnikId || isNaN(korisnikId) || korisnikId <= 0)
      return NextResponse.json({ error: "Nedostaju ili neispravni podaci." }, { status: 400 });

    const artikal = await prisma.artikal.create({
      data: { naziv, opis, korisnikId },
      include: { korisnik: true },
    });


    return NextResponse.json(artikal, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Greška prilikom kreiranja." }, { status: 500 });
  }
}
