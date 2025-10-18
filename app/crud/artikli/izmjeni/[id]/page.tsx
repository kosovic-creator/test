"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function IzmeniArtikal() {
  const params = useParams();
  const artikalId = params?.id;

  const [naziv, setNaziv] = useState("");
  const [opis, setOpis] = useState("");
  const [poruka, setPoruka] = useState<string | null>(null);

  useEffect(() => {
    if (!artikalId) return;

    async function fetchArtikal() {
      try {
        const res = await fetch(`/api/test/artikli/${artikalId}`);
        const data = await res.json();
        if (res.ok) {
          setNaziv(data.naziv);
          setOpis(data.opis || "");
        } else {
          setPoruka(data.error || "Greška pri učitavanju");
        }
      } catch {
        setPoruka("Greška pri komunikaciji");
      }
    }

    fetchArtikal();
  }, [artikalId]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!artikalId) return;

    try {
      const res = await fetch(`/api/test/artikli/${artikalId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naziv, opis }),
      });

      const data = await res.json();

      if (res.ok) {
        setPoruka("Artikal uspešno ažuriran");
      } else {
        setPoruka(data.error || "Greška");
      }
    } catch {
      setPoruka("Greška pri komunikaciji");
    }
  }

  if (!artikalId) return <p className="text-center mt-10 text-red-600">Artikal ID nije dostupan</p>;

  return (
    <form
      onSubmit={handleUpdate}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Izmeni artikal</h2>

      <div>
        <label htmlFor="naziv" className="block mb-1 text-sm font-medium text-gray-700">
          Naziv
        </label>
        <input
          id="naziv"
          type="text"
          value={naziv}
          onChange={(e) => setNaziv(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="opis" className="block mb-1 text-sm font-medium text-gray-700">
          Opis
        </label>
        <textarea
          id="opis"
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Sačuvaj promene
      </button>

      {poruka && <p className="text-center text-sm text-gray-700">{poruka}</p>}
    </form>
  );
}
