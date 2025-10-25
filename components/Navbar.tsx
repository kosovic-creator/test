'use client';
import Link from 'next/link'
import React, { useContext } from "react";
import MyContext from './MyContext';
import { useTranslation } from 'react-i18next';
import i18n from '@/app/i18n/config';
import { signIn, signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const context = useContext(MyContext);
  const { t } = useTranslation('common');
  const { data: session, status } = useSession()

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

        <ul style={{ display: 'flex', listStyle: 'none', padding: 0, alignItems: 'center' }}>
          <li style={{ marginRight: '300px' }}><Link href="/"><span className="home">{t('home')}</span></Link></li>

          <li style={{ marginRight: '10px' }}><Link href="/korisnici"><span className="home">{t('korisnik')}</span></Link></li>
           <li style={{ marginRight: '10px' }} className="home">{t('artikli')}</li>
          <li style={{ position: 'relative', marginRight: '10px' }}>
            <div
              style={{ cursor: 'pointer', display: 'inline-block', position: 'relative' }}
              onMouseEnter={e => {
                const menu = (e.currentTarget.querySelector('.dropdown-menu') as HTMLElement);
                if (menu) menu.style.display = 'block';
              }}
              onMouseLeave={e => {
                const menu = (e.currentTarget.querySelector('.dropdown-menu') as HTMLElement);
                if (menu) menu.style.display = 'none';
              }}
            >
              <span style={{ padding: '4px 8px' }}>▼</span>
              <ul
                className="dropdown-menu"
                style={{
                  display: 'none',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  padding: '8px 0',
                  margin: 0,
                  listStyle: 'none',
                  minWidth: '140px',
                  zIndex: 1000,
                }}
              >
                <li style={{ padding: '8px 16px' }}>
                  <Link href="/artikli">Artikli</Link>
                </li>
                <li style={{ padding: '8px 16px' }}>
                  <Link href="/artikli/korisnik-id" >Artikli id od sessije</Link>
                </li>

              </ul>
            </div>
          </li>

          {/* <li style={{ marginRight: '10px' }}><Link href="/artikli"><span className="home">{t('artikli')}</span></Link></li>
          <li style={{ marginRight: '10px' }}><Link href="/artikli/korisnik-id"><span className="home">{t('artikli_korisnik_id')}</span></Link></li> */}
          <li style={{ marginRight: '10px' }} className="home">{t('banka')}</li>
          <li style={{ position: 'relative', marginRight: '10px' }}>
            <div
              style={{ cursor: 'pointer', display: 'inline-block', position: 'relative' }}
              onMouseEnter={e => {
                const menu = (e.currentTarget.querySelector('.dropdown-menu') as HTMLElement);
                if (menu) menu.style.display = 'block';
              }}
              onMouseLeave={e => {
                const menu = (e.currentTarget.querySelector('.dropdown-menu') as HTMLElement);
                if (menu) menu.style.display = 'none';
              }}
            >
              <span style={{ padding: '4px 8px' }}>▼</span>
              <ul
                className="dropdown-menu"
                style={{
                  display: 'none',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  padding: '8px 0',
                  margin: 0,
                  listStyle: 'none',
                  minWidth: '140px',
                  zIndex: 1000,
                }}
              >
                <li style={{ padding: '8px 16px' }}>
                  <Link href="/banka">Stanje</Link>
                </li>
                <li style={{ padding: '8px 16px' }}>
                  <Link href="/banka/transfer">Transferi</Link>
                </li>
                <li style={{ padding: '8px 16px' }}>
                  <Link href="/banka/uplata">Uplata</Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <div className="flex items-center space-x-2">
          {status === 'loading' ? (
            <div>Loading...</div>
          ) : session?.user ? (
            <>
              <span style={{ marginRight: 8 }}>Hi, {session.user.name ?? session.user.email}</span>
              <button onClick={() => signOut()} className="px-2 py-1 bg-red-500 text-white rounded text-sm">Sign out</button>
            </>
          ) : (
            <button onClick={() => signIn()} className="px-2 py-1 bg-green-500 text-white rounded text-sm">Sign in</button>
          )}


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