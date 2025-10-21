/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { to, amount } = await req.json();
    const parsedAmount = Number(amount);

    if (!to || !amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { message: 'to i amount su obavezni parametri i amount mora biti broj > 0' },
        { status: 400 }
      );
    }

    // Provjeri postoji li primalac
    const recipientAccount = await prisma.account.findUnique({ where: { email: to } });

    if (!recipientAccount) {
      return NextResponse.json({ message: `Račun primaoca (${to}) ne postoji.` }, { status: 404 });
    }

    // Ažuriraj stanje računa primaoca
    const updatedRecipient = await prisma.account.update({
      where: { email: to },
      data: { balance: { increment: parsedAmount } },
    });

    return NextResponse.json(
      { message: 'Uplata uspešna', recipient: updatedRecipient },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Greška pri uplati' },
      { status: 500 }
    );
  }
}