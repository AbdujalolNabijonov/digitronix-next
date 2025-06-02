import { serverApi } from "@/libs/config"
import { Article } from "@/libs/types/article/article"
import { CallMadeOutlined, ThumbUpAltRounded, Tune, VisibilityOutlined } from "@mui/icons-material"
import { Avatar, Box, Button, Divider, IconButton, Stack } from "@mui/material"
import moment from "moment"
import { useRouter } from "next/router"
import { useReactiveVar } from "@apollo/client"
import { socketVar, userVar } from "@/apollo/store"
import { NoticeGroup } from "@/libs/enum/notice.enum"

interface ArticleProps {
    article: Article;
    likeTargetArticle: any
}

const ArticleCard = (props: ArticleProps) => {
    const { article, likeTargetArticle } = props
    const socket = useReactiveVar(socketVar)
    const user = useReactiveVar(userVar)
    const router = useRouter()
    const articleImage = article.articleImage ? `${serverApi}/${article.articleImage}` : "/img/profile/image.svg"
    const memberImage = article.memberData.memberImage ? `${serverApi}/${article.memberData.memberImage}` : "/img/profile/noUser.jpg"

    const noticeLikeHandler = (articleTitle: any, noticeTargetId: any) => {
        const messageInput = {
            event: "message",
            data: {
                event: "notice",
                noticeGroup: NoticeGroup.ARTICLE,
                noticeTitle: `Article is liked`,
                noticeTargetId: noticeTargetId,
                noticeContent: `${user.memberNick} liked article titled ${articleTitle}`
            }
        }
        socket.send(JSON.stringify(messageInput))
    }
    return (
        <Stack className="article-card">
            <Stack className="article-image">
                <img src={articleImage} alt="article image" />
            </Stack>
            <Stack className="article-body">
                <Button className="subtitle" startIcon={<Tune/>}>
                    {article.articleCategory}
                </Button>
                <Box className="title font-bold">
                    {article.articleTitle.slice(0, 50)}{article.articleTitle.length > 50 ? "..." : null}
                </Box>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
                        <Avatar src={article.memberData.memberImage ? `${serverApi}/${article.memberData.memberImage}` : "/img/profile/defaultUser.svg"} />
                        <Stack>
                            <Box className="font-bold text-white">
                                by {article.memberData.memberNick}
                            </Box>
                            <Box className="text-gray-200 text-sm">
                                {moment(article.createdAt).format("MMM DD, YYYY")}
                            </Box>
                        </Stack>
                    </Stack>
                    <IconButton className="call-btn">
                        <CallMadeOutlined/>
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default ArticleCard