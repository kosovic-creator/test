import { PrismaClient } from '@prisma/client';
console.log('Pokrećem seed...');

const prisma = new PrismaClient();



async function main() {




await prisma.korisnik.create({
    data: {
      id: 1,
      email: 'ana@gmail.com',
      ime: 'Ana',
      password: 'ana123',
    },

  });
await prisma.korisnik.create({
    data: {
      id: 2,
      email: 'drasko.kosovic@icloud.com',
      ime: 'Kosovic',
      password: 'kosovic123',
    },

  });
  await prisma.korisnik.create({
    data: {
      id: 3,
      email: 'drasko.kosovic@gmail.com',
      ime: 'Draško',
      password: 'kosovic123',
    },

  });

  await prisma.artikal.create({
    data: {
      naziv: 'Polo Majica',
      opis: 'Plava polo majica veličine M',
      kolicina: 10,
      cena: 100.0,
      korisnikId: 1,
    },
  });
  await prisma.artikal.create({
    data: {
      naziv: 'Farmerke',
      opis: 'Plave farmerke veličine 32',
      kolicina: 5,
      cena: 150.0,
      korisnikId: 2,
    },
  });
await prisma.artikal.create({
    data: {
      naziv: 'Patike',
      opis: 'Bele patike veličine 42',
      kolicina: 8,
      cena: 200.0,
      korisnikId: 3,
    },
  });

  await prisma.account.create({
    data: {
      email: 'ana@gmail.com',
      balance: 1000.0,
    },
  });
  await prisma.account.create({
    data: {
      email: 'drasko.kosovic@gmail.com',
      balance: 2000.0,
    },
  });
  console.log('Seed podaci su uspješno dodani.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
