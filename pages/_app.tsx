import { light } from "@/scss/MaterialTheme";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import type  {AppProps}  from "next/app";
import { useState } from "react";
import "../scss/pc/main.scss"
import "../scss/app.scss";
import "swiper/css"
import "swiper/css/pagination";
import "swiper/swiper-bundle.css"
import  ApolloProvider  from "@apollo/client";

export default function App({ Component, pageProps }: AppProps) {
  //@ts-ignore
  const [theme, setTheme] = useState(createTheme(light));
  // const client = useApollo(props)
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
