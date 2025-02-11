import React, { useCallback, useEffect, useState } from "react"
import { Box, CircularProgress, Stack } from "@mui/material"
import { NextPage } from "next"
import { useRouter } from "next/router"

const ProductBanner = (props: any) => {
    //Initialization
    const router = useRouter()
    const [category, setCategory] = useState<string>("")

    //LifeCircle
    useEffect(() => {
        const queryInput = router.query.input ? JSON.parse(router.query?.input as string) : '';
        if (queryInput && queryInput.search.productCategory !== category) {
            setCategory(queryInput.search.productCategory);
        }
    }, [router])

    if (category) {
        return (
            <Box className="product-banner">
                <Box className={"vid-ads"}>
                    <video key={category} autoPlay muted loop>
                        <source src={`/vids/product/${category.toLowerCase()}.mp4`} />
                    </video>
                    <Box className="container">
                        <Stack className={"info"}>
                            <div>Product</div>
                            <div className="subtitle">{category}</div>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        )
    } else {
        return (
            <Stack
                justifyContent={"center"}
                alignItems={"center"}
                direction={"row"}
                height={"500px"}
            >
                <CircularProgress />
            </Stack>

        )
    }

}

export default ProductBanner