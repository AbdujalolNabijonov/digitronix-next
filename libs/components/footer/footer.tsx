import { Stack } from "@mui/material";
import { NextPage } from "next";

const Footer: NextPage = () => {
    return (
        <>
            <Stack className="footer">
                <Stack id="footer-container">
                    <h1>This is a footer section</h1>
                </Stack>
            </Stack>
        </>
    )
}

export default Footer