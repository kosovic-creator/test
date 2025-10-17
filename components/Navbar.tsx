'use client';
import Link from 'next/link'
import React, { useContext } from "react";

import i18n from '@/app/i18n/config';
import MyContext from './MyContext';

const Navbar = () => {
  const context = useContext(MyContext);
  // router kept if you want to call router.refresh() later

  const switchLang = async (lang: string) => {
    try {
      await i18n.changeLanguage(lang);
      // Update URL without reloading the page
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url.toString());
      // optionally refresh data if needed
      // router.refresh();
    } catch {
      // ignore
    }
  }

  return (
    <>
      <p>kontext: {context ? context.value : 'N/A'}</p>

      <div style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Application</h1>
        <ul style={{ display: 'flex', listStyle: 'none', padding: 0, alignItems: 'center' }}>
          <li style={{ marginRight: '10px' }}><Link href="/">Home</Link></li>
          <li style={{ marginRight: '10px' }}><Link href="/crud/artikli">Artikli</Link></li>
        </ul>

        <div>
          <button onClick={() => switchLang('sr')} style={{ marginRight: 8 }} aria-label="srpski">SR</button>
          <button onClick={() => switchLang('en')} aria-label="english">EN</button>
        </div>
      </div>
    </>
  )
}

export default Navbar