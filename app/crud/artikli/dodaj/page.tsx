"use client";

import { useState } from "react";

export default function DodajArtikal() {
  const [naziv, setNaziv] = useState("");
  const [opis, setOpis] = useState("");
  const [korisnikId, setKorisnikId] = useState("");
  const [poruka, setPoruka] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const id = Number(korisnikId);
    if (isNaN(id) || id <= 0) {
      setPoruka("Neispravan korisnički ID");
      return;
    }

    try {
      const res = await fetch("/api/test/artikli", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naziv, opis, korisnikId: id }),
      });

      const data = await res.json();

      if (res.ok) {
        setPoruka("Artikal uspešno dodat");
        setNaziv("");
        setOpis("");
        setKorisnikId("");
      } else {
        setPoruka(data.error || "Greška");
      }
    } catch {
      setPoruka("Greška pri komunikaciji");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dodaj artikal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="naziv" className="block text-sm font-medium text-gray-700 mb-1">
                    Naziv
                  </label>
                  <input
                    id="naziv"
                    type="text"
                    placeholder="Unesi naziv"
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

                <div>
                  <label htmlFor="korisnikId" className="block text-sm font-medium text-gray-700 mb-1">
                    Korisnik ID
                  </label>
                  <input
                    id="korisnikId"
                    type="number"
                    placeholder="Unesi korisnički ID"
                    value={korisnikId}
                    onChange={(e) => setKorisnikId(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Dodaj
                  </button>
                </div>

                {poruka && <p className="text-sm text-red-600">{poruka}</p>}
              </form>
            </div>
          );
        }