"use client";

// import { useSession } from "next-auth/react";

export default function DashboardPage() {
  // Temporarily disable authentication until new auth system is implemented
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") router.push("/login");
  // }, [status, router]);

  // if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="full-vh flex-center">
      <div className="login-card">
        <h1 className="login-title">Welcome!</h1>
        <p className="login-desc">
          Dashboard is temporarily available without authentication.
        </p>
      </div>
    </div>
  );
}
