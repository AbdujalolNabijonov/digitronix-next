import { ArrowDropDown, Campaign, DevicesOutlined, ForumOutlined, HomeWork, HomeWorkOutlined, PeopleOutline, Quiz, SupportAgentOutlined } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, MenuItem, Stack, Typography } from "@mui/material"
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
                    <Link href="/_admin/users" className={pathname.includes("users") ? 'on' : ''}>
                        <PeopleOutline />
                        <div>Users</div>
                    </Link>
                    <Link href="/_admin/products" className={pathname.includes("products") ? 'on' : ''}>
                        <DevicesOutlined />
                        <div>Products</div>
                    </Link>
                    <Link href="/_admin/society" className={pathname.includes("society") ? 'on' : ''}>
                        <ForumOutlined />
                        <div>Society</div>
                    </Link>
                    <Accordion className={"accordion-cs"} defaultExpanded={pathname.includes("cs")}>
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
                            <MenuItem sx={{ display: "block" }}>
                                <Link href="/_admin/cs/faq" className={pathname.includes("faq") ? 'on' : ''}>
                                    <Quiz />
                                    <div>FAQ</div>
                                </Link>
                            </MenuItem>
                            <MenuItem sx={{ display: "block" }}>
                                <Link href="/_admin/cs/notice" className={pathname.includes("notice") ? 'on' : ''}>
                                    <Campaign />
                                    <div>Notice</div>
                                </Link>
                            </MenuItem>
                        </AccordionDetails>
                    </Accordion>
                </Stack>
            </Stack>
        </>
    )
}
export default AdminPanel