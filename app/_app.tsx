import "../styles/global.css";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
// import { Toaster } from 'react-hot-toast';
import client from "../apollo-client";
// import { ThemeProvider } from 'next-themes';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Script from "next/script";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => (
  <ApolloProvider client={client}>
    <SessionProvider session={session}>
      {/* <Toaster />
      <ThemeProvider attribute="class"> */}
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}

      {/* <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-K50BW4JH06`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-K50BW4JH06');
          `}
      </Script> */}

      <Component {...pageProps} />
      {/* </LocalizationProvider> */}
      {/* </ThemeProvider> */}
    </SessionProvider>
  </ApolloProvider>
);

export default MyApp;
