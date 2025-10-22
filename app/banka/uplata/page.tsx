'use client'
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react'

const Uplata = () => {
  // const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [result, setResult] = React.useState<string | null>(null);
  const router = useRouter();
  const handleUplata = async (event: FormEvent) => {
    event.preventDefault();
    // Prvo validiraj da primalac postoji
    const korisnikRes = await fetch(`/api/banka/korisnik?email=${encodeURIComponent(to)}`);
    if (!korisnikRes.ok) {
      const err = await korisnikRes.json();
      setResult(err.message || 'Primalac ne postoji');
      return;
    }

    // Ako postoji, nastavi sa uplatom
    const response = await fetch('/api/banka/uplata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to,
        amount,
      }),
    });
    const data = await response.json();
    setResult(data.message);
    setAmount('');
    setTo('');
    setTimeout(() => {
      router.push('/banka');
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded-md">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Uplata</h1>
      <form onSubmit={handleUplata} className="space-y-4">
        <div>
          <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">Primalac:</label>
          <input
            type="email"
            id="to"
            value={to}
            onChange={e => setTo(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Iznos:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0.01"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
        >
          Pošalji uplatu
        </button>
        {result && (
          <div className="mt-3 text-center text-green-600 font-medium">
            {result}
          </div>
        )}
      </form>
    </div>
  );
}
export default Uplata
