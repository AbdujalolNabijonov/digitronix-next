import { AccountCircleRounded, ArrowOutward } from "@mui/icons-material"
import { Box, Stack } from "@mui/material"

const HorizontalCard = () => {
    return (
        <Stack className="horizontal-card" direction={"row"} alignItems={"center"}>
            <div className="card-img">
                <img src="/img/banner/banner-1.jpeg" alt="" />
            </div>
            <Box className="card-body">
                <div className="category">
                    Humor
                </div>
                <div className="title">
                    MacBook is not for gaming at all.
                </div>
                <div className="context">
                    Macbook does not have board that support to play games.
                </div>
                <Stack
                    alignItems={"center"}
                    direction={"row"}
                    justifyContent={"space-between"}
                >
                    <Stack
                        className="user-info"
                        direction={"row"}
                        gap={"10px"}
                        alignItems={"center"}
                    >
                        <div className="user-img">
                            <AccountCircleRounded />
                        </div>
                        <Stack>
                            <div className="name">Shawn</div>
                            <div className="old">3h</div>
                        </Stack>
                    </Stack>
                    <Box className="link">
                        <ArrowOutward />
                    </Box>
                </Stack>
            </Box>
        </Stack>
    )
}

export default HorizontalCard