'use client'
import React from 'react'

const UplataPage = () => {
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const to = formData.get('to');
        const amount = formData.get('amount');

        const response = await fetch('/api/banka/uplata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to, amount }),
        });

        const data = await response.json();
        console.log(data);
    };

  return (
    <div>
      <h1>Uplata</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="to">Primalac:</label>
          <input type="email" id="to" name="to" required />
        </div>
        <div>
          <label htmlFor="amount">Iznos:</label>
          <input type="number" id="amount" name="amount" required />
        </div>
        <button type="submit">Uplati</button>
      </form>
    </div>
  )
}

export default UplataPage
