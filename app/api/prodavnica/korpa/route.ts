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

// export async function DELETE(req: Request) {
//   try {
//       const session = await getServerSession(authOptions);
//       const korisnikId = session?.user?.id;
//       const id = typeof korisnikId === 'string' ? Number(korisnikId) : korisnikId;
//       const data = await req.json();
//       const { artikalId } = data;

//       if (!id || !artikalId)
//       return NextResponse.json({ error: "Nedostaju podaci." }, { status: 400 });

//     await prisma.korpa.deleteMany({
//         where: { korisnikId: id, artikalId: Number(artikalId) },
//     });

//       return NextResponse.json({ message: "Stavka izbrisana iz korpe." });
//   } catch {
//       return NextResponse.json({ error: "Greška pri brisanju iz korpe." }, { status: 500 });
//   }
//   }