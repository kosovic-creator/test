"use client"
import React from 'react'

export default function FormButton({ children, loading = false, ...rest }: { children: React.ReactNode, loading?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>){
  return (
    <button {...rest} disabled={loading || rest.disabled} className={`w-full py-2 px-4 rounded text-white ${loading ? 'bg-gray-400' : 'bg-sky-500'}`}>
      {loading ? 'Please wait...' : children}
    </button>
  )
}
