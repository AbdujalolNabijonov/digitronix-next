import LayoutBasic from "@/libs/components/layouts/LayoutBasic";
import TabContext from "@mui/lab/TabContext";
import { Box, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { NextPage } from "next";
import { useDebugValue, useState } from "react";
import TabPanel from "@mui/lab/TabPanel";
import Notice from "@/libs/components/cs/Notice";
import Faq from "@/libs/components/cs/Faq";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useDeviceDetect from "@/libs/hooks/useDeviceDetector";
export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});
const Cs: NextPage = (props: any) => {
    const [value, setValue] = useState("1")
    const device = useDeviceDetect()
    const handleChangevalue = (e: any, value: string) => {
        setValue(value)
    }
    if (device === "mobile") {
        return (
            <h1>Mobile version is developing...</h1>
        )
    } else {
        return (
            <Stack className="cs-page">
                <Stack className="container">
                    <Stack className="cs-head">
                        <Box className="title">CS Center</Box>
                        <Box className="subtitle">Your question is value and never been ignored</Box>
                    </Stack>
                    <Stack className="cs-body">
                        <TabContext value={value}>
                            <Stack className="tab-list">
                                <Button onClick={(e: any) => handleChangevalue(e, "1")} className={value === "1" ? "on" : "off"}>
                                    Notice
                                </Button>
                                <Button onClick={(e: any) => handleChangevalue(e, "2")} className={value === "2" ? "on" : "off"}>
                                    FAQ
                                </Button>
                            </Stack>
                            <TabPanel value={"1"}>
                                <Notice />
                            </TabPanel>
                            <TabPanel value={"2"}>
                                <Faq />
                            </TabPanel>
                        </TabContext>
                    </Stack>
                </Stack>
            </Stack>
        )
    }
}

export default LayoutBasic(Cs)