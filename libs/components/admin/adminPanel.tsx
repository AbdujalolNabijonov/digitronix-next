import { ArrowDropDown, Campaign, DevicesOutlined, ForumOutlined, HomeWork, HomeWorkOutlined, PeopleOutline, Quiz, SupportAgentOutlined } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, MenuItem, Stack, Typography } from "@mui/material"
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {useReactiveVar} from "@apollo/client"
import { userVar } from "@/apollo/store";
import { serverApi } from "@/libs/config";

const AdminPanel = () => {
    //Initializations
    const pathname = useRouter().pathname;
    const user = useReactiveVar(userVar)

    return (
        <>
            <Stack className="admin-panel">
                <Stack className="brand-title">
                    <a className="title" href="/">
                        DIGITRONIX
                    </a>
                    <Stack className="user">
                        <Avatar 
                        src={user.memberImage?`${serverApi}/${user.memberImage}`:"/img/profile/noUser.jpg"} 
                        alt="image"
                        sx={{width:"50px", height:"50px"}}
                        />
                        <Stack className="user-info">
                            <Box>{user.memberFullName||user.memberNick}</Box>
                            <Box>{user.memberPhone}</Box>
                        </Stack>
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