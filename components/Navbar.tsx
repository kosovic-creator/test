/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import Link from 'next/link'
import React, { useContext } from "react";
import MyContext from './MyContext';
import { useTranslation } from 'react-i18next';
import i18n from '@/app/i18n/config';
import { signIn, signOut, useSession } from 'next-auth/react'
import { Home, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const context = useContext(MyContext);
  const { t } = useTranslation('common');
  const { data: session, status } = useSession()
  const router = useRouter();

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
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2 px-4 py-1">
        <ShoppingCart size={16} />
        <span>Korpa: {context ? context.value : '0'}</span>
      </div>
      <nav className="border-b border-gray-300 py-2 px-4 flex justify-between items-center bg-white shadow-sm">
        <ul className="flex items-center space-x-4">
          <li className="mr-32"><Link href="/"><span className="home flex items-center"><Home size={20} /></span></Link></li>
          <li><Link href="/korisnici"><span className="home text-gray-700 hover:text-blue-600 transition">{t('korisnik')}</span></Link></li>
          <li className="home text-gray-700 hover:text-blue-600 transition">{t('web_prodavnica')}</li>
          <li className="relative">
            <div
              className="cursor-pointer inline-block relative"
              onMouseEnter={e => {
                const menu = (e.currentTarget.querySelector('.dropdown-menu') as HTMLElement);
                if (menu) menu.style.display = 'block';
              }}
              onMouseLeave={e => {
                const menu = (e.currentTarget.querySelector('.dropdown-menu') as HTMLElement);
                if (menu) menu.style.display = 'none';
              }}
            >
              <span className="px-2 py-1">▼</span>
              <ul
                className="dropdown-menu absolute top-full left-0 bg-white shadow-lg py-2 m-0 list-none min-w-[140px] z-50"
                style={{ display: 'none' }}
              >
                <li className="px-4 py-2 hover:bg-gray-100 transition">
                  <Link href="/artikli">Artikli</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 transition">
                  <Link href="/artikli/korisnik-id"> {session?.user?.name ? `Artikli ${session?.user?.name}` : "Artikli"}
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 transition">
                  <Link href="/korpa">Korpa</Link>
                </li>
              </ul>
            </div>
          </li>

        </ul>
        <div className="flex items-center space-x-2">
          {status === 'loading' ? (
            <div className="text-gray-500">Loading...</div>
          ) : session?.user ? (
            <>
              <span className="mr-2 text-gray-700">Hi, {session.user.name ?? session.user.email}</span>
              <button onClick={() => signOut()} className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition">Sign out</button>
            </>
          ) : (
            <>
              <button onClick={() => router.push('/auth/signin')} className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition">Sign in</button>
              <button onClick={() => router.push('/auth/register')} className="px-2 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition">Register</button>
            </>
          )}

          <button
            onClick={() => switchLang('sr')}
            className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium"
            aria-label="srpski"
          >
            CG
          </button>
          <button
            onClick={() => switchLang('en')}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-sm font-medium"
            aria-label="english"
          >
            EN
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navbar