/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Home() {

   const { data: session, status } = useSession()
   const ime = session?.user?.name;
  return (
    <>
     Zdravo: {ime}
    </>
  );
}