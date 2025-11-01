import React from 'react'

interface DugmeProps {
  children: React.ReactNode;
}

const Dugme = ({ children }: DugmeProps) => {
  return (
    <div className="inline-block px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-700 cursor-pointer select-none">

      {children}

    </div>
  )
}

export default Dugme
