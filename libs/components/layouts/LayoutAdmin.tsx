import { Stack } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import NavbarAdmin from "../navbar/navbarAdmin";

const LayoutAdmin = (Component: any) => {
    return (props: any) => {
        const device: string = "desktop"
        if (device === "mobile") {
            return (
                <>
                    <Head>Digitronix</Head>
                    <Stack className="mobile-wrapper">

                    </Stack>
                </>
            )
        } else if (device === "desktop") {
            return (
                <>
                    <Head>Digitronix</Head>
                    <Stack className="pc-wrapper">
                        <NavbarAdmin />
                        <div className="main">
                            <Component />
                        </div>
                    </Stack>
                </>
            )
        }
    }
}

export default LayoutAdmin