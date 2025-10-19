/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth'
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
        return { id: user.id.toString(), email: user.email, name: user.ime }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id; // doda id u token
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string; // prosledi id ka klijentu
      }
      return session;
    },
    },
  pages: {
    signIn: '/signin'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
