/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import useFetch from '@/hooks/useFeatch';
import React from 'react'
import useForm from '@/hooks/useForm'
import { Values } from 'react-i18next/src/trans';

const hooks = () => {
  const result = useFetch("/api/korisnik") as any;
  const { data, loading, error } = result;

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p>Greška: {String(error)}</p>;
  if (!data) return <p>Nema podataka</p>;
   


  return <div>
    <h1>Korisnici</h1>
    <ul>
      {data.map((korisnik: any) => (
        <li key={korisnik.id}>
          {korisnik.ime} ({korisnik.email})
        </li>
      ))}
    </ul>
  </div>;
}

export default hooks
