/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const artikli = await prisma.artikal.findMany({
      include: { korisnik: true },
    });
    return NextResponse.json(artikli);
  } catch (error) {
    return NextResponse.json({ error: "Greška pri učitavanju." }, { status: 500 });
  }
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
