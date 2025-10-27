"use client"

import React, { ReactNode, useEffect, useContext } from 'react';
import { MyProvider } from './MyContext';
import ToastProvider from './ToastProvider';
import { SessionProvider, useSession } from 'next-auth/react';
import Navbar from './Navbar';
import MyContext from './MyContext';

type StavkaKorpe = {
  id: number;
  artikal: {
    id: number;
    naziv: string;
  };
  kolicina: number;
};

function KorpaContextUpdater() {
  const { data: session } = useSession();
  const context = useContext(MyContext);

  useEffect(() => {
    if (!session || !context) return;
    fetch(`/api/prodavnica/korpa?korisnikId=${session.user.id}`)
      .then(res => res.json())
      .then((data: StavkaKorpe[]) => {
        const totalKolicina = data.reduce((sum, item) => sum + item.kolicina, 0);
        context.setValue(totalKolicina.toString());
      });
  }, [session, context]);
  return null;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MyProvider>
      <SessionProvider>
        <ToastProvider>
          <KorpaContextUpdater />
          <Navbar />
          <div style={{ padding: 8 }}>{/* LanguageSwitcher placeholder */}</div>
          {children}
        </ToastProvider>
      </SessionProvider>
    </MyProvider>
  );
}
