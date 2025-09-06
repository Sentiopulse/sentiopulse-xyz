"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="full-vh flex-center">
      <div className="login-card">
        <h1 className="login-title">Welcome{session?.user?.name ? `, ${session.user.name}` : ""}!</h1>
        <p className="login-desc">You are now signed in to SentioPulse.</p>
      </div>
    </div>
  );
}
