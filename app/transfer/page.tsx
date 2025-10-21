'use client';
import React, { useState } from 'react';

const Transfer = () => {
  const [result, setResult] = useState<string | null>(null);

  const handleTransfer = async () => {
    const response = await fetch('/api/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'drasko.kosovic@gmail.com',
        to: 'ana@gmail.com',
        amount: 100,
      }),
    });
    const data = await response.json();
    setResult(data.message);
  };

  return (
    <div>
      <button onClick={handleTransfer}>Pošalji transfer</button>
      {result && <div>{result}</div>}
    </div>
  );
};

export default Transfer;

