import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import SmileRatingSelect from "./smileRateSelect";

interface CommentWriteProps {
    setRating: any;
    commentObj: any;
    setCommentObj: any;
    submitCommentHandler: any
}


const CommunityCommentWrite = (props: CommentWriteProps) => {
    const { setRating, commentObj, setCommentObj, submitCommentHandler } = props
    const [value, setValue] = useState<string>('')
    return (
        <Stack className="review">
            <Box className="title">Leave Review</Box>
            <Stack direction={"row"} gap={"10px"}>
                <Box className="subtitle">Review</Box>
                <SmileRatingSelect setValue={setRating} />
            </Stack>
            <Stack className="comment-input">
                <input type="text" placeholder="Leave a comment" maxLength={200} onChange={(e: any) => {
                    if (value.length <= 200) {
                        setValue(e.target.value)
                        commentObj.commentContent = e.target.value;
                        setCommentObj({ ...commentObj })
                    }
                }} />
                <Stack className="comment-submit">
                    <Box>{value.length}/200</Box>
                    <Button onClick={submitCommentHandler}>Comment</Button>
                </Stack>
                {value.length >= 200 ? (<p>It is reached its limit</p>) : null}
            </Stack>
        </Stack>
    )
}


export default CommunityCommentWrite