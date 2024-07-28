import { Stack } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";

const LayoutHome = (Component: NextPage) => {
    return (props: any) => {
        const device: string = "desktop";
        if (device === "mobile") {
            return (
                <>
                    <Head>
                        <title>Digitronix</title>
                        <meta content="Digitronix" name="titleX" />
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
                        <meta content="Digitronix" name={"title"} />
                    </Head>
                    <Stack className="pc-wrapper">
                        This is navbar layout
                        <Component {...props} />
                    </Stack>
                </>
            )
        }
    }
}

export default LayoutHome