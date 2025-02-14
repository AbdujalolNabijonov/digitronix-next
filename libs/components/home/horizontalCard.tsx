import { serverApi } from "@/libs/config"
import { Article } from "@/libs/types/article/article"
import {  ArrowOutward } from "@mui/icons-material"
import { Avatar, Box, IconButton, Stack } from "@mui/material"
import moment from "moment"

const HorizontalCard = (props: { article: Article, navigatetoPageHandler:any }) => {
    const { article,navigatetoPageHandler } = props
    const memberImage = article.memberData?.memberImage ? `${serverApi}/${article.memberData?.memberImage}` : "/img/profile/defaultUser.svg"
    const articleImage = article.articleImage ? `${serverApi}/${article.articleImage}` : ""
    return (
        <Stack className="horizontal-card" direction={"row"} alignItems={"center"}>
            <div className="card-img">
                <img src={articleImage} alt="" />
            </div>
            <Box className="card-body">
                <div className="category">
                    {article.articleCategory}
                </div>
                <div className="title">
                    {article.articleTitle}
                </div>
                <Stack
                    alignItems={"center"}
                    direction={"row"}
                    justifyContent={"space-between"}
                >
                    <Stack
                        className="user-info"
                        direction={"row"}
                        gap={"10px"}
                        alignItems={"center"}
                    >
                        <div className="user-img">
                            <Avatar src={memberImage} />
                        </div>
                        <Stack>
                            <div className="name">{article.memberData.memberNick}</div>
                            <div className="old">{moment(article.createdAt).format("YYYY-MM-DD")}</div>
                        </Stack>
                    </Stack>
                    <IconButton className="link" onClick={(e:any)=>navigatetoPageHandler(article._id, article.articleCategory)}>
                        <ArrowOutward />
                    </IconButton>
                </Stack>
            </Box>
        </Stack>
    )
}

export default HorizontalCard