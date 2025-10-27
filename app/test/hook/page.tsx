/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import useFetch from '@/hooks/useFeatch';
import React from 'react'


const hooks = () => {
  const result = useFetch("/api/korisnik") as any;
  const { data, loading, error } = result;

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p>Greška: {String(error)}</p>;
  if (!data) return <p>Nema podataka</p>;



  return <div>
    <h1>Korisnici</h1>
  
    <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
      <thead>
        <tr >
          <th>ID</th>
          <th>Ime</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody >
        {data.map((korisnik: any) => (
          <tr key={korisnik.id}>
            <td>{korisnik.id}</td>
            <td>{korisnik.ime}</td>
            <td>{korisnik.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>;
}

export default hooks
