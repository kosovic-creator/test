"use client";

import { useState } from "react";

export default function DodajKorisnika() {
  const [email, setEmail] = useState("");
  const [ime, setIme] = useState("");
  const [poruka, setPoruka] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/test/korisnik", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ime }),
      });

      const data = await res.json();

      if (res.ok) {
        setPoruka("Korisnik uspešno dodat");
        setEmail("");
        setIme("");
      } else {
        setPoruka(data.error || "Greška");
      }
    } catch {
      setPoruka("Greška pri komunikaciji");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dodaj korisnika</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Unesi email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="ime" className="block text-sm font-medium text-gray-700 mb-1">
            Ime
          </label>
          <input
            id="ime"
            type="text"
            placeholder="Unesi ime"
            value={ime}
            onChange={(e) => setIme(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Dodaj korisnika
        </button>
      </form>
      {poruka && <p className="mt-4 text-center text-sm font-medium text-gray-700">{poruka}</p>}
    </div>
  );
}
