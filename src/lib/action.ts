"use server";
import { prisma } from "./prisma";


export async function addUser(address: string, email?: string) {

    if (!address && !email) {
        throw new Error("Must provide wallet address or email");
    }

    let user;
    if(address){
        user = await prisma.user.findUnique({
            where: {
                walletAddress: address
            }
        })
    };

    if(!user && email) {
        user = await prisma.user.findUnique({
            where:{
                email: email
            }
        })
    }

    if (!user) {
        user = await prisma.user.create({
            data: {
                walletAddress: address,
                email:email
            }
        })
    }
    return user;
}