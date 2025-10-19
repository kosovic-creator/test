"use client"
import React from 'react'
import FormInput from '@/components/FormInput'
import FormButton from '@/components/FormButton'
import useForm from '@/hooks/useForm'
import { emailValid, minLength, required } from '@/lib/validators'

export default function ChangePasswordPage(){
  const form = useForm<{ email: string; currentPassword: string; newPassword: string }>({
    initialValues: { email: '', currentPassword: '', newPassword: '' },
    validate(values){
      return {
        email: emailValid(values.email),
        currentPassword: required(values.currentPassword),
        newPassword: minLength(values.newPassword, 6)
      }
    },
    async onSubmit(values){
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, currentPassword: values.currentPassword, newPassword: values.newPassword })
      })
      const data = await res.json()
      if(!res.ok) throw new Error(data?.error || 'Error')
      // show success via form.formError (or we could add form.success)
      // using form.reset() to clear fields
      form.reset()
    }
  })

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Change password</h2>
      <form onSubmit={form.handleSubmit} className="space-y-4">
        <FormInput label="Email" value={form.values.email} onChange={e=>form.handleChange('email', e.target.value)} error={form.errors.email as string | null} />
        <FormInput label="Current password" type="password" value={form.values.currentPassword} onChange={e=>form.handleChange('currentPassword', e.target.value)} error={form.errors.currentPassword as string | null} />
        <FormInput label="New password" type="password" value={form.values.newPassword} onChange={e=>form.handleChange('newPassword', e.target.value)} error={form.errors.newPassword as string | null} />
        {form.formError && <div className="text-sm text-red-600">{form.formError}</div>}
        <div>
          <FormButton type="submit" loading={form.submitting}>Change password</FormButton>
        </div>
      </form>
    </div>
  )
}
