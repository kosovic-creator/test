"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function IzmeniKorisnika() {
  const params = useParams();
  const korisnikId = params?.id;

  const [email, setEmail] = useState("");
  const [ime, setIme] = useState("");
  const [poruka, setPoruka] = useState<string | null>(null);

  useEffect(() => {
    if (!korisnikId) return;

    async function fetchKorisnik() {
      try {
        const res = await fetch(`/api/test/korisnik/${korisnikId}`);
        const data = await res.json();
        if (res.ok) {
          setEmail(data.email);
          setIme(data.ime);
        } else {
          setPoruka(data.error || "Greška pri učitavanju");
        }
      } catch {
        setPoruka("Greška pri komunikaciji");
      }
    }

    fetchKorisnik();
  }, [korisnikId]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!korisnikId) return;

    try {
      const res = await fetch(`/api/korisnik/${korisnikId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ime }),
      });

      const data = await res.json();

      if (res.ok) {
        setPoruka("Korisnik uspešno ažuriran");
      } else {
        setPoruka(data.error || "Greška");
      }
    } catch {
      setPoruka("Greška pri ažuriranju");
    }
  }

  return (
    <div>
      <h1>Izmeni korisnika</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ime:</label>
          <input
            type="text"
            value={ime}
            onChange={(e) => setIme(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sačuvaj izmene</button>
      </form>
      {poruka && <p>{poruka}</p>}
    </div>
  );
}
