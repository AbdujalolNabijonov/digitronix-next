import { useEffect, useState } from "react";
import {
    AccountCircleRounded,
    Chair,
    LaptopOutlined,
    NotificationsOutlined,
    Usb,
    YoutubeSearchedForRounded
} from "@mui/icons-material";
import { Box, Button, Menu, MenuItem, MenuProps, Stack } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { CaretDown, DesktopTower } from "phosphor-react"
import { alpha, styled } from '@mui/material/styles';
import { useRouter } from "next/router";


const Navbar: NextPage = (props: any) => {
    //Initialization
    const device: string = "desktop";
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [lang, setLang] = useState<string | null>("en");
    const drop = Boolean(anchorEl2);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [visitedLink, setVisitedLink] = useState<string>("");
    const [anchorEl3, setAnchorEl3] = useState(null)
    const drop2 = Boolean(anchorEl3)

    const router = useRouter()
    //LifeCircle
    useEffect(() => {
        const scrolledWindow = () => {
            setScrolled(window.scrollY > 100)
        }
        window.addEventListener("scroll", scrolledWindow);
        return () => {
            window.removeEventListener("scroll", scrolledWindow)
        }
    }, [])

    //Customize Style
    const StyledMenu = styled((props: MenuProps) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            top: '109px',
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 160,
            color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
                },
            },
        },
    }));

    //Handlers
    const langClick = (e: any) => {
        setAnchorEl2(e.currentTarget)
    }
    const langClose = (e: any) => {
        setAnchorEl2(null)
    }

    const choiceLang = (event: any) => {
        setLang(event.target.id)
    }

    const openProductList = (event: any) => {
        setAnchorEl3(event.currentTarget)
    }
    const closeProductList = (event: any) => {
        setAnchorEl3(null)
    }
    const goToAddress = (url: string) => {
        router.replace(url);
    }

    if (device === "mobile") {
        return (
            <>
                <Link href={"/"}>
                    Home
                </Link>
                <Link href={"/products"}>
                    Products
                </Link>
                <Link href={"/agents"}>
                    Agents
                </Link>
                <Link href={"/community"}>
                    Community
                </Link>
                <Link href={"/mypage"}>
                    My Page
                </Link>
                <Link href={"/cs"}>
                    CS
                </Link>
            </>
        )
    } else if (device === "desktop") {
        return (
            <>
                <Stack
                    justifyContent={"space-between"}
                    direction={"row"}
                    className={scrolled ? "navbar-container scrolled" : "navbar-container"}

                >
                    <Stack
                        className="container"
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Box className="navbar-title">
                            <Link href={"/"}>
                                DIGITRONIX
                            </Link>
                        </Box>
                        <Stack
                            direction={"row"}
                            gap="40px"
                            className="navbar-body"
                            alignItems={"center"}
                        >
                            <Stack
                                flexDirection={"row"}
                                gap={"20px"}
                                className="navbar-links"
                            >
                                <Link
                                    href={"/"}
                                    className={router.pathname === "/" ? "active" : ""}
                                >
                                    Home
                                </Link>
                                <a
                                    className={router.pathname === "/products" ? "active" : ""}
                                >
                                    <Button
                                        disableRipple
                                        className="product-btn"
                                        onClick={openProductList}
                                    >
                                        Products
                                    </Button>
                                    <Menu
                                        open={drop2}
                                        anchorEl={anchorEl3}
                                        onClose={closeProductList}
                                        className={"list-menu"}
                                    >
                                        <Stack
                                            direction={"row"}
                                            justifyContent={"space-evenly"}
                                            style={{
                                                width: "50vw",
                                                padding: "30px 0",
                                                backgroundColor: "#EEEEEE"
                                            }}>
                                            <MenuItem className="list-item">
                                                <Stack onClick={() => goToAddress("/products?category=LAPTOP")}>
                                                    <LaptopOutlined style={{ fontSize: "50px" }} />
                                                    <div>Laptops</div>
                                                </Stack>
                                            </MenuItem>
                                            <MenuItem className="list-item">
                                                <Stack onClick={() => goToAddress("/products?category=DESKTOP")}>
                                                    <DesktopTower size={"50px"} />
                                                    <div>Desktops</div>
                                                </Stack>
                                            </MenuItem>
                                            <MenuItem className="list-item">
                                                <Stack onClick={() => goToAddress("/products?category=GRAPHICS")}>
                                                    <img src="/img/icons/graphics-card.svg" alt="graphics" style={{ width: "50px" }} />
                                                    <div>Graphics</div>
                                                </Stack>
                                            </MenuItem>
                                            <MenuItem className="list-item">
                                                <Stack onClick={() => goToAddress("/products?category=PERIPHERAL")}>
                                                    <Usb style={{ fontSize: "50px" }} />
                                                    <div>Peripherals</div>
                                                </Stack>
                                            </MenuItem>
                                            <MenuItem className="list-item">
                                                <Stack alignItems={"center"} onClick={() => goToAddress("/products?category=CHAIR")}>
                                                    <Chair style={{ fontSize: "50px" }} />
                                                    <div>Chair</div>
                                                </Stack>
                                            </MenuItem>
                                        </Stack>
                                    </Menu>
                                </a>

                                <Link
                                    href={"/agents"}
                                    className={router.pathname === "/agents" ? "active" : ""}
                                >
                                    Agents
                                </Link>
                                <Link
                                    href={"/community"}
                                    className={router.pathname === "/community" ? "active" : ""}
                                >
                                    Community
                                </Link>
                                <Link
                                    href={"/mypage"}
                                    className={router.pathname === "/mypage" ? "active" : ""}
                                >
                                    My Page
                                </Link>
                                <Link
                                    href={"/cs"}
                                    className={router.pathname === "/cs" ? "active" : ""}
                                >
                                    CS
                                </Link>
                            </Stack>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                gap="10px"
                                className="navbar-features"
                            >
                                <div className="register-box">
                                    <Box className={"register-btn"}>
                                        <AccountCircleRounded style={{ fontSize: "45px" }} />
                                        <p>Login / Register</p>
                                    </Box>
                                    
                                </div>
                                <Button>
                                    <YoutubeSearchedForRounded />
                                </Button>
                                <Button className="notify-ring">
                                    <NotificationsOutlined style={{ fontSize: "25px" }} />
                                    <div className="badge">7</div>
                                </Button>
                                <div className="lang-box">
                                    <Button
                                        disableRipple
                                        className="btn-lang"
                                        onClick={langClick}
                                        endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
                                    >

                                        <img
                                            className="img-flag"
                                            src="/img/flag/langen.png"
                                            alt="this is chosen flag"
                                        />
                                    </Button>
                                    <StyledMenu
                                        anchorEl={anchorEl2}
                                        open={drop}
                                        onClose={langClose}
                                        sx={{ position: 'absolute' }}
                                    >
                                        <MenuItem
                                            disableRipple
                                            onClick={choiceLang}
                                            id="en"
                                        >
                                            <img
                                                className="img-flag"
                                                src="/img/flag/langen.png"
                                                style={{ width: "24px", height: "17px", borderRadius: "2px", marginRight: "8px" }}
                                                alt=""
                                                id="en"
                                                onClick={choiceLang}
                                            />
                                            English
                                        </MenuItem>
                                        <MenuItem
                                            disableRipple
                                            onClick={choiceLang}
                                            id="kr"
                                        >
                                            <img
                                                className="img-flag"
                                                src="/img/flag/langkr.png"
                                                style={{ width: "24px", height: "17px", borderRadius: "2px", marginRight: "8px" }}
                                                alt=""
                                                id="kr"
                                                onClick={choiceLang}
                                            />
                                            Korean
                                        </MenuItem>
                                        <MenuItem
                                            disableRipple
                                            onClick={choiceLang}
                                            id="ru"
                                        >
                                            <img
                                                className="img-flag"
                                                src="/img/flag/langru.png"
                                                style={{ width: "24px", height: "17px", borderRadius: "2px", marginRight: "8px" }}
                                                alt=""
                                                id="ru"
                                                onClick={choiceLang}
                                            />
                                            Russian
                                        </MenuItem>
                                    </StyledMenu>
                                </div>

                            </Stack>
                        </Stack>
                    </Stack>
                </Stack >
            </>
        )
    }
}
export default Navbar