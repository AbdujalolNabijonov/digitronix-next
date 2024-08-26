import { ProductCategory, ProductSort } from "@/libs/enum/product.enum"
import { Memory, SdCard } from "@mui/icons-material"
import { Box, Button, Stack } from "@mui/material"
import { NextPage } from "next"
import { ArrowSquareOut, Laptop, Monitor } from "phosphor-react"
import { useEffect, useState } from "react"
import { Keyboard, Mousewheel, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const SortProduct: NextPage = () => {
    //Initialization
    const [type, setType] = useState<string>(ProductCategory.LAPTOP);
    const [sort, setSort] = useState<string>(ProductSort.LIKES)
    const [scroll, setScroll] = useState<boolean>(false)
    const colors = ["red", "black", "gray", "yellow"]

    //LifeCircle
    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 1000)
        }
        window.addEventListener("scroll", handleScroll)
    }, [])

    //Handlers
    const handleType = (str: string) => {
        setType(str)
    }
    const handleSort = (str: string) => {
        setSort(str)
    }
    return (
        <>
            <Stack className="trend-products">
                <Box className="container">
                    <Stack className="info">
                        <div className="title">Trend Products</div>
                    </Stack>
                    <Stack className={"product-swiper"} >
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <Stack
                                className="control-panel"
                                direction={"row"}
                                gap={"20px"}
                                justifyContent={"center"}
                            >
                                <Button
                                    onClick={() => handleType(ProductCategory.LAPTOP)}
                                    className={type === ProductCategory.LAPTOP ? "active-btn" : ""}>
                                    Laptop
                                </Button>
                                <Button
                                    onClick={() => handleType(ProductCategory.DESKTOP)}
                                    className={type === ProductCategory.DESKTOP ? "active-btn" : ""}>
                                    Desktop
                                </Button>
                                <Button
                                    onClick={() => handleType(ProductCategory.GRAPHICS)}
                                    className={type === ProductCategory.GRAPHICS ? "active-btn" : ""}>
                                    Graphics
                                </Button>
                                <Button
                                    onClick={() => handleType(ProductCategory.KEYBOARD)}
                                    className={type === ProductCategory.KEYBOARD ? "active-btn" : ""}>
                                    Keyboard
                                </Button>
                                <Button
                                    onClick={() => handleType(ProductCategory.CHAIR)}
                                    className={type === ProductCategory.CHAIR ? "active-btn" : ""}>
                                    Chair
                                </Button>
                            </Stack>
                            <Stack
                                className="control-panel"
                                direction={"row"}
                                gap={"20px"}
                                justifyContent={"center"}
                            >
                                <Button
                                    onClick={() => handleSort(ProductSort.LIKES)}
                                    className={sort === ProductSort.LIKES ? "active-btn" : ""}>
                                    Trend
                                </Button>
                                <Button
                                    onClick={() => handleSort(ProductSort.VIEWS)}
                                    className={sort === ProductSort.VIEWS ? "active-btn" : ""}>
                                    Popular
                                </Button>
                                <Button
                                    onClick={() => handleSort(ProductSort.PRODUCTRANK)}
                                    className={sort === ProductSort.PRODUCTRANK ? "active-btn" : ""}>
                                    Top
                                </Button>
                            </Stack>
                        </Stack>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            keyboard={true}
                            modules={[Keyboard]}
                            className="swiper"

                        >
                            {
                                Array.from({ length: 7 }).map((ele: any, num: number) => (
                                    <SwiperSlide>
                                        <Stack data-aos="fade-up" data-aos-duration={`${3000 * num}`} className={scroll ? "product-card aos-animate" : "product-card"}>
                                            <Stack className="card-head" alignItems={"center"}>
                                                <img src="/img/products/laptop/400.png" alt="" />
                                                <Stack
                                                    direction={"row"}
                                                    gap={2}
                                                    justifyContent={"center"}
                                                    className="color-list"
                                                >
                                                    {
                                                        colors.map(colr => (
                                                            <div className="colr" title={colr} style={{ backgroundColor: colr }}></div>
                                                        ))
                                                    }
                                                </Stack>
                                            </Stack>
                                            <Stack className="card-body" gap={"5px"}>
                                                <Stack direction={"row"} gap={"3px"} alignItems={"center"} className="name">
                                                    <Laptop />
                                                    <div>MSI HD-2301</div>
                                                </Stack>
                                                <Stack direction={"row"} gap={"3px"} alignItems={"center"} className="cpu">
                                                    <Memory />
                                                    <div>Intel Core processor 14 gen</div>
                                                </Stack>
                                                <Stack direction={"row"} gap={"3px"} alignItems={"center"} className="graphics">
                                                    <img src="/img/icons/graphics-card.svg" alt="" width={"20px"} />
                                                    <div>RTX 40 Series</div>
                                                </Stack>
                                                <Stack direction={"row"} gap={"3px"} alignItems={"center"} className="display">
                                                    <Monitor />
                                                    <div>13" OR 16"</div>
                                                </Stack>
                                                <Stack direction={"row"} gap={"3px"} alignItems={"center"} className="storage">
                                                    <SdCard />
                                                    <div>2 TB</div>
                                                </Stack>
                                            </Stack>
                                            <Stack
                                                className="card-footer"
                                                alignItems={"end"}
                                            >
                                                <Button endIcon={<ArrowSquareOut size={20} />}>
                                                    Take a look closer
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </Stack>
                </Box>
            </Stack>
        </>
    )
}

export default SortProduct