'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Definiši tip vrednosti konteksta
interface MyContextType {
  value: string;
  setValue: (val: string) => void;
}

// 2. Kreiraj Context sa početnom vrednošću null
const MyContext = createContext<MyContextType | null>(null);

// 3. Provider komponenta koja obezbeđuje vrednost konteksta
export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState('abba'); // stanje koje delimo

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};
export default MyContext;
// 4. Komponenta koja koristi Context vrednost
