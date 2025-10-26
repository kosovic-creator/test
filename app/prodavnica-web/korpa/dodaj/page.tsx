'use client';
import React, { useState } from 'react'
import { useSession } from 'next-auth/react';

const DodajPage = () => {
    const { data: session } = useSession();
    // const [korisnikId, setKorisnikId] = useState<number>();
    const [artikalId, setArtikalId] = useState<number>(0);
    const [kolicina, setKolicina] = useState<number>(1);
    const korisnikId = session?.user.id;


     const handleAdd = (artikalId: number, kolicina: number) => {
        fetch('/api/prodavnica/korpa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                korisnikId,
                artikalId,
                kolicina
            })
        });
    };

  return (
   <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
  <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 border border-gray-200">
    <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
      Dodaj artikal u korpu
    </h1>

    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (artikalId &&  kolicina) {
          handleAdd(artikalId,  kolicina);
        }
      }}
      className="space-y-5"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Korisnik ID:  {korisnikId}
        </label>
        {/* <input
          type="number"
          value={korisnikId}
          onChange={(e) => setKorisnikId(Number(e.target.value))}
          placeholder="Unesi korisnika ID"
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        /> */}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Artikal ID
        </label>
        <input
          type="number"
          value={artikalId}
          onChange={(e) => setArtikalId(Number(e.target.value))}
          placeholder="Unesi artikal ID"
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Količina
        </label>
        <input
          type="number"
          value={kolicina}
          onChange={(e) => setKolicina(Number(e.target.value))}
          placeholder="Unesi količinu"
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-md shadow-md transition-colors"
      >
        Dodaj u korpu
      </button>
    </form>
  </div>
</div>

  )
}

export default DodajPage