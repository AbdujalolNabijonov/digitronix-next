import React from "react";
import { NextPage } from "next";
import LayoutBasic from "@/libs/components/layouts/LayoutBasic";
import {
    Box,
    Button,
    IconButton,
    MenuItem,
    Pagination,
    Select,
    Stack,
    TextField
} from "@mui/material";
import { Eye, ThumbsUp } from "phosphor-react";

const Retailers: NextPage = (props: any) => {
    return (
        <Box className="container">
            <Stack className="retailer-page">
                <Stack className={"retailer-filter"}>
                    <Stack className={"retailer-sort"}>
                        <Box>Sort by</Box>
                        <Select value={"createdAt"}>
                            <MenuItem value={"createdAt"}>Recent</MenuItem>
                            <MenuItem value={"createdAt"}>Recent</MenuItem>
                            <MenuItem value={"createdAt"}>Recent</MenuItem>
                        </Select>
                    </Stack>
                    <Box className="retailer-search">
                        <TextField id="outlined-basic" placeholder="Search for a retailer" variant="outlined" />
                    </Box>
                </Stack>
                <Stack className={"retailers"}>
                    {
                        Array.from({ length: 8 }).map(ele => (
                            <Stack className="retailer-card">
                                <Box className={"card-head"}>
                                    <img src="/img/products/gaming-2.jpeg" alt="" />
                                    <Stack className={"card-head-items"}>
                                        <Stack direction={"row"} alignItems={"center"} gap={"2px"}>
                                            <IconButton disableRipple>
                                                <Eye size={19} color="white" />
                                            </IconButton>
                                            <Box>{"3"}</Box>
                                        </Stack>
                                        <Stack direction={"row"} alignItems={"center"} gap={"2px"}>
                                            <IconButton>
                                                <ThumbsUp size={19} color="white" />
                                            </IconButton>
                                            <Box>{"4"}</Box>
                                        </Stack>
                                    </Stack>
                                </Box>
                                <Stack className={"card-body"}>
                                    <Box className="card-title">Alina Smith</Box>
                                    <Box className="card-subtitle">mrarnold@gmail.com</Box>
                                    <Stack direction={"row"} className="card-info">
                                        <Stack className="card-info-item">
                                            <Box>7</Box>
                                            <Box>Products</Box>
                                        </Stack>
                                        <Stack className="card-info-item">
                                            <Box>10k</Box>
                                            <Box>Followings</Box>
                                        </Stack>
                                        <Stack className="card-info-item">
                                            <Box>368</Box>
                                            <Box>Followers</Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack className={"card-footer"} direction={"row"}>
                                    <Button variant="contained" color={"warning"}>
                                        Follow
                                    </Button>
                                    <Button variant="outlined">
                                        View
                                    </Button>
                                </Stack>
                            </Stack>
                        ))
                    }
                </Stack>
                <Stack className="pagination-box">
                    <Pagination
                        page={1}
                        count={3}
                        variant="outlined"
                        shape="rounded"
                        color="secondary"
                    />
                </Stack>
            </Stack>
        </Box>
    )
}

export default LayoutBasic(Retailers)
