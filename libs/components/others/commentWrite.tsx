import React from "react";
import { Box, Button, Stack } from "@mui/material";
import SmileRatingSelect from "./smileRateSelect";

interface CommentWriteProps {
    setRating: any;
    commentObj: any;
    setCommentObj: any;
    submitCommentHandler: any
}


const CommentWrite = (props: CommentWriteProps) => {
    const { setRating, commentObj, setCommentObj, submitCommentHandler } = props

    return (
        <Stack className="review">
            <Box className="title">Leave Review</Box>
            <Stack direction={"row"} gap={"10px"}>
                <Box className="subtitle">Review</Box>
                <SmileRatingSelect setValue={setRating} />
            </Stack>
            <textarea
                className="review-content"
                rows={10}
                value={commentObj.commentContent}
                placeholder="Write a review"
                onChange={(e) => {
                    commentObj.commentContent = e.target.value;
                    setCommentObj({ ...commentObj })
                }}
            ></textarea>
            <Button variant="contained" onClick={submitCommentHandler}>Submit</Button>
        </Stack>
    )
}


export default CommentWrite