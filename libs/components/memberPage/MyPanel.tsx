import { Avatar, Box, Button, Divider, Stack } from "@mui/material"
import { useReactiveVar } from '@apollo/client'
import { userVar } from "@/apollo/store"
import { Messages, serverApi } from "@/libs/config"
import { BellRinging, Binoculars, BookBookmark, Crosshair, Heart, Phone, SignOut, User, UserCircleGear, UserCirclePlus } from "phosphor-react"
import { MemberType } from "@/libs/types/member/member"
import { BookOpenText, Devices, PlusSquare, UserCircleCheck } from "@phosphor-icons/react"
import { useRouter } from "next/router"
import { sweetConfirmAlert, sweetErrorHandling } from "@/libs/sweetAlert"
import { logOut } from "@/libs/auth"

const MyPanel = (props: any) => {
    const { navigateSelectHandler } = props
    const router = useRouter()
    const user = useReactiveVar(userVar);
    const stage = router.query.stage
    const logoutHandler = async () => {
        try {
            if (!user._id) throw new Error(Messages.error1)
            if (await sweetConfirmAlert('Do you want to logout?')) logOut();
            router.push('/')
        } catch (err: any) {
            console.log(`Error: logoutHandler, ${err.message}`);
            await sweetErrorHandling(err)
        }
    }
    return (
        <Stack className="account-nav">
            <Stack className="account-info">
                <Avatar sx={{ width: "70px", height: "70px" }} src={user.memberImage ? `${serverApi}/${user.memberImage}` : "img/profile/noUser.jpg"} />
                <Stack>
                    <Stack className="account-item">
                        <User />
                        <Box>{user.memberFullName || user.memberNick}</Box>
                    </Stack>
                    <Stack className="account-item">
                        <Phone />
                        <Box>{user.memberPhone}</Box>
                    </Stack>
                    <Stack className="account-item">
                        <Crosshair />
                        {
                            user.memberType === MemberType.ADMIN ? (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ color: "white" }}
                                    onClick={() => {router.push("/_admin") }}
                                >{user.memberType}</Button>
                            ) : (
                                <Box className="account-type">{user.memberType}</Box>
                            )
                        }

                    </Stack>
                </Stack>
            </Stack>
            <Divider variant="middle" />
            <Stack className="account-manage">
                <Box className="title">Manage Listing</Box>
                <Stack className="tab-list">
                    {
                        user.memberType === MemberType.RETAILER ? (
                            <>
                                <Button
                                    startIcon={<PlusSquare />}
                                    className={stage === "8" ? "tab-list-item on" : "tab-list-item off"}
                                    onClick={(e: any) => navigateSelectHandler(e, '8')}
                                >
                                    Add Product
                                </Button>
                                <Button
                                    startIcon={<Devices />}
                                    className={stage === "9" ? "tab-list-item on" : "tab-list-item off"}
                                    onClick={(e: any) => navigateSelectHandler(e, '9')}
                                >
                                    My Products
                                </Button>
                            </>
                        ) : null
                    }
                    <Button
                        startIcon={<Heart />}
                        className={stage === "1" ? "tab-list-item on" : "tab-list-item off"}
                        onClick={(e: any) => navigateSelectHandler(e, '1')}
                    >
                        My Favorities
                    </Button>
                    <Button
                        startIcon={<BellRinging />}
                        className={stage === "10" ? "tab-list-item on" : "tab-list-item off"}
                        onClick={(e: any) => navigateSelectHandler(e, '10')}
                    >
                        Notifications
                    </Button>
                    <Button
                        startIcon={<Binoculars />}
                        className={stage === "2" ? "tab-list-item on" : "tab-list-item off"}
                        onClick={(e: any) => navigateSelectHandler(e, '2')}
                    >
                        Recently visited
                    </Button>
                    <Button
                        startIcon={<UserCircleCheck />}
                        className={stage === "3" ? "tab-list-item on" : "tab-list-item off"}
                        onClick={(e: any) => navigateSelectHandler(e, '3')}
                    >
                        My Followers
                    </Button>
                    <Button
                        startIcon={<UserCirclePlus />}
                        onClick={(e: any) => navigateSelectHandler(e, '4')}
                        className={stage === "4" ? "tab-list-item on" : "tab-list-item off"}
                    >
                        My Followings
                    </Button>
                </Stack>
            </Stack>
            <Divider variant="middle" />
            <Stack className="account-manage">
                <Box className="title">Community</Box>
                <Stack className="tab-list">
                    <Button
                        startIcon={<BookBookmark />}
                        className={stage === "5" ? "tab-list-item on" : "tab-list-item off"}
                        onClick={(e: any) => navigateSelectHandler(e, '5')}
                    >
                        Articles
                    </Button>
                    <Button
                        startIcon={<BookOpenText />}
                        className={stage === "6" ? "tab-list-item on" : "tab-list-item off"}
                        onClick={(e: any) => navigateSelectHandler(e, '6')}
                    >
                        Write Article
                    </Button>
                </Stack>
            </Stack>
            <Divider variant="middle" />
            <Stack className="account-manage">
                <Box className="title">Manage Account</Box>
                <Stack className="tab-list">
                    <Button
                        startIcon={<UserCircleGear />}
                        className={stage === "7" ? "tab-list-item on" : "tab-list-item off"}
                        onClick={(e: any) => navigateSelectHandler(e, '7')}
                    >
                        My Profile
                    </Button>
                    <Button
                        startIcon={<SignOut />}
                        className={"tab-list-item"}
                        onClick={logoutHandler}
                    >
                        Log Out
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default MyPanel