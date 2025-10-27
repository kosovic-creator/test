/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react'

const PostPage = () => {
    const [ime, setIme] = React.useState<string>('');
    const [response, setResponse] = React.useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/getpost/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ime }),
        });
        const data = await res.json();
        setResponse(data);
    };

  return (
    <div>
      <h1>Post Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ime}
          onChange={(e) => setIme(e.target.value)}
          placeholder="Unesite ime"
        />
        <button type="submit">Pošalji</button>
      </form>
      {response && <p>Odgovor: {response.message}</p>}
    </div>
  )
}

export default PostPage
