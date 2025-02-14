import { Box, Stack } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../navbar/navbarFull";
import Footer from "../footer/footer";
import HomeBanner from "../three/homeBanner";
import CommunityChat from "../others/communityChat";

const LayoutHome = (Component: NextPage) => {
    return (props: any) => {
        const device: string = "desktop";
        if (device === "mobile") {
            return (
                <>
                    <Head>
                        <title>Digitronix</title>
                        <meta content="Digitronix" name="title" />
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
                        <meta content="Digitronix" name={"title"} />
                    </Head>
                    <Stack className="pc-wrapper">
                        <Navbar {...props} />
                        <HomeBanner />
                        <Box className="main">
                            <Component {...props} />
                        </Box>
                        <CommunityChat/>
                        <Box className="footer">
                            <Footer />
                        </Box>
                    </Stack>
                </>
            )
        }
    }
}

export default LayoutHome