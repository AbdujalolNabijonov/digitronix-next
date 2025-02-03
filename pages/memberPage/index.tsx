import { NextPage } from "next";
import { useState } from "react";
import LayoutBasic from "@/libs/components/layouts/LayoutBasic";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Avatar, Box, Button, Divider, Stack, Tab } from "@mui/material";
import { Binoculars, BookBookmark, Crosshair, Heart, Phone, SignOut, User, UserCircleGear, UserCirclePlus } from "phosphor-react";
import { BookOpenText, UserCircleCheck } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import Favorities from "@/libs/components/memberPage/Favoities";
import Visited from "@/libs/components/memberPage/Visited";
import Follower from "@/libs/components/memberPage/Follower";
import Articles from "@/libs/components/memberPage/Articles";
import WriteArticle from "@/libs/components/memberPage/WriteArticle";
import MyProfile from "@/libs/components/memberPage/MyProfile";
import { Product } from "@/libs/types/product/product";
import { useQuery } from "@apollo/client"
import { Direction } from "@/libs/enum/common.enum";
import Following from "@/libs/components/memberPage/Following";

const MemberPage: NextPage = (props: any) => {
    const router = useRouter()
    const memberId = router.query.memberId
    const stage = router.query.stage
    const [value, setValue] = useState<string>(stage as string ?? "1")

    const navigateSelectHandler = (e: any, value: string) => {
        setValue(value)
        let url = `/memberPage?stage=${value}`
        if (memberId) {
            url += `&memberId=${memberId}`
        }
        router.push(url, url, { scroll: false })
    }
    return (
        <Stack className="my-page">
            <Stack className="container">
                <TabContext value={value}>
                    <Stack flexDirection={"row"} sx={{ margin: "40px 0" }}>
                        <TabPanel value={"1"} className="tab-panel">
                            <Favorities />
                        </TabPanel>
                        <TabPanel value={"2"} className="tab-panel">
                            <Visited />
                        </TabPanel>
                        <TabPanel value={"3"} className="tab-panel">
                            <Follower />
                        </TabPanel>
                        <TabPanel value={"4"} className="tab-panel">
                            <Following />
                        </TabPanel>
                        <TabPanel value={"5"} className="tab-panel">
                            <Articles />
                        </TabPanel>
                        <TabPanel value={"6"} className="tab-panel">
                            <WriteArticle />
                        </TabPanel>
                        <TabPanel value={"7"} className="tab-panel">
                            <MyProfile />
                        </TabPanel>
                        <Stack className="account-nav">
                            <Stack className="account-info">
                                <Avatar sx={{ width: "70px", height: "70px" }} />
                                <Stack>
                                    <Stack className="account-item">
                                        <User />
                                        <Box>Abdujalol</Box>
                                    </Stack>
                                    <Stack className="account-item">
                                        <Phone />
                                        <Box>32011222</Box>
                                    </Stack>
                                    <Stack className="account-item">
                                        <Crosshair />
                                        <Box className="account-type">User</Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Divider variant="middle" />
                            <Stack className="account-manage">
                                <Box className="title">Manage Listing</Box>
                                <Stack className="tab-list">
                                    <Button
                                        startIcon={<Heart />}
                                        className={stage === "1" ? "tab-list-item on" : "tab-list-item off"}
                                        onClick={(e: any) => navigateSelectHandler(e, '1')}
                                    >
                                        My Favorities
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
                                        My Articles
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
                                    >
                                        Log Out
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </TabContext>
            </Stack>
        </Stack>
    )
}

export default LayoutBasic(MemberPage)