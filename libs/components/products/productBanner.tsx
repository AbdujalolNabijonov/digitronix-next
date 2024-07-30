import { Box, CircularProgress, Stack } from "@mui/material"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ProductBanner: NextPage = () => {
    //initialState
    const router = useRouter()
    const [category, setCategory] = useState<string>("")
    //LifeCircle
    useEffect(() => {
        console.log(router.query.category)
        if (router.isReady) {
            const categoryQuery = router.query.category;
            if (typeof categoryQuery === "string") {
                setCategory(categoryQuery)
            }
        }
    }, [router.query.category])

    if (category) {
        return (
            <Box className="product-banner">
                <Box className={"vid-ads"}>
                    <video autoPlay muted loop>
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