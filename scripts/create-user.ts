import prisma from '../lib/prisma'
import { hash } from 'bcryptjs'

async function main(){
  const email = process.argv[2]
  const password = process.argv[3]
  const ime = process.argv[4] || 'Test User'
  if(!email || !password){
    console.error('Usage: ts-node scripts/create-user.ts email password [ime]')
    process.exit(1)
  }
  const hashed = await hash(password, 10)
  const u = await prisma.korisnik.create({ data: { email, password: hashed, ime } })
  console.log('Created user', u)
}

main().catch(e=>{ console.error(e); process.exit(1) }).finally(()=>prisma.$disconnect())
