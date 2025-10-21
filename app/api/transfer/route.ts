/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import  prisma  from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { from, to, amount } = await req.json();

    if (!from || !to || !amount) {
      return NextResponse.json(
        { message: 'from, to i amount su obavezni parametri' },
        { status: 400 }
      );
    }

    // Transakcija sada vraća objekt { error, recipient }
    const { error, recipient } = await prisma.$transaction(async (tx) => {
      // Oduzmi od računa pošiljaoca
      const sender = await tx.account.update({
        where: { email: from },
        data: { balance: { decrement: amount } },
      });

      if (sender.balance < 0) {
        return { error: `${from} nema dovoljno novca.` };
      }

      // Dodaj na račun primaoca
      const recipientAccount = await tx.account.update({
        where: { email: to },
        data: { balance: { increment: amount } },
      });

      return { recipient: recipientAccount };
    });

    if (error) {
      return NextResponse.json(
        { message: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Transfer uspešan', recipient },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Greška u transakciji:', error);
    return NextResponse.json(
      { message: error.message || 'Greška pri transferu' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const accounts = await prisma.account.findMany()
  return NextResponse.json({ accounts }, { status: 200 })
}