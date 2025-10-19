import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const korisnici = await prisma.korisnik.findMany();
    return NextResponse.json(korisnici);
  } catch {
    return NextResponse.json({ error: "Greška pri učitavanju korisnika" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email, ime } = await req.json();

    if (!email || !ime) {
      return NextResponse.json({ error: "Nedostaju podaci" }, { status: 400 });
    }

    const korisnik = await prisma.korisnik.create({
      data: { email, ime },
    });

    return NextResponse.json(korisnik, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Greška pri kreiranju korisnika" }, { status: 500 });
  }
}
