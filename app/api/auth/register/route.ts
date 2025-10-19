import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, ime } = body as { email?: string; password?: string; ime?: string }
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    const existing = await prisma.korisnik.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
    }

    const hashed = await hash(password, 10)
    const user = await prisma.korisnik.create({ data: { email, password: hashed, ime: ime ?? '' } })

    return NextResponse.json({ ok: true, id: user.id }, { status: 201 })
  } catch (err) {
    console.error('register error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
