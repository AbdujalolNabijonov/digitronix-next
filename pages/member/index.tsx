import { NextPage } from "next";
import { useEffect, useState } from "react";
import LayoutBasic from "@/libs/components/layouts/LayoutBasic";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import Favorities from "@/libs/components/memberPage/Favoities";
import Visited from "@/libs/components/memberPage/Visited";
import Following from "@/libs/components/memberPage/Following";
import Articles from "@/libs/components/memberPage/Articles";
import WriteArticle from "@/libs/components/memberPage/WriteArticle";
import MyProfile from "@/libs/components/memberPage/MyProfile";
import Follower from "@/libs/components/memberPage/Follower";
import { sweetErrorHandling } from "@/libs/sweetAlert";
import { Messages } from "@/libs/config";
import AddProduct from "@/libs/components/memberPage/AddProduct";
import AllProducts from "@/libs/components/memberPage/AllProducts";
import MyPanel from "@/libs/components/memberPage/MyPanel";
import OtherPanel from "@/libs/components/memberPage/OtherPanel";

const MemberPage: NextPage = (props: any) => {
    const router = useRouter()
    const memberId = router.query.memberId
    const stage = router.query.stage
    const [value, setValue] = useState<string>(stage as string ?? "1")

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            sweetErrorHandling(new Error(Messages.error2)).then()
            router.push("/account/join")
        }
    }, [])
    useEffect(() => {
        if (router.query.stage) {
            setValue(router.query.stage as string)
        }
    }, [router])

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
                        <TabPanel value={"8"} className="tab-panel">
                            <AddProduct />
                        </TabPanel>
                        <TabPanel value={"9"} className="tab-panel">
                            <AllProducts />
                        </TabPanel>
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
                        {
                            memberId ? (
                                <OtherPanel navigateSelectHandler={navigateSelectHandler} />
                            ) : (
                                <MyPanel navigateSelectHandler={navigateSelectHandler} />
                            )
                        }
                    </Stack>
                </TabContext>
            </Stack>
        </Stack>
    )
}

export default LayoutBasic(MemberPage)