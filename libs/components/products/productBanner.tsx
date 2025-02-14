import React, {  useEffect, useState } from "react"
import { Box, CircularProgress, Stack } from "@mui/material"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"


const ProductBanner = (props: any) => {
    //Initialization
    const router = useRouter()
    const [category, setCategory] = useState<string>("")
    const {t, i18n}=useTranslation("common")
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
                            <div>{t("Product")}</div>
                            <div className="subtitle">{t(category)}</div>
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