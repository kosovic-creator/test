'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type StavkaKorpe = {
    id: number;
    artikal: {
        id: number;
        naziv: string;
    };
    kolicina: number;
};

const KorpaPage = () => {
    const { data: session } = useSession();
    const [data, setData] = useState<StavkaKorpe[]>([]);
    const router = useRouter();
    useEffect(() => {
        if (!session) return;

        fetch(`/api/prodavnica/korpa?korisnikId=${session.user.id}`)
            .then(res => res.json())
            .then(data => setData(data));
    }, [session]);

    const handleDelete = (artikalId: number) => {
        if (!session) return;

        fetch(`/api/prodavnica/korpa`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                korisnikId: session.user.id,
                artikalId,
            }),
        })
            .then(res => res.json())
            .then(() => {
                setData(prev => prev.filter(s => s.artikal.id !== artikalId));
            });
    };




    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                Korpa
            </h1>
            <button
                onClick={() => {
                    // if (session) {
                    //     // Zamijeni sa stvarnim vrijednostima
                    //     const artikalId = 1;
                    //     const korisnikId = Number(session.user.id);
                    //     const kolicina = 1;
                    //     handleAdd(artikalId, korisnikId, kolicina);
                    // }
                    router.push('/prodavnica-web/korpa/dodaj');
                }}
            >
                Dodaj
            </button>
            {data && data.length > 0 ? (
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                <th className="text-left px-6 py-3 border-b border-gray-200">
                                    Artikal
                                </th>
                                <th className="text-left px-6 py-3 border-b border-gray-200">
                                    Količina
                                </th>
                                <th className="text-left px-6 py-3 border-b border-gray-200">
                                    Akcije
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((stavka, i) => (
                                <tr
                                    key={stavka.id}
                                    className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                        } hover:bg-indigo-50 transition-colors`}
                                >
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                                        {stavka.artikal.naziv}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                                        {stavka.kolicina}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200">
                                        <button
                                            onClick={() => handleDelete(stavka.artikal.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-4 rounded-md transition-colors"
                                        >
                                            Obriši
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg mt-10">
                    Korpa je prazna.
                </p>
            )}
        </div>
    );
};

export default KorpaPage;
