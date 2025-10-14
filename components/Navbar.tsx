'use client';
import Link from 'next/link'
import React, { useContext } from "react";
import MyContext from './MyContext';

const Navbar = () => {
  const context = useContext(MyContext);
  return (
    <>
      <p>kontext: {context ? context.value : 'N/A'}</p>

      <div style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Application</h1>
        <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
          <li style={{ marginRight: '10px' }}><Link href="/">Home</Link></li>
          <li style={{ marginRight: '10px' }}><Link href="/crud/artikli">Artikli</Link></li>
          {/* <li><Link href="/test/crud/artikli/izmjeni/[id]">Izmjena Artikla</Link></li> */}
        </ul>
      </div>
    </>
  )
}

export default Navbar