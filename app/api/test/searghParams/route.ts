import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const artikalId = request.nextUrl.searchParams.get('artikalId');
  if (!artikalId) return NextResponse.json({ error: 'Missing artikalId' }, { status: 400 });
  const podaci = await prisma.artikal.findMany({ where: { id: Number(artikalId) } });
  return NextResponse.json(podaci);
}