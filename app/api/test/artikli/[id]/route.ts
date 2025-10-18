import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Sačekajte da se Promise razreši
  try {
    const artikal = await prisma.artikal.findUnique({
      where: { id: Number(id) },
      include: { korisnik: true },
    });
    if (!artikal)
      return NextResponse.json({ error: "Artikal nije pronađen." }, { status: 404 });
    return NextResponse.json(artikal);
  } catch {
    return NextResponse.json({ error: "Greška." }, { status: 500 });
  }
}


export async function PUT(req: Request, { params }: { params:  Promise<{ id: string }> }) {
  const { id } = await params; // Sačekajte da se Promise razreši
  try {
    const data = await req.json();
    const { naziv, opis } = data;

    const artikal = await prisma.artikal.update({
      where: { id: Number(id) },
      data: { naziv, opis },
    });

    return NextResponse.json(artikal);
  } catch {
    return NextResponse.json({ error: "Greška pri ažuriranju." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params:  Promise<{ id: string }> }) {
  const { id } = await params; // Sačekajte da se Promise razreši
  try {
    await prisma.artikal.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Artikal je obrisan." });
  } catch {
    return NextResponse.json({ error: "Greška pri brisanju." }, { status: 500 });
  }
}
