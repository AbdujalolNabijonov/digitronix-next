import { NextPage } from "next";
import Navbar from "../navbar/navbarFull";
import Head from "next/head";
import { Stack } from "@mui/material";
import Footer from "../footer/footer";
import ProductBanner from "../products/productBanner";

const LayoutProduct = (Component: NextPage) => {
    return (props: any) => {
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
                        <ProductBanner/>
                        <Stack className="container">
                            <Component {...props} />
                        </Stack>
                    </Stack>
                    <Footer />
                </>
            )
        }
    }
}

export default LayoutProduct