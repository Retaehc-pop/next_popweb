import React from "react";
import { useSession } from "next-auth/react";
import ProtectedRoutes from "./protectedRoutes";
import { useRouter } from "next/router";
const authRoutes = ['/dashboard','/backend']
const AuthWrapper = ({children}:{children:React.ReactNode}) => {
  const {status} = useSession();
  const router = useRouter();


  if(status==="loading") return null;

  return (
    <>{
      authRoutes.includes(router.pathname)?(
        <ProtectedRoutes>{children}</ProtectedRoutes>
      ):(
        children
      )
    }</>
  )
}

export default AuthWrapper;