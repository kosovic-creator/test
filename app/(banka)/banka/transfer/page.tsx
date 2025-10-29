'use client';
import  { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Transfer = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const router = useRouter();

  const handleTransfer = async () => {
    const response = await fetch('/api/banka/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        amount,
      }),
    });
    const data = await response.json();
    setResult(data.message);
    setTimeout(() => {
    router.push('/banka');
  }, 1500);
  };

  return (
   <div className="max-w-lg mx-auto p-4 bg-white rounded-md shadow space-y-4">
  <input
    type="text"
    placeholder="From"
    value={from}
    onChange={e => setFrom(e.target.value)}
    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
  <input
    type="text"
    placeholder="To"
    value={to}
    onChange={e => setTo(e.target.value)}
    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
  <input
    type="number"
    placeholder="Amount"
    value={amount}
    onChange={e => setAmount(e.target.value)}
    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
  <button
    onClick={handleTransfer}
    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition-colors"
  >
    Pošalji transfer
  </button>
  {result && (
    <div className="mt-3 text-center text-green-600 font-medium">
      {result}
    </div>
  )}
</div>
  );
};

export default Transfer;

