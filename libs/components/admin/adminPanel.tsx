import { ArrowDropDown, DevicesOutlined, ForumOutlined, HomeWork, HomeWorkOutlined, PeopleOutline, SupportAgentOutlined } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from "@mui/material"
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const AdminPanel = () => {
    //Initializations
    const pathname = useRouter().pathname;

    return (
        <>
            <Stack className="admin-panel">
                <Stack className="brand-title">
                    <div className="title">
                        DIGITRONIX
                    </div>
                    <Stack className="user">
                        <img src="/img/profile/defaultUser.svg" alt="user" />
                        <div className="name">Shawn</div>
                    </Stack>
                </Stack>
                <Stack className="btn-list" gap={"10px"}>
                    <Link href="/_admin/companies" className={pathname.includes("companies") ? 'on' : ''}>
                        <HomeWorkOutlined fontSize="medium" />
                        <div>Companies</div>
                    </Link>
                    <Link href="/_admin/users" className={pathname.includes("users") ? 'on' : ''}>
                        <PeopleOutline />
                        <div>Users</div>
                    </Link>
                    <Link href="/_admin/products" className={pathname.includes("companies") ? 'on' : ''}>
                        <DevicesOutlined />
                        <div>Products</div>
                    </Link>
                    <Link href="/_admin/community" className={pathname.includes("companies") ? 'on' : ''}>
                        <ForumOutlined />
                        <div>Community</div>
                    </Link>
                    <Accordion className="accordion-cs">
                        <AccordionSummary
                            expandIcon={<ArrowDropDown />}

                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Stack className="title" direction={"row"} gap={"10px"}>
                                <SupportAgentOutlined />
                                <div>CS</div>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Stack>
            </Stack>
        </>
    )
}
export default AdminPanel