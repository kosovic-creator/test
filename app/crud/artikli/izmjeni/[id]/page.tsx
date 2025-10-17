'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next';

interface ArtikalForm {
  id: string;
  naziv: string;
  cijena: number;
  opis: string;
}

const IzmjenaPage = () => {
  const [form, setForm] = useState({
    id: '',
    naziv: '',
    cijena: 0,
    opis: '',
  });
  const params = useParams();
  const router = useRouter();
  const [error, setError] = useState<boolean | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const { t } = useTranslation('artikli');

  useEffect(() => {
    const fetchArtikal = async () => {
      const response = await fetch(`/api/test/artikli/${params.id}?lang=${new URLSearchParams(window.location.search).get('lang') || 'sr'}`);
      const fetchedData = await response.json();
      setForm({
        id: fetchedData.id ?? '',
        naziv: fetchedData.naziv ?? '',
        cijena: fetchedData.cijena ?? 0,
        opis: fetchedData.detalji?.opis ?? ''
      });
    };
    fetchArtikal();
  }, [params.id]);

  const handleEdit = async (id: string, form: ArtikalForm): Promise<void> => {
    try {
      const response: Response = await fetch(`/api/test/artikli/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const result = await response.json();
        setForm({
          id: result.id ?? '',
          naziv: result.naziv ?? '',
          cijena: result.cijena ?? 0,
          opis: result.detalji?.opis ?? ''
        });
        setSuccess(true);
        setTimeout(() => router.push('/crud/artikli'), 4000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-6 shadow rounded bg-white mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('details')}</h2>

      <input
        type="text"
        name="naziv"
        value={form.naziv}
        onChange={(e) => setForm({ ...form, naziv: e.target.value })}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Naziv"
      />

      <input
        type="number"
        name="cijena"
        value={form.cijena}
        onChange={(e) => setForm({ ...form, cijena: Number(e.target.value) })}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Cijena"
      />
      <input
        type="text"
        name="opis"
        value={form.opis}
        onChange={(e) => setForm({ ...form, opis: e.target.value })}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Opis"
      />
      <button
        onClick={() => {
          if (typeof params.id === 'string') {
            handleEdit(params.id, form);
          }
        }}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold w-full"
      >
       {t('save_changes')}
      </button>

      <div className="mt-4 min-h-[1.5rem]">
        {error && <p className="text-red-600 font-semibold">{t('error_loading_data')}</p>}
        {success && <p className="text-green-600 font-semibold">{t('data_saved_successfully')}</p>}
      </div>
    </div>
  );
};

export default IzmjenaPage;
