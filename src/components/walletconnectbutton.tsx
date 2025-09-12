"use client";
import { addUser } from "@/lib/action";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function WalletConnectButton() {

    const {address, isConnected} = useAccount();

    useEffect(()=>{
        if(isConnected && address){
            addUser(address)
            .then((user)=> 
                console.log("User added/login",user))
            .catch((err)=>{
                console.error("Error adding user", err);
            })
        }
    },
    [address, isConnected]);

  return <ConnectButton />;
}
