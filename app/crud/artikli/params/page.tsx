'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';


type DataType = {
  naziv: string;
  cijena: number;
};

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/test/' + id);
      const data = await response.json();
      setData(data);
    };
    fetchData();
    console.log('id:', id);
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
  )
}

export default Page
