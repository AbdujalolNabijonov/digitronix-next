import { useState } from "react";
import { ArticleCategory } from "@/libs/enum/article.enum";
import { Box, SelectChangeEvent, Stack, TextField } from "@mui/material"
import { Select, Option, CssVarsProvider, Input, selectClasses } from '@mui/joy';
import { KeyboardArrowDown } from "@mui/icons-material";
import dynamic from "next/dynamic";
const TEditor = dynamic(() => import("../community/Teditor"), { ssr: false })

const WriteArticle = (props: any) => {
    return (
        <Stack className="write-article">
            <Stack className="write-article-head">
                <Box className="title">Write Article</Box>
                <Box className="subtitle">Feel free with your article!</Box>
            </Stack>
            <Stack className="write-article-body">
                <TEditor />
            </Stack>
        </Stack>
    )
}

export default WriteArticle