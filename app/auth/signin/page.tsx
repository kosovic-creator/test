"use client"
import React, { Suspense } from 'react'
import { signIn, type SignInResponse } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import FormInput from '@/components/FormInput'
import FormButton from '@/components/FormButton'
import useForm from '@/hooks/useForm'
import { emailValid, required } from '@/lib/validators'

function SignInPage() {
  const router = useRouter()
  const params = useSearchParams()
  const callbackUrl = params?.get('callbackUrl') || '/'

  const form = useForm<{ email: string; password: string }>({
    initialValues: { email: '', password: '' },
    validate(values){
      return { email: emailValid(values.email), password: required(values.password) }
    },
    async onSubmit(values){
        const res = await signIn('credentials', { redirect: false, email: values.email, password: values.password, callbackUrl }) as SignInResponse | undefined
        if (res?.error) throw new Error(res.error)
        if (res?.ok) router.push(callbackUrl)
    }
  })

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Sign in</h2>
      <form onSubmit={form.handleSubmit} className="space-y-4">
        <FormInput label="Email" value={form.values.email} onChange={e=>form.handleChange('email', e.target.value)} error={form.errors.email as string | null} />
        <FormInput label="Password" type="password" value={form.values.password} onChange={e=>form.handleChange('password', e.target.value)} error={form.errors.password as string | null} />
        {form.formError && <div className="text-sm text-red-600">{form.formError}</div>}
        <div className="flex items-center justify-between">
          <FormButton type="submit" loading={form.submitting}>Sign in</FormButton>
          <div>
            <a href="/auth/change-password" className="text-sm text-sky-600 hover:underline mr-4">Change password</a>
            <Link href="/auth/register" className="text-sm text-sky-600 hover:underline">Register</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default function SignInPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInPage />
    </Suspense>
  );
}