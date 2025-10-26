/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from 'next-auth'
import prisma from '@/lib/prisma'
import { compare } from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<string, any> | undefined) {
        if (!credentials) return null
        const { email, password } = credentials as { email: string; password: string }
        const user = await prisma.korisnik.findUnique({ where: { email } })
        if (!user || !user.password) return null
        const isValid = await compare(password, user.password)
        if (!isValid) return null
        // NextAuth expects an object with at least an `id` and `email`
        return { id: user.id, email: user.email, name: user.ime }
      },
    }),
    // Dodaj ovdje OAuth providere ako koristiš (Google, Facebook, itd.)
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Ako je user iz CredentialsProvider, id je Int
      if (user) {
        token.id = user.id;
      }
      // Ako je OAuth provider, pronađi ili kreiraj korisnika u bazi po emailu
      if (account && profile && profile.email) {
        let dbUser = await prisma.korisnik.findUnique({ where: { email: profile.email } });
        if (!dbUser) {
          dbUser = await prisma.korisnik.create({
            data: {
              email: profile.email,
              ime: profile.name || profile.email,
              password: '', // prazno jer OAuth
            },
          });
        }
        token.id = dbUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as number; // Int iz baze
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin'
  }
}

export default authOptions
