"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export default function IzmeniKorisnika() {
    const params = useParams();
    const korisnikId = params?.id;
    const { t } = useTranslation("korisnici");
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
            const res = await fetch(`/api/test/korisnik/${korisnikId}`, {
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
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">Izmeni korisnika</h1>
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                        {t('email')}:
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="ime" className="block mb-1 font-medium text-gray-700">
                        {t('name')}:
                    </label>
                    <input
                        id="ime"
                        type="text"
                        value={ime}
                        onChange={(e) => setIme(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                >
                    {t('saveChanges')}
                </button>
            </form>
            {poruka && <p className="mt-4 text-center text-sm text-gray-700">{poruka}</p>}
        </div>
    );
}
