'use client';
import React, { useState } from 'react';

const Transfer = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<string | null>(null);

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
  };

  return (
    <div>
      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={e => setFrom(e.target.value)}
      />
      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={e => setTo(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Pošalji transfer</button>
      {result && <div>{result}</div>}
    </div>
  );
};

export default Transfer;

