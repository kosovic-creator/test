"use client"
import React, { ReactNode } from 'react'
import { MyProvider } from './MyContext'
import ToastProvider from './ToastProvider'
import { SessionProvider } from 'next-auth/react'
import Navbar from './Navbar'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MyProvider>
      <SessionProvider>
        <ToastProvider>
          <Navbar />
          <div style={{ padding: 8 }}>{/* LanguageSwitcher placeholder */}</div>
          {children}
        </ToastProvider>
      </SessionProvider>
    </MyProvider>
  )
}
