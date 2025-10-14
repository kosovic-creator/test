'use client'
import { useParams, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'

type Artikal = {
  naziv: string;
  cijena: number;
};

const Page = () => {
  const [data, setData] = useState<Artikal | null>(null);
  // const id = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '';
//   const searchParams = useSearchParams(); ovo je kad.   ?=1
// const id = searchParams.get('id');
const id= useParams().id;

  console.log('id:', id);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/test/' + id);
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
    <div>
      {data ? (
        <div>
          <h1>{data.naziv}</h1>
          <p>Cijena: {data.cijena}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Page