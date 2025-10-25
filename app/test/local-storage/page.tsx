'use client';
import React, { useState, useEffect } from 'react';

export default function LocalStorageExample() {
  const [name, setName] = useState('');

  // čitanje iz localStorage-a
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('name');
      if (storedName) setName(storedName);
    }
  }, []);

  // zapisivanje u localStorage
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (typeof window !== 'undefined') {
      localStorage.setItem('name', newName);
    }
  };

  return (
    <div>
      <h1>Zdravo, {name || 'korisniče'}!</h1>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Unesi svoje ime"
      />
    </div>
  );
}
