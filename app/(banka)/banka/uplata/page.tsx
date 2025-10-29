'use client'
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react'

const Uplata = () => {
  // const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [amount, setAmount] = React.useState('');
  // const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const router = useRouter();
  const handleUplata = async (event: FormEvent) => {
    event.preventDefault();
    // Prvo validiraj da primalac postoji
    const korisnikRes = await fetch(`/api/banka/korisnik?email=${encodeURIComponent(to)}`);
    if (!korisnikRes.ok) {
      // const err = await korisnikRes.json();
      setError( 'Primalac ne postoji');
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
    if (!response.ok) {

      setError('Došlo je do greške prilikom uplate');
      return;
    }

    setSuccess('Uplata uspešna');
    setAmount('');
    setTo('');
    setTimeout(() => {
      router.push('/banka');
    }, 3500);
  };

  return (
  <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-100">
  <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center tracking-tight">
    Uplata
  </h1>

  <form onSubmit={handleUplata} className="space-y-5">
    <div className="flex flex-col">
      <label
        htmlFor="to"
        className="text-sm font-medium text-gray-700 mb-1"
      >
        Primalac:
      </label>
      <input
        type="email"
        id="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        required
        placeholder="unesi email primaoca"
        className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>

    <div className="flex flex-col">
      <label
        htmlFor="amount"
        className="text-sm font-medium text-gray-700 mb-1"
      >
        Iznos:
      </label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        placeholder="unesi iznos (npr. 25.00)"
        min="0.01"
        step="0.01"
        className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>

    <button
      type="submit"
      className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold tracking-wide hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition duration-200"
    >
      Pošalji uplatu
    </button>

    {error ? (
      <div className="text-center text-sm text-red-600 mt-4">{error}</div>
    ) : success ? (
      <div className="text-center text-sm text-green-600 mt-4">{success}</div>
    ) : null}
  </form>
</div>
  );
}
export default Uplata
