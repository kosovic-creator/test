'use client';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';

type StavkaKorpe = {
  id: string;
  artikal: {
    naziv: string;
  };
  kolicina: number;
};

const KorpaPage = () => {
    const { data: session } = useSession();
    const [data, setData] = useState<StavkaKorpe[]>([]);

    useEffect(() => {
        if (!session) return;

        fetch(`/api/prodavnica/korpa?korisnikId=${session.user.id}`, {
          method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            // obradi podatke iz korpe
            setData(data);
            console.log(data);
        });
    }, [session]);

    return (
      <div>
        <div>KorpaPage</div>
        {data && data.length > 0 ? (
          <ul>
            {data.map((stavka: StavkaKorpe) => (
              <li key={stavka.id}>
                {stavka.artikal.naziv} - Količina: {stavka.kolicina}
              </li>
            ))}
          </ul>
        ) : (
          <p>Korpa je prazna.</p>
        )}
      </div>
    )
}

export default KorpaPage