import { Stack } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../navbar/navbarFull";
import Footer from "../footer/footer";

const LayoutBasic = (Component: NextPage) => {
    return (props: any) => {
        const device: string = "desktop";

        if (device === "mobile") {
            return (
                <>
                    <Head>
                        <title>Digitronix</title>
                    </Head>
                    <Stack className="mobile-wrapper">
                        <Navbar {...props} />
                        <Component {...props} />
                        <Footer />
                    </Stack>
                </>
            )
        } else if (device === "desktop") {
            return (
                <>
                    <Head>
                        <title>Digitronix</title>
                        <meta content="Digitronix" name="title" />
                    </Head>
                    <Stack className="pc-wrapper">
                        <Navbar {...props} />
                        <Component {...props} />
                    </Stack>
                    <Footer />
                </>
            )
        }
    }
}

export default LayoutBasic