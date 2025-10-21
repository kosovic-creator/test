/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import  prisma  from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { from, to, amount } = await req.json();
    const parsedAmount = Number(amount);

    if (!from || !to || !amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { message: 'from, to i amount su obavezni parametri i amount mora biti broj > 0' },
        { status: 400 }
      );
    }

    // Provjeri postoji li pošiljalac i primalac
    const senderAccount = await prisma.account.findUnique({ where: { email: from } });
    const recipientAccount = await prisma.account.findUnique({ where: { email: to } });

    if (!senderAccount) {
      return NextResponse.json({ message: `Račun pošiljaoca (${from}) ne postoji.` }, { status: 404 });
    }
    if (!recipientAccount) {
      return NextResponse.json({ message: `Račun primaoca (${to}) ne postoji.` }, { status: 404 });
    }

    // Transakcija
    const { error, recipient } = await prisma.$transaction(async (tx) => {
      const sender = await tx.account.update({
        where: { email: from },
        data: { balance: { decrement: parsedAmount } },
      });

      if (sender.balance < 0) {
        return { error: `${from} nema dovoljno novca.` };
      }

      const recipientAccount = await tx.account.update({
        where: { email: to },
        data: { balance: { increment: parsedAmount } },
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
    return NextResponse.json(
      { message: error.message || 'Greška pri transferu' },
      { status: 500 }
    );
  }
}
