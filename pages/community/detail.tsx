import { useState } from "react"
import LayoutBasic from "@/libs/components/layouts/LayoutBasic"
import { Article } from "@/libs/types/article/article"
import { Edit, ForumRounded, ThumbUpAltRounded, VisibilityOutlined } from "@mui/icons-material"
import { Box, Button, Divider, IconButton, Stack } from "@mui/material"
import moment from "moment"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
const ToastViewerComponent = dynamic(() => import("@/libs/components/community/TViewer"), { ssr: false });
import { useQuery } from "@apollo/client"
import { GET_ARTICLE } from "@/apollo/user/query"


const ArticleDetail = (props: any) => {
    const { query } = useRouter()
    const articleId = query.id;
    const [article, setArticle] = useState<Article>()

    const {
        refetch: getArticleRefetch
    } = useQuery(GET_ARTICLE, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        skip: !articleId,
        variables: { input: articleId },
        onCompleted: (data) => {
            setArticle(data.getArticle)
        }
    })
    return (
        <Stack className="article-detail">
            <Stack className="container">
                <Stack className="article-main">
                    <Stack className="title">
                        <Stack>
                            <Box>FREE BOARD</Box>
                            <Box>Express your opinions freely here without content restrictions</Box>
                        </Stack>
                        <Button endIcon={<Edit />}>
                            Write
                        </Button>
                    </Stack>
                    <Stack className="article">
                        <Box className="article-title">Brad pitt</Box>
                        <Stack className="owner-info">
                            <Stack className="article-owner">
                                <img src="/img/profile/noUser.jpg" alt="This is user" />
                                <Box>Abdujalol</Box>
                                <Divider orientation="vertical" variant="middle" flexItem />
                                <Box>{moment(Date.now()).format("YYYY-MM-DD HH:mm")}</Box>
                            </Stack>
                            <Stack direction={"row"} gap={"5px"} alignItems={"center"} justifyContent={"end"}>
                                <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
                                    <IconButton disableRipple onClick={(e: any) => { e.stopPropagation() }}>
                                        <VisibilityOutlined sx={{ fill: "white" }} />
                                    </IconButton>
                                    <div>{"3"}</div>
                                </Stack>
                                <Stack direction={"row"} alignItems={"center"}>
                                    <IconButton>
                                        <ThumbUpAltRounded sx={{ fill: "white" }} />
                                    </IconButton>
                                    <div>{'4'}</div>
                                </Stack>
                                <Stack direction={"row"} alignItems={"center"}>
                                    <IconButton>
                                        <ForumRounded sx={{ fill: "white" }} />
                                    </IconButton>
                                    <div>{'4'}</div>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Divider />
                        <Stack>
                            <ToastViewerComponent markDown={article?.articleContext} />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default LayoutBasic(ArticleDetail)