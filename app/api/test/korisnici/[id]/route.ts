import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params; // await je obavezan!
    try {
        await prisma.artikli.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params; // await je obavezan!
    try {
        const korisnik = await prisma.korisnici.findUnique({
            where: { id },
            select: {
                id: true,
                ime: true,
                prezime: true,
                email: true,
                lozinka: true,
                artikli: { select: { naziv: true, cijena: true, detalji: { select: { opis: true } } } }
            }
        });
        if (!korisnik) {
            return NextResponse.json({ error: 'Korisnik not found' }, { status: 404 });
        }
        return NextResponse.json(korisnik);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
    }
}
export async function PUT(request: Request) {
    const data = await request.json();
    const updatedArtikal = await prisma.artikli.update({
        where: { id: data.id },
        data: {
            naziv: data.naziv,
            cijena: data.cijena,
            detalji: {
                update:
                {
                    data: { opis: data.opis }
                }
            }
        },
        include: { detalji: true }
    });
    return NextResponse.json(updatedArtikal);
}