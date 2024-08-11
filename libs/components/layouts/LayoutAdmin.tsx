import { Box, Stack } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import NavbarAdmin from "../navbar/navbarAdmin";
import AdminPanel from "../admin/adminPanel";

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
                        <Stack direction={"row"}>
                            <AdminPanel />
                            <Stack id="main">
                                <NavbarAdmin />
                                <Component />
                            </Stack>
                        </Stack>
                    </Stack>
                </>
            )
        }
    }
}

export default LayoutAdmin