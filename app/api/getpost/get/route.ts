import { NextResponse } from 'next/server'

// JSON odgovor
export function GET() {
  return NextResponse.json({ message: 'Hello from Next.js!' })
}
