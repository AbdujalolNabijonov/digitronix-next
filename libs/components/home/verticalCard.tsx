import { AccountCircleRounded, ArrowOutward } from "@mui/icons-material"
import { Box, Stack } from "@mui/material"
import Link from "next/link"

const VerticalCard = (props: any) => {
    return <>
        <Stack className="vertical-card">
            <div className="card-head">
                <img src="/img/banner/banner-1.jpeg" alt="" />
            </div>
            <Box className="card-body">
                <div className="category">
                    News
                </div>
                <div className="title">
                    Trump fenalty for $2mln
                </div>
                <div className="context">
                    Also, His two children finalty for $2mln each.
                </div>
            </Box>
            <Stack
                className="card-footer"
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Stack
                    direction={"row"}
                    gap={"15px"}
                    alignItems={"center"}
                >
                    <div className="user-img">
                        <AccountCircleRounded />
                    </div>
                    <div className="user-info">
                        <div className="name">By John</div>
                        <div className="date">June 2, 2024</div>
                    </div>
                </Stack>
                <Box className={"link"}>
                    <ArrowOutward />
                </Box>
            </Stack>
        </Stack>
    </>
}
export default VerticalCard