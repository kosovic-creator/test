'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const DodajArtikalPage = () => {
  const [form, setForm] = useState({
    naziv: '',
    cijena: 0,
    opis: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'cijena' ? Number(value) : value,
    });
  };

  const handleSubmit = async () => {
    await fetch('/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        naziv: form.naziv,
        cijena: form.cijena,
        opis: form.opis
      })
    });
  };

  const handleAddArtikal = async () => {
    try {
      const res = await fetch("/api/test", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || 'Error occurred while adding artikal');
      } else {
        setError(null);
        setSuccess(true);
        setTimeout(() => {
          router.push('/crud/artikli');
        }, 4000);
      }
    } catch {
      setError('Error occurred while adding artikal');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow rounded bg-white mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Dodaj Artikal</h2>

      <input
        type="text"
        value={form.naziv}
        onChange={e => setForm({ ...form, naziv: e.target.value })}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        value={form.cijena}
        onChange={e => setForm({ ...form, cijena: Number(e.target.value) })}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        value={form.opis}
        onChange={e => setForm({ ...form, opis: e.target.value })}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAddArtikal}
        className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold"
      >
        Dodaj novi artikal
      </button>

      <div className="mt-4 min-h-[1.5rem]">
        {error && <div className="text-red-600 font-semibold">Artikal nije dodat!</div>}
        {success && <div className="text-green-600 font-semibold">Artikal uspješno dodat!</div>}
      </div>
    </div>
  );
}

export default DodajArtikalPage;
