import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const korisnikId = searchParams.get("korisnikId");

    if (!korisnikId)
      return NextResponse.json({ error: "Nedostaju podaci." }, { status: 400 });

    const stavkeKorpe = await prisma.korpa.findMany({
      where: { korisnikId: Number(korisnikId) },
      include: { artikal: true, korisnik: true }
    });
    return NextResponse.json(stavkeKorpe);
  } catch {
    return NextResponse.json({ error: "Greška pri učitavanju korpe." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { korisnikId, artikalId } = data;

    if (!korisnikId || !artikalId)
      return NextResponse.json({ error: "Nedostaju podaci." }, { status: 400 });

    const stavka = await prisma.korpa.create({
      data: { korisnikId: Number(korisnikId), artikalId: Number(artikalId) },
      include: { artikal: true },
    });

    return NextResponse.json(stavka, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Greška pri dodavanju u korpu." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    const { korisnikId, artikalId } = data;

    if (!korisnikId || !artikalId)
      return NextResponse.json({ error: "Nedostaju podaci." }, { status: 400 });

    await prisma.korpa.deleteMany({
      where: { korisnikId: Number(korisnikId), artikalId: Number(artikalId) },
    });

      return NextResponse.json({ message: "Stavka izbrisana iz korpe." });
    } catch {
      return NextResponse.json({ error: "Greška pri brisanju iz korpe." }, { status: 500 });
    }
  }