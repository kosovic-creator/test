"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { signIn, type SignInResponse } from 'next-auth/react'
import FormInput from '@/components/FormInput'
import FormButton from '@/components/FormButton'
import useForm from '@/hooks/useForm'
import { emailValid, minLength, required } from '@/lib/validators'
import { useToast } from '@/components/ToastProvider'

type Values = { ime: string; email: string; password: string }

export default function RegisterPage(){
  const router = useRouter()

  const { addToast } = useToast()

  const form = useForm<Values>({
    initialValues: { ime: '', email: '', password: '' },
    validate(values){
      return {
        ime: required(values.ime),
        email: emailValid(values.email),
        password: minLength(values.password, 6)
      }
    },
    async onSubmit(values) {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, password: values.password, ime: values.ime })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Registration failed')
      // try auto sign-in; only show success toast if sign-in failed
      const signResult = await signIn('credentials', { redirect: false, email: values.email, password: values.password }) as SignInResponse | undefined
      if (signResult?.ok) {
        // successful sign-in -> redirect without showing toast
        router.push('/')
        return
      }
      // sign-in failed (or returned undefined) -> show success toast for registration and redirect to signin
      addToast({ type: 'success', message: 'Registration successful. Please sign in.' })
      router.push('/signin')
    }
  })

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={form.handleSubmit} className="space-y-4">
        <FormInput label="Ime" value={form.values.ime} onChange={e=>form.handleChange('ime', e.target.value)} error={form.errors.ime as string | null} />
        <FormInput label="Email" value={form.values.email} onChange={e=>form.handleChange('email', e.target.value)} error={form.errors.email as string | null} />
        <FormInput label="Password" type="password" value={form.values.password} onChange={e=>form.handleChange('password', e.target.value)} error={form.errors.password as string | null} />
        {form.formError && <div className="text-sm text-red-600">{form.formError}</div>}
        <div>
          <FormButton type="submit" loading={form.submitting}>Register</FormButton>
        </div>
      </form>
    </div>
  )
}
