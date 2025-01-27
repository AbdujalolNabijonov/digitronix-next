import { serverApi } from "@/libs/config"
import { Article } from "@/libs/types/article/article"
import { AccountCircleRounded, ArrowOutward } from "@mui/icons-material"
import { Avatar, Box, Stack } from "@mui/material"
import moment from "moment"
import Link from "next/link"

const VerticalCard = (props: { article: Article }) => {
    const { article } = props
    const memberImage = article.memberData?.memberImage ? `${serverApi}/${article.memberData?.memberImage}` : "/img/profile/defaultUser.svg"
    const articleImage = article.articleImage ? `${serverApi}/${article.articleImage}` : ""
    return <>
        <Stack className="vertical-card">
            <div className="card-head">
                <img src={articleImage} alt="" />
            </div>
            <Box className="card-body">
                <div className="category">
                    {article.articleCategory}
                </div>
                <div className="title">
                    {article.articleTitle}
                </div>
                <div className="context">
                    {article.articleContext}
                </div>
            </Box>
            <Stack
                className="card-footer"
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Stack
                    direction={"row"}
                    gap={"15px"}
                    alignItems={"center"}
                >
                    <div className="user-img">
                        <Avatar src={memberImage}/>
                    </div>
                    <div className="user-info">
                        <div className="name">{article.memberData.memberNick}</div>
                        <div className="date">{moment(article.createdAt).format("YYYY-MM-DD")}</div>
                    </div>
                </Stack>
                <Box className={"link"}>
                    <ArrowOutward />
                </Box>
            </Stack>
        </Stack>
    </>
}
export default VerticalCard