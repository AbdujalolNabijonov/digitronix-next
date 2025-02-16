import { Box, Button, Stack, TextField } from "@mui/material"
import { useEffect, useRef } from "react"
import { NextPage } from "next"
import { Email, Facebook, Instagram, LinkedIn, LockClock, MyLocation, Phone, Twitter } from "@mui/icons-material"
import Link from "next/link"


const Footer: NextPage = (props: any) => {
    //Initializations
    const refs: any = useRef([])
    //
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Stack>
            <Stack className="container">
                <Stack className="footer-main">
                    <Box className="footer-col">
                        <div className="brand-name">DIGITRONIX</div>
                        <Stack direction={"row"} gap={"70px"}>
                            <ul>
                                <li><a href="/">HOME</a></li>
                                <li><a href="/">SELLERS</a></li>
                                <li><a href="/products">PRODUCTS</a></li>
                                <li><a href="/community">COMMUNITY</a></li>
                                <li><a href="/mypage">MY PAGE</a></li>
                            </ul>
                            <ul>
                                <li><a href="/cs">CS</a></li>
                                <li><a href="/myPage?category=MY_SETTING">MY SETTINGS</a></li>
                                <li><a
                                    className="text-light"
                                    style={{ cursor: "pointer" }}>WISHLIST</a></li>
                                <li><a
                                    className="text-light"
                                    style={{ cursor: "pointer" }}
                                >MY POSTS</a></li>
                            </ul>
                        </Stack>
                        <Stack
                            className="social-links"
                            direction={"row"}
                            gap={"30px"}
                        >
                            <Link href="#">
                                <Button>
                                    <Facebook />
                                </Button>
                            </Link>
                            <Link href="#">
                                <Button>
                                    <Twitter />
                                </Button>
                            </Link>
                            <Link href="#">
                                <Button>
                                    <Instagram />
                                </Button>
                            </Link>
                            <Link href="#">
                                <Button>
                                    <LinkedIn />
                                </Button>
                            </Link>
                        </Stack>
                    </Box>
                    <Box className="email-col">
                        <div className="title">If you have questions. Feel free contact with us.</div>
                        <Stack direction={"row"} gap={"30px"}>
                            <input type="text" placeholder="Enter an email" />
                            <Button>Subscribe</Button>
                        </Stack>
                        <Stack className="contact-info" gap={2}>
                            <Stack gap={1} direction={"row"}>
                                <Phone />
                                <span >+8210 3201 1222</span>
                            </Stack>
                            <Stack gap={1} direction={"row"}>
                                <Email />
                                <span>abdujalolnabijonov20@gmail.com</span>
                            </Stack>
                            <Stack gap={1} direction={"row"}>
                                <MyLocation />
                                <span>South Korea, Yeosu-si</span>
                            </Stack>
                            <Stack gap={1} direction={"row"}>
                                <LockClock />
                                <span>Mon~Fri 24 hours</span>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
                <hr />
                <Stack className="privacies">
                    <Stack className="privacy-items">
                        <div>Website Terms</div>
                        <div>|</div>
                        <div>Privacy Policy</div>
                        <div>|</div>
                        <div>Accessibility Statement</div>
                        <div>|</div>
                        <div>Marketing</div>
                        <div>|</div>
                        <div>Do Not Sell</div>
                    </Stack>
                    <Box>&copy;2024 Digitronix. All Rights Reserved.</Box>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Footer