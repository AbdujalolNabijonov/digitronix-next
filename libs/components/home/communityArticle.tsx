import { Box, Stack } from "@mui/material"
import { NextPage } from "next"
import VerticalCard from "./verticalCard"
import HorizontalCard from "./horizontalCard"


const CommunityArticle: NextPage = () => {
    return (
        <>
            <Stack className="community-article">
                <Box className="container">
                    <div className="title">
                        Community Article
                    </div>
                    <Stack direction={"row"} gap={"20px"}>
                        <Stack direction={"row"} gap="20px">
                            {
                                Array.from({ length: 2 }).map(ele => (
                                    <VerticalCard />
                                ))
                            }
                        </Stack>
                        <Stack gap={"10px"}>
                            {
                                Array.from({ length: 2 }).map(ele => (
                                    <HorizontalCard />
                                ))
                            }
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </>
    )
}

export default CommunityArticle