import { Stack } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../navbar/navbarFull";
import Footer from "../footer/footer";
import Banner from "../general/basicBanner";

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
                        <Banner />
                        <div className="main">
                            <Component {...props} />
                        </div>
                        <div className="footer">
                            <Footer />
                        </div>
                    </Stack>
                </>
            )
        }
    }
}

export default LayoutBasic