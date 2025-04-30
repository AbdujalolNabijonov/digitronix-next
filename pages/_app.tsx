import { light } from "@/scss/MaterialTheme";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/apollo/client";
import ContextProvider from "@/libs/components/context/ContextProvider";
import { appWithTranslation } from 'next-i18next';
import {GoogleOAuthProvider} from "@react-oauth/google"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import "../scss/pc/main.scss"
import "../scss/mobile/main.scss"
import "../scss/app.scss";
import { GOOGLE_CLIENT_ID } from "@/libs/config";


function App({ Component, pageProps }: AppProps) {
  //@ts-ignore
  const [theme, setTheme] = useState(createTheme(light));
  const client = useApollo(pageProps.initialApolloState);
  const clinetId = GOOGLE_CLIENT_ID as string;

  return (
    <>
    <GoogleOAuthProvider clientId={clinetId}>
    <ApolloProvider client={client}>
        <ContextProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ContextProvider>
      </ApolloProvider>
    </GoogleOAuthProvider>
    </>
  );
}

export default appWithTranslation(App)
