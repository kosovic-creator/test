import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function extractId(params: { id: string } | Promise<{ id: string }> | undefined) {
    if (!params) return undefined;
    if (typeof (params as { id?: unknown }).id === "string") return (params as { id: string }).id;
    if (typeof (params as { then?: unknown }).then === "function") {
        const resolved = await (params as Promise<{ id: string }>);
        return resolved?.id;
    }
    return undefined;
}

export async function GET(_: NextRequest, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  try {
      const idStr = await extractId(params);
      const id = Number(idStr);
    const artikal = await prisma.artikal.findUnique({
        where: { id },
      include: { korisnik: true },
    });
    if (!artikal)
      return NextResponse.json({ error: "Artikal nije pronađen." }, { status: 404 });
    return NextResponse.json(artikal);
  } catch {
    return NextResponse.json({ error: "Greška." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  try {
    const data = await req.json();
    const { naziv, opis } = data;

      const idStr = await extractId(params);
      const id = Number(idStr);

    const artikal = await prisma.artikal.update({
        where: { id },
      data: { naziv, opis },
    });

    return NextResponse.json(artikal);
  } catch {
    return NextResponse.json({ error: "Greška pri ažuriranju." }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } | Promise<{ id: string }> }) {
  try {
      const idStr = await extractId(params);
      const id = Number(idStr);
      await prisma.artikal.delete({ where: { id } });
    return NextResponse.json({ message: "Artikal je obrisan." });
  } catch {
    return NextResponse.json({ error: "Greška pri brisanju." }, { status: 500 });
  }
}
