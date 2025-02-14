import { serverApi } from "@/libs/config"
import { Article } from "@/libs/types/article/article"
import {  ArrowOutward } from "@mui/icons-material"
import { Avatar, Box, IconButton, Stack } from "@mui/material"
import moment from "moment"

const VerticalCard = (props: { article: Article, navigatetoPageHandler:any }) => {
    const { article,navigatetoPageHandler } = props
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
                <IconButton className={"link"} onClick={(e:any)=>navigatetoPageHandler(article._id, article.articleCategory)}>
                    <ArrowOutward />
                </IconButton>
            </Stack>
        </Stack>
    </>
}
export default VerticalCard