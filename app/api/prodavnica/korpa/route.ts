/* eslint-disable @typescript-eslint/no-unused-vars */
export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    const { korisnikId, artikalId, kolicina } = data;
    const korisnikIDNum = Number(korisnikId);
    const artikalIDNum = Number(artikalId);
    const kolicinaNum = Number(kolicina) || 1;

    if (!korisnikId || !artikalId || isNaN(korisnikIDNum) || isNaN(artikalIDNum) || korisnikIDNum <= 0 || artikalIDNum <= 0)
      return NextResponse.json({ error: "Nedostaju ili neispravni podaci." }, { status: 400 });

    const existing = await prisma.korpa.findUnique({
      where: {
        korisnikId_artikalId: {
          korisnikId: korisnikIDNum,
          artikalId: artikalIDNum
        }
      }
    });

    if (!existing)
      return NextResponse.json({ error: "Stavka ne postoji u korpi." }, { status: 404 });

    if (existing.kolicina > kolicinaNum) {
      // Smanji količinu
      const updated = await prisma.korpa.update({
        where: {
          korisnikId_artikalId: {
            korisnikId: korisnikIDNum,
            artikalId: artikalIDNum
          }
        },
        data: {
          kolicina: existing.kolicina - kolicinaNum
        }
      });
      return NextResponse.json(updated);
    } else {
      // Ako je količina 1 ili manje, obriši stavku
      await prisma.korpa.delete({
        where: {
          korisnikId_artikalId: {
            korisnikId: korisnikIDNum,
            artikalId: artikalIDNum
          }
        }
      });
      return NextResponse.json({ message: "Stavka izbrisana iz korpe." });
    }
  } catch (e) {
    return NextResponse.json({ error: "Greška pri smanjenju količine." }, { status: 500 });
  }
}
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const korisnikId = searchParams.get("korisnikId");

    if (!korisnikId)
        return NextResponse.json({ error: "Nedostaje korisnikId." }, { status: 400 });

      const id = Number(korisnikId);
    const stavkeKorpe = await prisma.korpa.findMany({
        where: { korisnikId: id },
      include: { artikal: true, korisnik: true }
    });
    return NextResponse.json(stavkeKorpe);
  } catch {
    return NextResponse.json({ error: "Greška pri učitavanju korpe." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {

      const data = await req.json();
      const { korisnikId, artikalId } = data;
      const id = Number(korisnikId);

      if (!id || !artikalId)
      return NextResponse.json({ error: "Nedostaju podaci." }, { status: 400 });

    await prisma.korpa.deleteMany({
        where: { korisnikId: id, artikalId: Number(artikalId) },
    });

      return NextResponse.json({ message: "Stavka izbrisana iz korpe." });
  } catch {
      return NextResponse.json({ error: "Greška pri brisanju iz korpe." }, { status: 500 });
  }
  }

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { korisnikId, artikalId, kolicina } = data;
    const korisnikIDNum = Number(korisnikId);
    const artikalIDNum = Number(artikalId);
    const kolicinaNum = Number(kolicina) || 1;

    if (!korisnikId || !artikalId || isNaN(korisnikIDNum) || isNaN(artikalIDNum) || korisnikIDNum <= 0 || artikalIDNum <= 0)
      return NextResponse.json({ error: "Nedostaju ili neispravni podaci." }, { status: 400 });

    // Check if the item already exists in the cart
    const existing = await prisma.korpa.findUnique({
      where: {
        korisnikId_artikalId: {
          korisnikId: korisnikIDNum,
          artikalId: artikalIDNum
        }
      }
    });

    let stavkaKorpe;
    if (existing) {
      // Update quantity if exists
      stavkaKorpe = await prisma.korpa.update({
        where: {
          korisnikId_artikalId: {
            korisnikId: korisnikIDNum,
            artikalId: artikalIDNum
          }
        },
        data: {
          kolicina: existing.kolicina + kolicinaNum
        }
      });
    } else {
      // Create new item
      stavkaKorpe = await prisma.korpa.create({
        data: { korisnikId: korisnikIDNum, artikalId: artikalIDNum, kolicina: kolicinaNum },
        include: { artikal: true, korisnik: true },
      });
    }

    return NextResponse.json(stavkaKorpe, { status: 201 });
  } catch (e) {
    console.error("Greška pri dodavanju u korpu:", e);
    return NextResponse.json({ error: "Greška pri dodavanju u korpu." }, { status: 500 });
  }
}