import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const accounts = await prisma.account.findMany()
  return NextResponse.json({ accounts }, { status: 200 })
}