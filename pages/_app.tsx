import { light } from "@/scss/MaterialTheme";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/apollo/client";
import ContextProvider from "@/libs/components/context/ContextProvider";
import { appWithTranslation } from 'next-i18next';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import "../scss/pc/main.scss"
import "../scss/mobile/main.scss"
import "../scss/app.scss";

function App({ Component, pageProps }: AppProps) {
  //@ts-ignore
  const [theme, setTheme] = useState(createTheme(light));
  const client = useApollo(pageProps.initialApolloState);

  return (
    <>
      <ApolloProvider client={client}>
        <ContextProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ContextProvider>
      </ApolloProvider>
    </>
  );
}

export default appWithTranslation(App)
