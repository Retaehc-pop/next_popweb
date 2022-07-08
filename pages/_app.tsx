import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import AuthWrapper from "../components/authWrapper";
import NextNProgress from "nextjs-progressbar"

config.autoAddCss = false;

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthWrapper>
        <NextNProgress color="#30365a"/>
        <Component {...pageProps} />
      </AuthWrapper>
    </SessionProvider>
  );
}

export default MyApp;