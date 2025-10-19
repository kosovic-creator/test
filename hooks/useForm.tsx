/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from 'react'
import { useToast } from '@/components/ToastProvider'

type Validator<T> = (values: T) => Partial<Record<keyof T, string | null>>

export default function useForm<T extends Record<string, any>>(options: {
  initialValues: T
  validate?: Validator<T>
  onSubmit: (values: T) => Promise<any> | any
  toastOnError?: boolean
  toastOnSuccess?: string | boolean
}){
  const { initialValues, validate, onSubmit, toastOnError = true, toastOnSuccess = false } = options
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string | null>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const { addToast } = useToast()

  function handleChange<K extends keyof T>(name: K, value: T[K]){
    setValues(prev => ({ ...prev, [name]: value }))
  }

  function handleBlur<K extends keyof T>(name: K){
    setTouched(prev => ({ ...prev, [name]: true }))
    if (validate) {
      const v = validate(values)
      setErrors(v)
    }
  }

  async function handleSubmit(e?: React.FormEvent){
    e?.preventDefault()
    setFormError(null)
    if (validate) {
      const v = validate(values)
      setErrors(v)
      const hasError = Object.values(v).some(x => x)
      if (hasError) return
    }
    try {
      setSubmitting(true)
      const res = await onSubmit(values)
      if (toastOnSuccess) {
        const message = typeof toastOnSuccess === 'string' ? toastOnSuccess : 'Success'
        addToast({ type: 'success', message })
      }
      return res
    } catch (err: any) {
      const msg = err?.message || String(err)
      setFormError(msg)
      if (toastOnError) addToast({ type: 'error', message: msg })
    } finally {
      setSubmitting(false)
    }
  }

  function reset() {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setFormError(null)
  }

  return {
    values,
    errors,
    touched,
    submitting,
    formError,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
    setErrors
  }
}
