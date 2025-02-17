import { Box, Stack } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../navbar/navbarFull";
import Footer from "../footer/footer";
import Banner from "../general/basicBanner";
import CommunityChat from "../others/communityChat";
import useDeviceDetect from "@/libs/hooks/useDeviceDetector";

const LayoutBasic = (Component: NextPage) => {
    return (props: any) => {
        const device: string = useDeviceDetect();

        if (device === "mobile") {
            return (
                <>
                    <Head>
                        <title>Digitronix</title>
                    </Head>
                    <Stack className="mobile-wrapper">
                        <Navbar {...props} />
                        <Stack className="main">
                            <Component {...props} />
                            <CommunityChat />
                        </Stack>
                        <Box className="footer">
                            <Footer />
                        </Box>
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
                        <Box className="main">
                            <Component {...props} />
                        </Box>
                        <CommunityChat />
                        <Box className="footer">
                            <Footer />
                        </Box>
                    </Stack>
                </>
            )
        }
    }
}

export default LayoutBasic