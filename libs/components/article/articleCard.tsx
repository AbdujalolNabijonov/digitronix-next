import { serverApi } from "@/libs/config"
import { Article } from "@/libs/types/article/article"
import { ThumbUpAltRounded, VisibilityOutlined } from "@mui/icons-material"
import { Avatar, Box, Divider, IconButton, Stack } from "@mui/material"
import moment from "moment"
import { useRouter } from "next/router"

interface ArticleProps {
    article: Article;
    likeTargetArticle: any
}

const ArticleCard = (props: ArticleProps) => {
    const { article, likeTargetArticle } = props
    const router = useRouter()
    const articleImage = article.articleImage ? `${serverApi}/${article.articleImage}` : "/img/profile/image.svg"
    const memberImage = article.memberData.memberImage ? `${serverApi}/${article.memberData.memberImage}` : "/img/profile/noUser.jpg"
    return (
        <Stack className="article-card">
            <Stack className="article-image" onClick={() => {
                const link = `/community/detail?id=${article._id}&category=${article.articleCategory}`
                router.push(link, link, { scroll: false })
            }}>
                <img src={articleImage} alt="article image" />
                <Stack className="article-date">
                    <Box>{moment(article.createdAt).format("DD")}</Box>
                    <Box>{moment(article.createdAt).format("MMM")}</Box>
                </Stack>
            </Stack>
            <Stack className="article-card-body">
                <Box className="article-title">{article.articleTitle}</Box>
            </Stack>
            <Divider sx={{ borderBottomColor: "black" }} variant="middle" />
            <Stack className="article-card-footer">
                <Stack className="article-owner">
                    <Avatar src={memberImage} />
                    <Box className="owner-name">{article.memberData.memberFullName ?? article.memberData.memberNick}</Box>
                </Stack>
                <Stack direction={"row"} gap={"5px"} alignItems={"center"} justifyContent={"end"}>
                    <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
                        <IconButton disableRipple onClick={(e: any) => { e.stopPropagation() }}>
                            <VisibilityOutlined sx={{ fill: "gray" }} />
                        </IconButton>
                        <div>{article.articleViews}</div>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"}>
                        <IconButton onClick={(e: any) => { likeTargetArticle(e, article._id) }}>
                            <ThumbUpAltRounded sx={article.meLiked[0]?.myFavorite ? { fill: "#f44336" } : { fill: "gray" }} />
                        </IconButton>
                        <div>{article.articleLikes}</div>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default ArticleCard