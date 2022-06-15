import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status,router]);
  if (status === "loading") return null;
  if (status === "unauthenticated") return null;

  return <>{children}</>;
};

export default ProtectedRoutes;
