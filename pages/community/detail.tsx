import { useState } from "react"
import LayoutBasic from "@/libs/components/layouts/LayoutBasic"
import { Article } from "@/libs/types/article/article"
import { Edit, ForumRounded, Send, ThumbUpAltRounded, VisibilityOutlined } from "@mui/icons-material"
import { Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material"
import moment from "moment"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
const ToastViewerComponent = dynamic(() => import("@/libs/components/community/TViewer"), { ssr: false });
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import { GET_ARTICLE, GET_COMMENTS } from "@/apollo/user/query"
import { Messages, serverApi } from "@/libs/config"
import CommunityCommentWrite from "@/libs/components/others/communityCommentWrite"
import { CommentGroup } from "@/libs/enum/comment.enum"
import CommentRead from "@/libs/components/others/commentRead"
import { Comment } from "@/libs/types/comment/comment"
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert"
import { socketVar, userVar } from "@/apollo/store"
import { CREATE_COMMENT, LIKE_TARGET_ARTICLE, LIKE_TARGET_COMMENT } from "@/apollo/user/mutation"
import { ArticleCategory } from "@/libs/enum/article.enum"
import { NoticeGroup } from "@/libs/enum/notice.enum"
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});
const ArticleDetail = (props: any) => {
    const router = useRouter()
    const { query } = useRouter()
    const articleId = query.id;
    const articleCategory = query.category
    const user = useReactiveVar(userVar)
    const socket = useReactiveVar(socketVar)
    const [article, setArticle] = useState<Article>()
    const [rating, setRating] = useState<number>(0)
    const [totalComments, setTotalComments] = useState<number>(0)
    const [comments, setComments] = useState<Comment[]>([])
    const [commentObj, setCommentObj] = useState({
        commentGroup: CommentGroup.ARTICLE,
        commentRank: 0,
        commentContent: "",
        commentTargetId: "",
    })
    const [commentSearchObj, setCommentSearchObj] = useState({
        page: 1,
        limit: 2,
        search: {
            commentTargetId: ""
        }
    })

    const {
        refetch: getArticleRefetch
    } = useQuery(GET_ARTICLE, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        skip: !articleId,
        variables: { input: articleId },
        onCompleted: (data) => {
            setArticle(data.getArticle)
            commentSearchObj.search.commentTargetId = data.getArticle._id;
            commentObj.commentTargetId = data.getArticle._id
            setCommentSearchObj({ ...commentSearchObj })
            setCommentObj({ ...commentObj })

        }
    })

    const { refetch: getTargetCommentsRefetch } = useQuery(GET_COMMENTS, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        skip: !articleId,
        variables: { input: { ...commentSearchObj, search: { commentTargetId: articleId } } },
        onCompleted: ({ getAllComments }) => {
            setComments(getAllComments.list);
            setTotalComments(getAllComments.metaCounter[0].total ?? 0)
        }
    })

    const [createComment] = useMutation(CREATE_COMMENT);
    const [likeTargetComment] = useMutation(LIKE_TARGET_COMMENT)
    const [likeTargetArticle] = useMutation(LIKE_TARGET_ARTICLE)
    const submitCommentHandler = async () => {
        try {
            if (!user._id) throw Error(Messages.error2)
            if (!commentObj.commentContent) throw new Error(Messages.comment_err1);
            if (!rating) throw new Error(Messages.comment_err2)
            commentObj.commentRank = rating
            await createComment({ variables: { input: commentObj } })
            noticeCommentHandler(article?.articleTitle, user._id)
            await sweetTopSmallSuccessAlert(Messages.success2);
            commentObj.commentRank = 0;
            commentObj.commentContent = ""
            setCommentObj({ ...commentObj })
            await getTargetCommentsRefetch({ input: commentSearchObj })
        } catch (err: any) {
            console.log(`Error: submitCommentHandler, ${err.message}`)
            await sweetErrorHandling(err)
        }
    }
    const noticeCommentHandler = (articleTitle: any, noticeTargetId: any) => {
        const messageInput = {
            event: "message",
            data: {
                event: "notice",
                noticeGroup: NoticeGroup.ARTICLE,
                noticeTitle: `Article is written a comment`,
                noticeTargetId: noticeTargetId,
                noticeContent: `${user.memberNick} wrote a comment to article titled ${articleTitle}`
            }
        }
        socket.send(JSON.stringify(messageInput))
    }
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
    const likeTargetCommentHandler = async (e: any, commentId: string) => {
        try {
            if (!user._id) throw new Error(Messages.error2);
            if (!commentId) throw new Error(Messages.error1);
            await likeTargetComment({ variables: { input: commentId } });
            await getTargetCommentsRefetch({ input: commentSearchObj })
        } catch (err: any) {
            console.log(`Error: likeTargetCommentHandler, ${err.message}`);
            await sweetErrorHandling(err)
        }
    }

    const likeTargetArticleHandler = async () => {
        try {
            if (!user._id) throw new Error(Messages.error2);
            if (!articleId) throw new Error(Messages.error1);
            await likeTargetArticle({ variables: { input: articleId } });
            await getArticleRefetch({ input: articleId })
        } catch (err: any) {
            console.log(`Error: likeTargetCommentHandler, ${err.message}`);
            await sweetErrorHandling(err)
        }
    }
    const navigatePageHandler = () => {
        if (user._id === article?.memberData._id) {
            router.push(`/member?stage=3`)
        } else {
            router.push(`/member?stage=3&memberId=${article?.memberData._id}`)
        }
    }
    return (
        <Stack className="article-detail">
            <Stack className="container">
                <Stack className="article-main">
                    <Stack className="title">
                        <Stack>
                            <Box>{articleCategory ?? "".toUpperCase()} BOARD</Box>
                            <Box>Express your opinions freely here without content restrictions</Box>
                        </Stack>
                        <Button endIcon={<Edit />} onClick={()=>{
                            router.push(`/member?stage=6`)
                        }}>
                            Write
                        </Button>
                    </Stack>
                    <Stack className="article">
                        <Box className="article-title">{article?.articleTitle}</Box>
                        <Stack className="owner-info">
                            <Stack className="article-owner">
                                <img src={article?.memberData.memberImage ? `${serverApi}/${article.memberData.memberImage}` : "/img/profile/noUser.jpg"} alt="This is user" />
                                <Button sx={{ color: "#F44336", fontWeight:"600",letterSpacing:"1px" }} onClick={navigatePageHandler}>{article?.memberData.memberFullName ?? article?.memberData.memberNick}</Button>
                                <Divider orientation="vertical" variant="middle" flexItem />
                                <Box>{moment(article?.createdAt).format("YYYY-MM-DD HH:mm")}</Box>
                            </Stack>
                            <Stack direction={"row"} gap={"5px"} alignItems={"center"} justifyContent={"end"}>
                                <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
                                    <IconButton disableRipple onClick={(e: any) => { e.stopPropagation() }}>
                                        <VisibilityOutlined sx={{ fill: "white" }} />
                                    </IconButton>
                                    <div>{article?.articleViews}</div>
                                </Stack>
                                <Stack direction={"row"} alignItems={"center"}>
                                    <IconButton onClick={() => {
                                        likeTargetArticleHandler()
                                        if (!article?.meLiked[0]?.myFavorite) {
                                            noticeLikeHandler(article?.articleTitle, article?.memberData._id)
                                        }
                                    }}>
                                        <ThumbUpAltRounded sx={article?.meLiked[0]?.myFavorite ? { fill: "#f44336" } : { fill: "white" }} />
                                    </IconButton>
                                    <div>{article?.articleLikes}</div>
                                </Stack>
                                <Stack direction={"row"} alignItems={"center"}>
                                    <IconButton>
                                        <ForumRounded sx={{ fill: "white" }} />
                                    </IconButton>
                                    <div>{totalComments}</div>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Divider />
                        <Stack className="article-context">
                            <ToastViewerComponent markDown={article?.articleContext} />
                            <IconButton onClick={likeTargetArticleHandler}><ThumbUpAltRounded sx={article?.meLiked[0]?.myFavorite ? { fill: "#f44336", marginRight: "5px" } : { fill: "white", marginRight: "5px" }} /> {article?.articleLikes}</IconButton>
                        </Stack>
                    </Stack>
                    <Stack className="comment">
                        {
                            comments && comments.length > 0 ? (
                                <CommentRead
                                    totalComments={totalComments}
                                    comments={comments}
                                    commentSearchObj={commentSearchObj}
                                    setCommentSearchObj={setCommentSearchObj}
                                    likeTargetCommentHandler={likeTargetCommentHandler}
                                    getAllCommentsRefetch={getTargetCommentsRefetch}
                                />
                            ) : null
                        }
                        <CommunityCommentWrite
                            commentObj={commentObj}
                            setCommentObj={setCommentObj}
                            setRating={setRating}
                            submitCommentHandler={submitCommentHandler}
                        />
                    </Stack>
                </Stack>
                <Stack className="community-board">
                    <Box className="title">Community Article</Box>
                    <List>
                        <ListItem onClick={() => {
                            const searchObj = {
                                page: 1,
                                limit: 4,
                                sort: "createdAt",
                                direction: "ASC",
                                search: {
                                    articleCategory: ArticleCategory.NEWS
                                }
                            }
                            const link = `/community?input=${JSON.stringify(searchObj)}`
                            router.push(link, link, { scroll: false })
                        }}>
                            <Button className={articleCategory === ArticleCategory.NEWS ? "on" : "off"}>News</Button>
                        </ListItem>
                        <ListItem
                            onClick={() => {
                                const searchObj = {
                                    page: 1,
                                    limit: 4,
                                    sort: "createdAt",
                                    direction: "ASC",
                                    search: {
                                        articleCategory: ArticleCategory.FREE
                                    }
                                }
                                const link = `/community?input=${JSON.stringify(searchObj)}`
                                router.push(link, link, { scroll: false })
                            }}
                        >
                            <Button className={articleCategory === ArticleCategory.FREE ? "on" : "off"}>Free</Button>
                        </ListItem>
                        <ListItem
                            onClick={() => {
                                const searchObj = {
                                    page: 1,
                                    limit: 4,
                                    sort: "createdAt",
                                    direction: "ASC",
                                    search: {
                                        articleCategory: ArticleCategory.HUMOR
                                    }
                                }
                                const link = `/community?input=${JSON.stringify(searchObj)}`
                                router.push(link, link, { scroll: false })
                            }}
                        >
                            <Button className={articleCategory === ArticleCategory.HUMOR ? "on" : "off"}>Humor</Button>
                        </ListItem>
                        <ListItem
                            onClick={() => {
                                const searchObj = {
                                    page: 1,
                                    limit: 4,
                                    sort: "createdAt",
                                    direction: "ASC",
                                    search: {
                                        articleCategory: ArticleCategory.RECOMMEND
                                    }
                                }
                                const link = `/community?input=${JSON.stringify(searchObj)}`
                                router.push(link, link, { scroll: false })
                            }}
                        >
                            <Button className={articleCategory === ArticleCategory.RECOMMEND ? "on" : "off"}>Recomendation</Button>
                        </ListItem>
                    </List>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default LayoutBasic(ArticleDetail)