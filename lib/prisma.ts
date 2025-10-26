// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
  const prisma = new PrismaClient();
  return prisma;
};

async function createPrismaClientWithRetry(retries = 5, delay = 2000): Promise<PrismaClient> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const prisma = createPrismaClient();
      await prisma.$connect();
      console.log(`✅ Prisma connected on attempt ${attempt}`);
      return prisma;
    } catch (e) {
      console.error(`❌ Prisma connection failed (attempt ${attempt}):`, e);
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, delay));
      } else {
        console.error("❌ All Prisma connection retries failed");
        throw e;
      }
    }
  }
  throw new Error("Unable to establish Prisma connection");
}

export const prisma = globalForPrisma.prisma || (await createPrismaClientWithRetry());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;