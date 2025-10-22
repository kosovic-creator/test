import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const ime = await request.json()
  console.log('API POST request body:', ime)
  return NextResponse.json({ message: 'API POST request successful', podaci: ime })
}
