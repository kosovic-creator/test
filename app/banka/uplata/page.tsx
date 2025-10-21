//
'use client'
import React from 'react'

const Uplata = () => {
    // const [from, setFrom] = React.useState('');
    const [to, setTo] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [result, setResult] = React.useState<string | null>(null);

    const handleUplata = async () => {
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
    };
  return (
    <div>
      <h1>Uplata</h1>
      <form onSubmit={handleUplata}>
        {/* <div>
          <label htmlFor="from">Pošiljalac:</label>
          <input
            type="email"
            id="from"
            value={from}
            onChange={e => setFrom(e.target.value)}
            required
          />
        </div> */}
        <div>
          <label htmlFor="to">Primalac:</label>
          <input
            type="email"
            id="to"
            value={to}
            onChange={e => setTo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Iznos:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Uplati</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  )
}

export default Uplata
