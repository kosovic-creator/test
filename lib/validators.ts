export function required(value: string){
  return value && value.trim() !== '' ? null : 'Required'
}

export function emailValid(value: string){
  if(!value) return 'Required'
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(value) ? null : 'Invalid email'
}

export function minLength(value: string, len:number){
  return value && value.length >= len ? null : `Minimum ${len} characters`
}
