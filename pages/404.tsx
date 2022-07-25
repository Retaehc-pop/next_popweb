import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";


const Page: NextPage = () => {
  return (
  <>
    <Head>
      <title>404</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main style={{
      position:"relative",
      display:"flex",
      height:"100vh",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center"
      }}>
      <h1 style={{fontSize:"15rem"}}>404</h1>
      <h1>Oops, we took you to the wrong path</h1>
      <Link href="/" passHref>
        <a style={{
          padding:"1rem",
          backgroundColor:"var(--color-primary)",
          borderRadius:"0.5rem",
          textDecoration:"none",
          color:"var(--color-background)",
          fontSize:"2rem",
          fontWeight:"bold",
          textAlign:"center",
          margin:"1rem"
        }}>Return Home</a>
      </Link>
    </main>
  </>
  );
}

export default Page;