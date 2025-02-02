import { ThumbUpAltRounded, VisibilityOutlined } from "@mui/icons-material"
import { Avatar, Box, Divider, IconButton, Stack } from "@mui/material"
import moment from "moment"

const ArticleCard = () => {
    return (
        <Stack className="article-card">
            <Stack className="article-image">
                <img src="/img/products/gaming-3.jpg" alt="" />
                <Stack className="article-date">
                    <Box>{moment(Date.now()).format("DD")}</Box>
                    <Box>{moment(Date.now()).format("MMM")}</Box>
                </Stack>
            </Stack>
            <Stack className="article-card-body">
                <Box className="article-title">This is my bro</Box>
                <Box className="article-context">{"lorem is word".slice(0, 30) + "..."}</Box>
            </Stack>
            <Divider sx={{ borderBottomColor: "black" }} />
            <Stack className="article-card-footer">
                <Stack className="article-owner">
                    <Avatar />
                    <Box className="owner-name">Willian Shekspear</Box>
                </Stack>
                <Stack direction={"row"} gap={"5px"} alignItems={"center"} justifyContent={"end"}>
                    <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
                        <IconButton disableRipple onClick={(e: any) => { e.stopPropagation() }}>
                            <VisibilityOutlined sx={{ fill: "gray" }} />
                        </IconButton>
                        <div>{"3"}</div>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"}>
                        <IconButton>
                            <ThumbUpAltRounded sx={{ fill: "gray" }} />
                        </IconButton>
                        <div>{'4'}</div>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default ArticleCard