import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';



export async function GET() {
    const detalji = await prisma.detalji.findMany({
        select: {
           opis: true,
        }
    });


    return NextResponse.json(detalji);
}