import LayoutProduct from "@/libs/components/layouts/LayoutProduct";
import ProductFilter from "@/libs/components/products/productFilter";
import { SwapVertOutlined } from "@mui/icons-material";
import {
    Box,
    MenuItem,
    Select,
    Stack
} from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";



const Products: NextPage = (props: any) => {
    const router = useRouter();
    const totalProducts = 3;
    return (
        <>
            <Stack className="container">
                <Stack className="products-page">
                    <Stack className="navigator">
                        <Box className="navigator-name">
                            {router.query.category} {`(${totalProducts})`}
                        </Box>
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Box className="path-history">
                                <Link href={"/"}> HOME </Link> / PRODUCTS
                            </Box>
                            <Stack direction={"row"} className="sort">
                                <Stack direction={"row"} alignItems={"center"}>
                                    <SwapVertOutlined />
                                    <div>Sort By</div>
                                </Stack>
                                <Select value={"Desc"}>
                                    <MenuItem value={"Desc"}>DESC</MenuItem>
                                </Select>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack>
                        <ProductFilter />
                        <Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default LayoutProduct(Products)