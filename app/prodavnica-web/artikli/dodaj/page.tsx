/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DodajArtikal() {
  const [naziv, setNaziv] = useState("");
  const [opis, setOpis] = useState("");
  const [korisnikId, setKorisnikId] = useState("");
  const [poruka, setPoruka] = useState<string | null>(null);
  const { t } = useTranslation("artikli");
  const { data: session } = useSession();
  const router = useRouter();



const sessionUserId = (session?.user as any)?.id;

useEffect(() => {
  if (sessionUserId) {
    setKorisnikId(sessionUserId.toString());
  }
}, [sessionUserId]);

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
    const res = await fetch("/api/artikli", {
      method: "POST",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      // send numeric chosenId so the API receives an integer for korisnikId
      body: JSON.stringify({ naziv, opis, korisnikId }),
    });

    const data = await res.json();
    console.log("Korisnik ID sent:", korisnikId);

    if (res.ok) {

        setPoruka("Artikal uspešno dodat");

      setNaziv("");
      setOpis("");
      setKorisnikId("");

        setPoruka("Artikal uspešno dodat");
      setTimeout(() => {
        router.push("/artikli");
      }, 4000);
    } else {
      setPoruka(data.error || "Greška");
    }
  } catch {
    setPoruka("Greška pri komunikaciji");
  }
}
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">{t('addNew')}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="naziv" className="block text-sm font-medium text-gray-700 mb-1">
            {t('name')}
          </label>
          <input
            id="naziv"
            type="text"
            placeholder={t('name')}
            value={naziv}
            onChange={(e) => setNaziv(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="opis" className="block text-sm font-medium text-gray-700 mb-1">
            Opis
          </label>
          <textarea
            id="opis"
            placeholder="Unesi opis"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* <div>
          <label htmlFor="korisnikId" className="block text-sm font-medium text-gray-700 mb-1">
            {t('userId')}
          </label>
          <input
            id="korisnikId"
            type="number"
            placeholder={t('userId')}
            value={korisnikId}
            onChange={(e) => setKorisnikId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {t('create')}
          </button>
        </div>

        {poruka && <p className="text-sm text-red-600">{poruka}</p>}
      </form>
    </div>
  );
}