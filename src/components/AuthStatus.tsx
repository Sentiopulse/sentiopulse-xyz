"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">
          Signed in as{" "}
          <span className="font-medium">{session.user?.email}</span>
        </div>
        <Button variant="outline" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/auth/signin">
        <Button variant="outline">Sign in</Button>
      </Link>
      <Link href="/auth/signup">
        <Button>Sign up</Button>
      </Link>
    </div>
  );
}
