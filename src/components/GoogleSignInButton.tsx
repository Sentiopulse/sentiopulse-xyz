"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function GoogleSignInButton() {
  return (
    <button
      type="button"
      className="google-btn flex-center"
  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    >
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
        alt="Google"
        width={23}
        height={23}
        className="google-logo"
      />
      Sign in with Google
    </button>
  );
}
