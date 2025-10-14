'use client'
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'

type Artikal = {
    id: string;
    naziv: string;
    cijena: number;
};

const ArtikliPage = () => {
    const router = useRouter();
    const [data, setData] = useState<Artikal[]>([]);
    const [error, setError] = useState<boolean | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchArtikli = async () => {
            const response = await fetch('/api/test');
            const artikliData = await response.json();
            setData(artikliData);
        };
        fetchArtikli();
    }, []);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 3000);
            return () => clearTimeout(timer);
        }
        if (success) {
            const timer = setTimeout(() => setSuccess(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const handleDelete = async (id: string) => {
        const response = await fetch(`/api/test/${id}`, { method: 'DELETE' });
        const data = await response.json();
        setError(false);
        setSuccess(true);
        if (data.error) return;
        setTimeout(() =>  setData(prev => prev.filter(a => a.id !== id)), 4000);
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Artikli Page</h1>
            <button
                onClick={() => router.push('/test/crud/artikli/dodaj')}
                className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow"
            >
                Create
            </button>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Naziv</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Cijena</th>
                            <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((artikal) => (
                            <tr key={artikal.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-900">{artikal.naziv}</td>
                                <td className="px-6 py-4 text-gray-900">{artikal.cijena.toFixed(2)}</td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => router.push(`/test/crud/artikli/izmjeni/${artikal.id}`)}
                                        className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded text-sm font-semibold"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(artikal.id)}
                                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-semibold"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {error && <div className="mt-4 text-red-600 font-semibold">Greška prilikom brisanja artikla.</div>}
            {success && <div className="mt-4 text-green-600 font-semibold">Artikal uspješno obrisan.</div>}
            <Suspense fallback={<div>Loading...</div>}>
                {/* Removed undefined <Button> component */}
            </Suspense>
        </div>
    );
}

export default ArtikliPage;
