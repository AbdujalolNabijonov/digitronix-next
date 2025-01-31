import { serverApi } from "@/libs/config"
import { Comment } from "@/libs/types/comment/comment"
import { ThumbUpAltRounded } from "@mui/icons-material"
import { Avatar, Box, Divider, IconButton, Pagination, Stack } from "@mui/material"
import moment from "moment"
import { Star } from "phosphor-react"


const CommentRead = (props: any) => {
    const {
        comments,
        totalComments,
        likeTargetCommentHandler,
        commentSearchObj,
        setCommentSearchObj,
        getAllCommentsRefetch } = props
    return (
        <Stack>
            <Stack className="comments">
                <Stack className="comment-rate">
                    <Star />
                    <Box>Reviews {totalComments}</Box>
                </Stack>
                <Stack sx={{ overflow: "auto", maxHeight: "300px" }}>
                    {comments.map((comment: Comment, index: number) => {
                        const memberImage = comment.memberData?.memberImage ? `${serverApi}/${comment.memberData?.memberImage}` : "/img/profile/defaultUser.svg"
                        return (
                            <Stack className="comment-info" key={index}>
                                <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                    <Stack className="comment-member">
                                        <Avatar src={memberImage} />
                                        <Stack>
                                            <Box><strong>{comment.memberData.memberNick}</strong></Box>
                                            <Box>{moment(comment.createdAt).format("YYYY-MM-DD")}</Box>
                                        </Stack>
                                    </Stack>
                                    <Stack flexDirection={"row"} alignItems={"center"}>
                                        <IconButton onClick={(e) => { likeTargetCommentHandler(e, comment._id) }}>
                                            <ThumbUpAltRounded sx={comment.meLiked && comment.meLiked[0]?.myFavorite ? { fill: "#f44336" } : { fill: "gray" }} />
                                        </IconButton>
                                        {comment.commentLikes}
                                    </Stack>
                                </Stack>
                                <Box className="comment-context">
                                    {comment.commentContent}
                                </Box>
                                <Divider />
                            </Stack>
                        )
                    })}
                </Stack>
                <Stack alignItems={"center"} margin={"20px"}>
                    <Pagination
                        page={commentSearchObj.page}
                        count={Math.ceil(totalComments / 2)}
                        onChange={(e, value) => {
                            commentSearchObj.page = value;
                            setCommentSearchObj({ ...commentSearchObj })
                            getAllCommentsRefetch({ input: commentSearchObj }).then()
                        }}
                        shape="rounded"
                        color="primary"
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}

export default CommentRead