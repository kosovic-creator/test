"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation("korisnici");

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
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">{t('title')}</h1>

            <button
                onClick={() => router.push("/crud/korisnici/dodaj")}
                className="mb-6 px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
            >
                {t("addNew")}
            </button>

            {error && (
                <p className="mb-4 text-center text-red-600 font-semibold">{error}</p>
            )}
            {success && (
                <p className="mb-4 text-center text-green-600 font-semibold">{success}</p>
            )}

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 rounded-md divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                {t("name")}
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                {t("email")}
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                                {t("actions")}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {korisnici.map((korisnik) => (
                            <tr key={korisnik.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                    {korisnik.ime}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                    {korisnik.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center space-x-4">
                                    <button
                                        onClick={() =>
                                            router.push(`/crud/korisnici/izmjeni/${korisnik.id}`)
                                        }
                                        className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded text-sm font-semibold transition"
                                    >
                                        {t("edit")}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(korisnik.id)}
                                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-semibold transition"
                                    >
                                        {t("delete")}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
