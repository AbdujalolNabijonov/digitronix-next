import { Box, Stack } from "@mui/material";
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useMemo } from "react";


const Banner: NextPage = (props: any) => {
    const pathname = useRouter().pathname;

    const memoizedValues = useMemo(() => {
        let title = "",
            desc = "",
            bgImg = ""
        switch (pathname) {

            case "/agents":
                title = "Agents"
                desc = "We are trustfull partner all time"
                bgImg = "/img/banner/agent.png"
                break;

            case "/community":
                title = "Community"
                desc = "Home / Community"
                bgImg = "/img/banner/community.png"
                break;
            case "/mypage":
                title = "MyPage"
                desc = "Home / MyPage"
                bgImg = "/img/banner/mypage.jpg"
                break;
            case "/cs":
                title = "CS"
                desc = "Customer Service"
                bgImg = "/img/banner/cs.jpg"
                break
            default:
                break;

        }
        return { title, desc, bgImg }
    }, [pathname])
    return (
        <Stack
            className="banner-basic"
            style={{ backgroundImage: `url(${memoizedValues.bgImg})` }}
        >
            <Box className="container">
                <Box className="banner-info">
                    <div className="title">
                        {memoizedValues.title}
                    </div>
                    <div className="desc">
                        {memoizedValues.desc}
                    </div>
                </Box>
            </Box>
        </Stack>
    )
}

export default Banner