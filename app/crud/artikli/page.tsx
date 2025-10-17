'use client'
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

type Artikal = {
    id: string;
    naziv: string;
    cijena: number;
    detalji?: {
        opis: string;
    };
};

const ArtikliPage = () => {
    const { t } = useTranslation('artikli');
    const router = useRouter();
    const [data, setData] = useState<Artikal[]>([]);
    const [error, setError] = useState<boolean | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const lang = searchParams?.get('lang') || 'sr';
    useEffect(() => {
        const fetchArtikli = async () => {
            try {
                // updated to match API route under /api/test/artikli
                const response = await fetch(`/api/test/artikli?lang=${lang}`);
                if (!response.ok) {
                    console.error('Failed to fetch artikli data', response.status, response.statusText);
                    setError(true);
                    return;
                }
                const artikliData = await response.json();
                setData(artikliData);
                setError(false);
                console.log('Fetched artikli data', artikliData);
            } catch (err) {
                console.error('Error fetching artikli data', err);
                setError(true);
            }
        };
        fetchArtikli();

    }, [lang]);
    const handleDelete = async (id: string) => {
        const response = await fetch(`/api/test/artikli/${id}`, { method: 'DELETE' });
        const data = await response.json();
        setError(false);
        setSuccess(true);

        if (data.error) return;
        setTimeout(() => setData(prev => prev.filter(a => a.id !== id)), 2000);
        setTimeout(() => setSuccess(false), 1000);
    };

    const handleEdit = (artikal: Artikal) => {
        // navigate to edit page; form state removed since it's unused here
        router.push(`/crud/artikli/izmjeni/${artikal.id}`);
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">{t('title')}</h1>
            <button
                onClick={() => router.push('/crud/artikli/dodaj')}
                className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow"
            >
                {t('create')}
            </button>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">{t('name')}</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">{t('price')}</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">{t('description')}</th>
                            <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((artikal) => (
                            <tr key={artikal.id}>
                                <td className="px-6 py-4 text-gray-900">{artikal.naziv}</td>
                                <td className="px-6 py-4 text-gray-900">{artikal.cijena.toFixed(2)}</td>
                                <td className="px-6 py-4 text-gray-900">
                                    {artikal.detalji?.opis ?? ''}
                                </td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => handleEdit(artikal)}
                                        className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded text-sm font-semibold"
                                    >
                                        {t('edit')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => router.push(`/crud/artikli/${artikal.id}`)}
                                        className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded text-sm font-semibold"
                                    >
                                        {t('details')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(artikal.id)}
                                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-semibold"
                                    >
                                        {t('delete')}
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
