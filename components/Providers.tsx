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
    if (!session || !context) return;  // Ako nema sesije ili konteksta, ne radi ništa

    // Funkcija koja dohvaća stavke korpe za trenutno ulogovanog korisnika
    const fetchKorpa = () => {
      fetch(`/api/prodavnica/korpa?korisnikId=${session.user.id}`)
        .then(res => res.json())
        .then((data: StavkaKorpe[]) => {
          // Zbroj količina svih stavki u korpi
          const totalKolicina = data.reduce((sum, item) => sum + item.kolicina, 0);
          // Postavi brojka u kontekst da se može koristiti u drugim dijelovima aplikacije
          context.setValue(totalKolicina.toString());
        });
    };

    fetchKorpa(); // Prvo pozivanje da se inicijalno učita stanje korpe

    // Dodaj listener na globalni window koji će slušati 'korpa-updated' događaj
    // svaki put kad se on dogodi poziva fetchKorpa da osveži stanje korpe
    window.addEventListener('korpa-updated', fetchKorpa);

    // Cleanup funkcija koja se poziva prilikom unmountovanja ili promjene dependencija
    // - uklanja event listener da se ne bi acumirale višestruke funkcije
    return () => {
      window.removeEventListener('korpa-updated', fetchKorpa);
    };
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
