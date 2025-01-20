import useDeviceDetect from "@/libs/hooks/useDeviceDetector";
import { Box, Stack } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import Navbar from "../navbar/navbarFull";
import Footer from "../footer/footer";

const LayoutFull = (Component: NextPage) => {
    return (props: any) => {
        const device = useDeviceDetect();

        if (device === "mobile") {
            return (
                <>
                    <Head>
                        <title>Digitronix</title>
                    </Head>
                    <Stack className="mobile-wrapper">
                        <Component {...props} />
                    </Stack>
                </>
            )
        } else if (device === "desktop") {
            return (
                <>
                    <Head>
                        <title>Digitronix</title>
                    </Head>
                    <Stack className="pc-wrapper">
                        <Navbar />
                        <Box className="main">
                            <Component {...props} />
                        </Box>
                        <Box className="footer">
                            <Footer />
                        </Box>
                    </Stack>
                </>
            )
        }
    }
}

export default LayoutFull