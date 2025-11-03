import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function  Artikli(){
   const artikal = await prisma.artikal.findMany();
   return NextResponse.json(artikal);
}