import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const _client = globalThis.prisma ?? new PrismaClient({
  log: ["query", "error", "warn"],
});

export const prisma = _client;

if (process.env.NODE_ENV !== "production") globalThis.prisma = _client;
