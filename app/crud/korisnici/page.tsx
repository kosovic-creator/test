"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Korisnik = {
  id: number;
  email: string;
  ime: string;
};

export default function KorisnikPage() {
  const [korisnici, setKorisnici] = useState<Korisnik[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchKorisnici() {
      try {
        const res = await fetch("/api/test/korisnik");
        if (!res.ok) {
          setError("Greška pri učitavanju korisnika");
          return;
        }
        const data = await res.json();
        setKorisnici(data);
        setError(null);
      } catch {
        setError("Greška pri komunikaciji");
      }
    }

    fetchKorisnici();
  }, []);

  async function handleDelete(id: number) {
    // if (!confirm("Da li ste sigurni da želite da obrišete korisnika?")) return;

    try {
      const res = await fetch(`/api/test/korisnik/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Korisnik uspešno obrisan");
        setKorisnici((prev) => prev.filter((k) => k.id !== id));
      } else {
        setError(data.error || "Greška pri brisanju");
      }
    } catch {
      setError("Greška pri komunikaciji");
    }

    setTimeout(() => {
      setError(null);
      setSuccess(null);
      router.push("/crud/korisnici");
    }, 3000);
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Korisnici</h2>
      <button
        onClick={() => router.push("/crud/korisnici/dodaj")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Dodaj korisnika
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <ul className="space-y-4">
        {korisnici.map((korisnik) => (
          <li key={korisnik.id} className="flex justify-between items-center">
            <div>
              <strong>{korisnik.ime}</strong> — {korisnik.email}
            </div>
            <div>
                <button
                onClick={() => router.push(`/crud/korisnici/izmjeni/${korisnik.id}`)}
                className="text-blue-500 hover:underline mr-4"
              >
                Izmeni
              </button>
              <button
                onClick={() => handleDelete(korisnik.id)}
                className="text-red-500 hover:underline"
              >
                Obriši
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
