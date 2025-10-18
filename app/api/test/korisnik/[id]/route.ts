import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const korisnik = await prisma.korisnik.findUnique({
      where: { id: Number(params.id) },
      select: { id: true, ime: true, email: true }, // samo ova tri polja
    });
    if (!korisnik)
      return NextResponse.json({ error: "Korisnik nije pronađen." }, { status: 404 });
    return NextResponse.json(korisnik);
  } catch {
    return NextResponse.json({ error: "Greška pri učitavanju korisnika" }, { status: 500 });
  }
}



export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { email, ime } = await req.json();
    const korisnik = await prisma.korisnik.update({
      where: { id: Number(params.id) },
      data: { email, ime },
    });
    return NextResponse.json(korisnik);
  } catch {
    return NextResponse.json({ error: "Greška pri ažuriranju" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.korisnik.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ message: "Korisnik je obrisan." });
  } catch {
    return NextResponse.json({ error: "Greška pri brisanju" }, { status: 500 });
  }
}
