"use server";
import { prisma } from "./prisma";


export async function addUser(address: string, email?: string) {

    const normalizedAddress = address ? address.trim().toLowerCase() : undefined;
    if (!normalizedAddress && !email) {
        throw new Error("Must provide wallet address or email");
    }

    const selectSafe = {
        id: true,
        email: true,
        walletAddress: true,
        role: true,
        name: true,
        image: true,
        subscriptionType: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
        isActive: true,
    } as const;

    // Prefer wallet path when available (idempotent via upsert)
    if (normalizedAddress) {
        try {
            const user = await prisma.user.upsert({
                where: { walletAddress: normalizedAddress },
                update: { lastLoginAt: new Date() },
                create: {
                    walletAddress: normalizedAddress,
                    email: email ?? null,
                    lastLoginAt: new Date(),
                },
                select: selectSafe,
            });
            // Optionally link email if provided and not set yet
            if (email && !user.email) {
                return await prisma.user.update({
                    where: { id: user.id },
                    data: { email },
                    select: selectSafe,
                });
            }
            return user;
        } catch (e) {
            // Handle race: if unique constraint hit, re-fetch
            const existing = await prisma.user.findUnique({
                where: { walletAddress: normalizedAddress },
                select: selectSafe,
            });
            if (existing) return existing;
            throw e;
        }
    }

    // Email-only path (idempotent)
    return prisma.user.upsert({
        where: { email: email as string },
        update: { lastLoginAt: new Date() },
        create: { email: email as string },
        select: selectSafe,
    });
}