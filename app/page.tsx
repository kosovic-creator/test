/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Home() {

   const { data: session, status } = useSession()
   const ime = session?.user?.name;
  useEffect(() => {
  const handleResize = () => {
    console.log('Veličina prozora je promijenjena!');
  };
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
  return (
    <>
     Zdravo: {ime}

    </>
  );
}