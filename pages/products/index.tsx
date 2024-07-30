import LayoutProduct from "@/libs/components/layouts/LayoutProduct";
import { Stack } from "@mui/material";
import { NextPage } from "next";

const Products: NextPage = (props: any) => {
    return (
        <>
            <Stack className="products-page">
                <h1>This is product page</h1>
            </Stack>
        </>
    )
}

export default LayoutProduct(Products)