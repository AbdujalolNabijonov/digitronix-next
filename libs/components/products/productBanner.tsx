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
        const queryCategory = router.query.category ? String(router.query.category) : '';
        if (queryCategory && queryCategory !== category) {
            setCategory(queryCategory);
        }
    }, [router.query])

    if (category) {
        return (
            <Box className="product-banner">
                <Box className={"vid-ads"}>
                    <video key={category} autoPlay muted loop>
                        <source src={`/vids/product/${category}.mp4`} />
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