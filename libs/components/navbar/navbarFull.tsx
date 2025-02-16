import { useCallback, useEffect, useState } from "react";
import {
    AccountCircleRounded,
    Chair,
    ErrorOutline,
    Keyboard,
    LaptopOutlined,
    Logout,
    Mouse,
    NotificationsOutlined,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    MenuProps,
    Stack
} from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { CaretDown, DesktopTower, X } from "phosphor-react"
import { alpha, styled } from '@mui/material/styles';
import { useRouter } from "next/router";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { socketVar, userVar } from "@/apollo/store";
import { getJwtToken, logOut, updateUserInfo } from "@/libs/auth";
import { sweetConfirmAlert, sweetErrorHandling, sweetTopSmallSuccessAlert, sweetTopSuccessAlert } from "@/libs/sweetAlert";
import { Messages, serverApi } from "@/libs/config";
import { ProductCategory } from "@/libs/enum/product.enum";
import { Direction } from "@/libs/enum/common.enum";
import { BookOpenText, GraphicsCard } from "@phosphor-icons/react";
import { GET_NOTICES } from "@/apollo/user/query";
import { Notice } from "@/libs/types/notice/notice";
import moment from "moment";
import { DELETE_NOTICES } from "@/apollo/user/mutation";
import useDeviceDetect from "@/libs/hooks/useDeviceDetector";
import { RippleBadge } from "@/scss/MaterialTheme/styled";
import { useTranslation } from "next-i18next";
import MobileBar from "./mobileBar";


const Navbar: NextPage = (props: any) => {
    //Initialization
    const device = useDeviceDetect()
    const user = useReactiveVar(userVar)
    const [anchorEl2, setAnchorEl2] = useState(null);
    const drop = Boolean(anchorEl2);
    const [lang, setLang] = useState<string | null>("en");
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [anchorEl3, setAnchorEl3] = useState(null)
    const [anchorEl4, setAnchorEl4] = useState(null)
    const [logoutAnchor, setLogoutAnchor] = useState<null | HTMLElement>(null);
    const [notices, setNotices] = useState([])
    const { t, i18n } = useTranslation('common');
    const [totalNotices, setTotalNotices] = useState(0)
    const [searchObj, setSearchObj] = useState({
        page: 1,
        limit: 10,
        search: {}
    })
    const [rebuild, setRebuild] = useState(new Date())
    const logoutOpen = Boolean(logoutAnchor)
    const drop2 = Boolean(anchorEl3)
    const router = useRouter()
    const socket = useReactiveVar(socketVar)

    useEffect(() => {
        if (localStorage.getItem('locale') === null) {
            localStorage.setItem('locale', 'en');
            setLang('en');
        } else {
            setLang(localStorage.getItem('locale'));
        }
    }, [router]);

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

    useEffect(() => {
        const jwtToken = getJwtToken();
        if (jwtToken) {
            updateUserInfo(jwtToken)
        }
    }, [])

    const { refetch: getNoticesRefetch } = useQuery(GET_NOTICES, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        variables: {
            input: searchObj
        },
        onCompleted: ({ getAllNotices }) => {
            setNotices(getAllNotices.list)
            setTotalNotices(getAllNotices.metaCounter[0].total)
        }
    })

    const [deleteNotices] = useMutation(DELETE_NOTICES)

    useEffect(() => {
        getNoticesRefetch({ input: searchObj }).then()
        socket.onmessage = ({ data }) => {
            getNoticesRefetch({ input: searchObj }).then()
        }
    }, [socket, rebuild])


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
    const handleViewNotices = async () => {
        try {
            if (notices && notices.length > 0) {
                const confirm = await sweetConfirmAlert("Do you want to mark as read all?")
                if (confirm) {
                    await deleteNotices()
                    await sweetTopSmallSuccessAlert("You read all notices")
                    setAnchorEl4(null)
                    setRebuild(new Date())
                    setTotalNotices(0)
                }
            }
        } catch (err: any) {
            console.log(`Error: handleViewNotices, ${err.message}`)
            await sweetErrorHandling(err)
        }
    }
    const langClick = (e: any) => {
        setAnchorEl2(e.currentTarget)
    }
    const langClose = (e: any) => {
        setAnchorEl2(null)
    }

    const choiceLang = useCallback(
        async (e: any) => {
            setLang(e.target.id);
            localStorage.setItem('locale', e.target.id);
            setAnchorEl2(null);
            await router.push(router.asPath, router.asPath, { locale: e.target.id });
        },
        [router],
    )

    const openProductList = (event: any) => {
        setAnchorEl3(event.currentTarget)
    }
    const closeProductList = (event: any) => {
        setAnchorEl3(null)
    }

    const handleLogOut = async () => {
        logOut()
        await sweetTopSuccessAlert(Messages.error6)
        router.push("/")
    }
    const toggleNotificationHandler = (e: any) => {
        if (!anchorEl4) {
            setAnchorEl4(e.currentTarget)
        } else {
            setAnchorEl4(null)
        }
    }
    if (device === "mobile") {
        return (
            <MobileBar />
        )
    } else if (device === "desktop") {
        const imageUrl = user?.memberImage ? `${serverApi}/${user.memberImage}` : "/img/profile/defaultUser.svg"
        return (
            <>
                <Stack
                    style={!scrolled && router.pathname.includes("/products/detail") ? { backgroundColor: "#343434", position: "relative" } : {}}
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
                                    onClick={() => {
                                        router.push("/")
                                        setAnchorEl3(null)
                                    }}
                                    className={router.pathname === "/" ? "active" : ""}
                                >
                                    {t('Home')}
                                </Link>
                                <a
                                    className={router.pathname.includes('/products') ? "active" : ""}
                                >
                                    <Button
                                        disableRipple
                                        className="product-btn"
                                        onClick={openProductList}
                                    >
                                        {t('Products')}
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
                                                backgroundColor: "#c8c2c2"
                                            }}>
                                            <MenuItem className="list-item">
                                                <Stack onClick={() => {
                                                    let link = "/products/?input="
                                                    const jsonObj = JSON.stringify({ page: 1, limit: 6, sort: "createdAt", search: { productCategory: ProductCategory.LAPTOP } })
                                                    link += jsonObj
                                                    router.push(link, link, { scroll: false })
                                                    setAnchorEl3(null)
                                                }}>
                                                    <LaptopOutlined style={{ fontSize: "50px" }} />
                                                    <div>{t('Laptops')}</div>
                                                </Stack>
                                            </MenuItem>
                                            <MenuItem className="list-item">
                                                <Stack onClick={() => {
                                                    let link = "/products/?input="
                                                    const jsonObj = JSON.stringify({ page: 1, limit: 6, sort: "createdAt", search: { productCategory: ProductCategory.DESKTOP } })
                                                    link += jsonObj
                                                    router.push(link, link, { scroll: false })
                                                    setAnchorEl3(null)
                                                }}>
                                                    <DesktopTower size={"50px"} />
                                                    <div>{t('Desktops')}</div>
                                                </Stack>
                                            </MenuItem>
                                            <MenuItem className="list-item">
                                                <Stack onClick={() => {
                                                    let link = "/products/?input="
                                                    const jsonObj = JSON.stringify({ page: 1, limit: 6, sort: "createdAt", search: { productCategory: ProductCategory.GRAPHICS } })
                                                    link += jsonObj
                                                    router.push(link, link, { scroll: false })
                                                    setAnchorEl3(null)
                                                }}>
                                                    <GraphicsCard size={"50px"} />
                                                    <div>{t('Graphics')}</div>
                                                </Stack>
                                            </MenuItem>
                                            <MenuItem className="list-item">
                                                <Stack onClick={() => {
                                                    let link = "/products/?input="
                                                    const jsonObj = JSON.stringify({ page: 1, limit: 6, sort: "createdAt", search: { productCategory: ProductCategory.MICE } })
                                                    link += jsonObj
                                                    router.push(link, link, { scroll: false })
                                                    setAnchorEl3(null)
                                                }}>
                                                    <Mouse style={{ fontSize: "50px" }} />
                                                    <div>{t('Mice')}</div>
                                                </Stack>
                                            </MenuItem>
                                            <MenuItem className="list-item">
                                                <Stack onClick={() => {
                                                    let link = "/products/?input="
                                                    const jsonObj = JSON.stringify({ page: 1, limit: 6, sort: "createdAt", search: { productCategory: ProductCategory.KEYBOARD } })
                                                    link += jsonObj
                                                    router.push(link, link, { scroll: false })
                                                    setAnchorEl3(null)
                                                }}>
                                                    <Keyboard style={{ fontSize: "50px" }} />
                                                    <div>{t('Keyboard')}</div>
                                                </Stack>
                                            </MenuItem>
                                            <MenuItem className="list-item">
                                                <Stack alignItems={"center"} onClick={() => {
                                                    let link = "/products/?input="
                                                    const jsonObj = JSON.stringify({ page: 1, limit: 6, sort: "createdAt", direction: Direction.DESC, search: { productCategory: ProductCategory.CHAIR } })
                                                    link += jsonObj
                                                    router.push(link, link, { scroll: false })
                                                    setAnchorEl3(null)
                                                }}>
                                                    <Chair style={{ fontSize: "50px" }} />
                                                    <div>{t('Chair')}</div>
                                                </Stack>
                                            </MenuItem>
                                        </Stack>
                                    </Menu>
                                </a>
                                <Link
                                    href={"/retailers"}
                                    className={router.pathname.includes("/retailers") ? "active" : ""}
                                >
                                    {t('Retailers')}
                                </Link>
                                <Link
                                    href={"/community"}
                                    className={router.pathname.includes("/community") ? "active" : ""}
                                >
                                    {t('Society')}
                                </Link>
                                {
                                    !user._id ? null : (
                                        <Link
                                            href={"/member?stage=7"}
                                            className={router.pathname.includes("memberPage") ? "active" : ""}
                                        >
                                            {t('My Profile')}
                                        </Link>
                                    )
                                }
                                <Link
                                    href={"/cs"}
                                    className={router.pathname === "/cs" ? "active" : ""}
                                >
                                    {t('CS')}
                                </Link>
                            </Stack>
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                gap="10px"
                                className="navbar-features"
                            >
                                <div className="register-box">
                                    {
                                        user && user._id ?
                                            (
                                                <>
                                                    <IconButton onClick={(e: any) => setLogoutAnchor(e.target)}>
                                                        <Avatar src={imageUrl} sx={{ height: "40px", width: "40px" }} />
                                                    </IconButton>
                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={logoutAnchor}
                                                        open={logoutOpen}
                                                        onClose={() => {
                                                            setLogoutAnchor(null);
                                                        }}
                                                        sx={{ mt: '5px' }}
                                                    >
                                                        <MenuItem onClick={handleLogOut}>
                                                            <Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
                                                            {t('Logout')}
                                                        </MenuItem>
                                                    </Menu>
                                                </>
                                            )
                                            :
                                            (
                                                <Button className={"register-btn"} onClick={() => router.push("/account/join")}>
                                                    <AccountCircleRounded style={{ fontSize: "45px", fill: "white" }} />
                                                    <p>{t('Login / Register')}</p>
                                                </Button>
                                            )}
                                </div>
                                <Stack className="notify">
                                    <Button className="notify-ring" onClick={toggleNotificationHandler}>
                                        <NotificationsOutlined style={{ fontSize: "25px", fill: "white" }} />
                                        {totalNotices ? (<RippleBadge badgeContent={totalNotices} style={{ height: "20px", color: 'red' }} />) : null}
                                    </Button>
                                    <Menu
                                        anchorEl={anchorEl4}
                                        open={Boolean(anchorEl4)}
                                        onClose={toggleNotificationHandler}
                                        className="notify-box"
                                    >
                                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                            <Box className="title">Notifications ({totalNotices})</Box>
                                            <IconButton onClick={toggleNotificationHandler}><X /></IconButton>
                                        </Stack>
                                        <Divider sx={{ borderBottomColor: "black" }} />
                                        <Stack flexDirection={"row"} justifyContent={"end"} padding={"0 10px"}>
                                            <IconButton onClick={handleViewNotices}>
                                                <BookOpenText size={32} color={'black'} />
                                            </IconButton>
                                        </Stack>
                                        <Stack className="notify-body">
                                            {
                                                notices && notices.length > 0 ? notices.map((notice: Notice, index: number) => {
                                                    const imagePath = notice?.memberData?.memberImage ? `${serverApi}/${notice.memberData?.memberImage}` : "/img/profile/noUser.jpg"
                                                    return (
                                                        <MenuItem key={index}>
                                                            <Stack className="notify-item">
                                                                <Stack className="notify-owner">
                                                                    <Avatar src={imagePath} />
                                                                    <Stack className="action">
                                                                        <Box >{notice.noticeTitle} by {notice.memberData.memberType}</Box>
                                                                        <Box >{moment(notice.createdAt).format("HH:mm, DD MMMM")}</Box>
                                                                    </Stack>
                                                                </Stack>
                                                                <Stack className={"notify-content"}>
                                                                    {notice.noticeContent}
                                                                </Stack>
                                                            </Stack>
                                                        </MenuItem>
                                                    )
                                                }) : (
                                                    <Stack
                                                        alignItems={"center"}
                                                        style={{ fontSize: "24px", color: "black" }}
                                                        gap={"10px"}
                                                    >
                                                        <ErrorOutline fontSize="large" />
                                                        <div>No notices found!</div>
                                                    </Stack>
                                                )
                                            }
                                        </Stack>
                                        <Stack>
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                sx={{
                                                    borderRadius: 0,
                                                    color: 'white',
                                                    marginTop: "20px",
                                                    padding: "10px 0",
                                                    fontWeight: "500",
                                                    fontSize: "16px"
                                                }}
                                                onClick={() => {
                                                    setAnchorEl4(null)
                                                    router.push("/member?stage=10")
                                                }}
                                            >View All</Button>
                                        </Stack>
                                    </Menu>
                                </Stack>
                                <div className="lang-box">
                                    <Button
                                        disableRipple
                                        className="btn-lang"
                                        onClick={langClick}
                                        endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
                                    >
                                        <img
                                            className="img-flag"
                                            src={lang === "en" ? "/img/flag/langen.png" : lang === "ru" ? "/img/flag/langru.png" : "/img/flag/langkr.png"}
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