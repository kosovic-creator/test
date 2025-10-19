"use client"
import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string | null
}

export default function FormInput({ label, error, className = '', ...rest }: Props) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input {...rest} className={`mt-1 block w-full border rounded px-3 py-2 ${className} ${error ? 'border-red-500' : 'border-gray-300'}`} />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}
