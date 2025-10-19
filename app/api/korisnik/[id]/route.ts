import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await context.params;
    const id = Number(idStr);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "Nevažeći ili nedostajući id." }, { status: 400 });
    }

    const korisnik = await prisma.korisnik.findUnique({
      where: { id },
      select: { id: true, ime: true, email: true },
    });

    if (!korisnik) {
      return NextResponse.json(
        { error: "Korisnik nije pronađen." },
        { status: 404 }
      );
    }

    return NextResponse.json(korisnik);
  } catch (err) {
    console.error("GET /api/korisnici/[id] error:", err);
    return NextResponse.json(
      { error: "Greška pri učitavanju korisnika" },
      { status: 500 }
    );
  }
}


export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await context.params;
    const id = Number(idStr);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "Nevažeći ili nedostajući id." }, { status: 400 });
    }

    const { email, ime } = await request.json();
    if (!email || !ime) {
      return NextResponse.json({ error: "Nedostaju podaci za ažuriranje." }, { status: 400 });
    }

    const korisnik = await prisma.korisnik.update({
      where: { id },
      data: { email, ime },
    });
    return NextResponse.json(korisnik);
  } catch (err) {
    console.error("PUT /api/korisnik/[id] error:", err);
    return NextResponse.json({ error: "Greška pri ažuriranju" }, { status: 500 });
  }
}
export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await context.params;
    const id = Number(idStr);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "Nevažeći ili nedostajući id." }, { status: 400 });
    }

    await prisma.korisnik.delete({ where: { id } });
    return NextResponse.json({ message: "Korisnik je obrisan." });
  } catch (err) {
    console.error("DELETE /api/korisnik/[id] error:", err);
    return NextResponse.json({ error: "Greška pri brisanju korisnika" }, { status: 500 });
  }
}


