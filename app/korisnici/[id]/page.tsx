"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function PrikaziKorisnikId() {
  const params = useParams();
  const korisnikId = params?.id;

  const [id, setId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!korisnikId) return;

    async function fetchKorisnikId() {
      try {
        const res = await fetch(`/api/korisnik/${korisnikId}`);
        const data = await res.json();
        if (res.ok && data.id) {
          setId(data.id);
          setError(null);
        } else {
          setError(data.error || "Korisnik nije pronađen");
          setId(null);
        }
      } catch {
        setError("Greška pri komunikaciji");
        setId(null);
      }
    }

    fetchKorisnikId();
  }, [korisnikId]);

  if (!korisnikId) return <p className="text-center mt-10 text-red-600">Korisnik ID nije pronađen</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Prikaz korisnika</h1>
      {error && <p className="text-red-600">{error}</p>}
      {id && <p className="text-gray-800">ID korisnika: {id}</p>}
    </div>
  );
}
