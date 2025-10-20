/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/options";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Nema aktivne sesije" }, { status: 401 });
  }

  // Primaš kompletan objekt sa podacima, uključujući custom polja
  console.log("Pročitana sesija za korisnika:", session.user.id);
  return NextResponse.json({
    message: "Sesija uspješno pročitana",
    userName: session.user?.name,
    userEmail: session.user?.email,
    userRole: (session.user as any).role, // cast ako treba jer TS ne zna za custom polja
    // ili koristiš tipove da dodaš tipizaciju za sesiju
  });
}
