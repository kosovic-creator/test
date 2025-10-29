/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'

const Stanje = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchStanje = async () => {
      try {
        const res = await fetch('/api/banka', { method: 'GET' });
        const data = await res.json();
        setAccounts(data.accounts || []);
      } catch (error) {
        console.error('Error fetching stanje:', error);
      }
    };
    fetchStanje();
  }, []);

  return (
  <div className="overflow-x-auto">
  <table className="min-w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Stanje</th>
      </tr>
    </thead>
    <tbody>
      {accounts.map((acc: any) => (
        <tr key={acc.id} className="hover:bg-gray-50 even:bg-white odd:bg-gray-50">
          <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">{acc.id}</td>
          <td className="border border-gray-300 px-4 py-2 text-sm text-blue-600">{acc.email}</td>
          <td className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800">{acc.balance}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}

export default Stanje;
