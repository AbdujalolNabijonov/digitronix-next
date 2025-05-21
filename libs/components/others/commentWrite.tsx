import React from "react";
import { Box, Stack } from "@mui/material";
import SmileRatingSelect from "./smileRateSelect";
import HoverButton from "./HoverButton";

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
            <Stack justifyContent={"end"} direction={"row"}>
            {
                commentObj.commentContent ? (
                    <Box onClick={submitCommentHandler}>
                        <HoverButton text="Submit" />
                    </Box>
                ) : (
                    <Box onClick={submitCommentHandler} className="bg-gray-400 py-3 w-[200px] rounded-lg flex justify-center text-gray cursor-not-allowed mt-4 font-bold">
                        Disabled
                    </Box>
                )
            }
            </Stack>
        </Stack>
    )
}


export default CommentWrite