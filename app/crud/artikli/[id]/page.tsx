'use client'
import { useParams } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'

type Artikal = {
  naziv: string;
  cijena: number;
};

const Page = () => {
  const [data, setData] = useState<Artikal | null>(null);
  const id= useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/test/artikli/' + id);
      if (!response.ok) {
        console.error('Failed to fetch artikal data');
        return;
      }
      const artikalData = await response.json();
      setData(artikalData);
    };
    fetchData();
  }, [id]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <Link href="/crud/artikli">Back to Artikli</Link>
      {data ? (
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{data.naziv}</h1>
          <p className="text-lg text-gray-600">Cijena: <span className="font-semibold">{data.cijena} €</span></p>
        </div>
      ) : (
        <p className="text-center text-gray-500 italic">Loading...</p>
      )}
    </div>
  );
};

export default Page
