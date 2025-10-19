import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { compare, hash } from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { email, currentPassword, newPassword } = await req.json() as { email?: string; currentPassword?: string; newPassword?: string }
    if (!email || !currentPassword || !newPassword) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const user = await prisma.korisnik.findUnique({ where: { email } })
    if (!user || !user.password) return NextResponse.json({ error: 'User not found or no password set' }, { status: 404 })
    const ok = await compare(currentPassword, user.password)
    if (!ok) return NextResponse.json({ error: 'Current password incorrect' }, { status: 403 })

    const hashed = await hash(newPassword, 10)
    await prisma.korisnik.update({ where: { email }, data: { password: hashed } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
