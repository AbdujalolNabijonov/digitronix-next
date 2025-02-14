import { NextPage } from "next";
import Navbar from "../navbar/navbarFull";
import Head from "next/head";
import { Box, Stack } from "@mui/material";
import Footer from "../footer/footer";
import ProductBanner from "../products/productBanner";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import CommunityChat from "../others/communityChat";

const LayoutProduct = (Component: NextPage) => {
    return (props: any) => {
        //Initialization
        const device: string = "desktop"

        if (device === "mobile") {
            return (
                <>
                    <Head>
                        <title>Digitronix</title>
                        <meta content="Digitronix" name="title" />
                    </Head>
                    <Stack flexDirection={"column"} className="mobile-wrapper">
                        <Navbar {...props} />
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
        } else if (device === "desktop") {
            return (
                <>
                    <Head>
                        <title>Digitronix</title>
                        <meta content="Digitronix" name="title" />
                    </Head>
                    <Stack className="pc-wrapper">
                        <Navbar {...props} />
                        <ProductBanner />
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

export default LayoutProduct