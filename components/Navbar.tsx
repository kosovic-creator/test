'use client';
import Link from 'next/link'
import React, { useContext } from "react";
import MyContext from './MyContext';
import { useTranslation } from 'react-i18next';
import i18n from '@/app/i18n/config';

const Navbar = () => {
  const context = useContext(MyContext);
  const { t } = useTranslation('common');

  const switchLang = async (lang: string) => {
    try {
      await i18n.changeLanguage(lang);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url.toString());
    } catch {

    }
  }

  return (
    <>
      <p>kontext: {context ? context.value : 'N/A'}</p>
      <div style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Test</h1>
        <ul style={{ display: 'flex', listStyle: 'none', padding: 0, alignItems: 'center' }}>
          <li style={{ marginRight: '10px' }}><Link href="/"><span className="home">{t('home')}</span></Link></li>
          <li style={{ marginRight: '10px' }}><Link href="/crud/artikli"><span className="home">{t('back')}</span></Link></li>
        </ul>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => switchLang('sr')}
            className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium"
            aria-label="srpski"
          >
            SR
          </button>
          <button
            onClick={() => switchLang('en')}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-sm font-medium"
            aria-label="english"
          >
            EN
          </button>

        </div>
      </div>
    </>
  )
}

export default Navbar