import { PrismaClient } from "@prisma/client";


const enableQueryLogs =
  process.env.NODE_ENV !== "production" || process.env.ENABLE_QUERY_LOGS === "true";

const baseLogs: Array<'error' | 'warn'> = ['error', 'warn'];
const logs: string[] = enableQueryLogs ? ['query', ...baseLogs] : baseLogs;

type GlobalForPrisma = { prisma?: PrismaClient } & typeof globalThis;
const globalForPrisma = globalThis as GlobalForPrisma;

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? new PrismaClient({ log: logs as Array<'query' | 'error' | 'warn'> });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
