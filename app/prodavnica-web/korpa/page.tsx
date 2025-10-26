'use client';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';

type StavkaKorpe = {
  id: string;
  artikal: {
    id: string;
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

    const handleDelete = (artikalId: string) => {
        if (!session) return;

        fetch(`/api/prodavnica/korpa`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            korisnikId: session.user.id,
            artikalId,
          }),
        })
        .then(res => res.json())
        .then(data => {
            // obradi odgovor nakon brisanja
            setData(prevData => prevData.filter(stavka => stavka.artikal.id !== artikalId));
            console.log(data);
        });
    };

    return (
      <div>
        <div>KorpaPage</div>
        {data && data.length > 0 ? (
          <ul>
            {data.map((stavka: StavkaKorpe) => (
              <li key={stavka.id}>
                {stavka.artikal.naziv} - Količina: {stavka.kolicina}
                <button onClick={() => handleDelete(stavka.artikal.id)}>Obriši</button>
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