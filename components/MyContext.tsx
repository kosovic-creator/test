'use client';
import i18n from '@/app/i18n/config';
import React, { createContext, useEffect, useState, ReactNode } from 'react';

// 1. Definiši tip vrednosti konteksta
interface MyContextType {
  value: string;
  setValue: (val: string) => void;
}

// 2. Kreiraj Context sa početnom vrednošću null
const MyContext = createContext<MyContextType | null>(null);

// 3. Provider komponenta koja obezbeđuje vrednost konteksta
export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    // Ako u URL-u postoji ?lang=, postavi i18n jezik na klijentu
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const lang = searchParams.get('lang');
      if (lang) {
        i18n.changeLanguage(lang).catch(() => {
          /* ignore */
        });
      }
    }
  }, []);
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};
export default MyContext;
// 4. Komponenta koja koristi Context vrednost
