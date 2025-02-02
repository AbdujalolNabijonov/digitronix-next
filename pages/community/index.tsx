import { useState } from "react";
import LayoutBasic from "@/libs/components/layouts/LayoutBasic";
import { Avatar, Box, Button, Divider, IconButton, Pagination, Stack } from "@mui/material";
import { NextPage } from "next";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { ArticleCategory } from "@/libs/enum/article.enum";
import { Edit, ForumRounded, ThumbUpAltRounded, VisibilityOutlined } from "@mui/icons-material";
import moment from "moment";
import ArticleCard from "@/libs/components/article/articleCard";

const Community: NextPage = (props: any) => {
    const [value, setValue] = useState<string>("1")
    const handleChange = (e: any, value: string) => {
        setValue(value)
    }
    return (
        <Stack className="community-page">
            <Stack className="container">
                <TabContext value={value}>
                    <Stack className="tabs" direction={"row"} justifyContent={"end"}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab className="tab-item" label="News" value="1" />
                            <Tab className="tab-item" label="Free" value="2" />
                            <Tab className="tab-item" label="Humor" value="3" />
                            <Tab className="tab-item" label="Recommend" value="4" />
                        </TabList>
                    </Stack>
                    <Stack className="info">
                        <Stack className="title">
                            <Box>Board Article</Box>
                            <Box>Express your opinions freely here without content restrictions</Box>
                        </Stack>
                        <Box>
                            <Button variant={"contained"} endIcon={<Edit />}>Write</Button>
                        </Box>
                    </Stack>
                    <TabPanel value={value}>
                        <Stack className="articles">
                            {Array.from({ length: 4 }).map(ele => (
                                <ArticleCard />
                            ))}
                        </Stack>
                        <Box className="article-avb">{"3"} Articles Avaible</Box>
                        <Stack className="pagination-box">
                            <Pagination
                                page={1}
                                count={3}
                                variant="outlined"
                                shape="rounded"
                                color="secondary"
                            />
                        </Stack>
                    </TabPanel>
                </TabContext>
            </Stack>
        </Stack>
    )
}

export default LayoutBasic(Community)