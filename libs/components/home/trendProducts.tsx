import { ProductType } from "@/libs/enum/product.enum"
import { Memory, SdCard } from "@mui/icons-material"
import { Box, Button, Stack } from "@mui/material"
import { NextPage } from "next"
import { ArrowSquareOut, Laptop, Monitor } from "phosphor-react"
import { useState } from "react"
import { Keyboard, Mousewheel, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const TrendProduct: NextPage = () => {
    //Initialization
    const [type, setType] = useState<string>(ProductType.LAPTOP)
    const colors = ["red", "black", "gray", "yellow"]
    //Handlers
    const handleType = (str: string) => {
        setType(str)
    }
    return (
        <>
            <Stack className="trend-products">
                <Box className="container">
                    <Stack className="info">
                        <div className="title">Trend Products</div>
                    </Stack>
                    <Stack className={"product-swiper"}>
                        <Stack
                            className="control-panel"
                            direction={"row"}
                            gap={"20px"}
                            justifyContent={"center"}
                        >
                            <Button
                                onClick={() => handleType(ProductType.LAPTOP)}
                                className={type === ProductType.LAPTOP ? "active-btn" : ""}>
                                Laptop
                            </Button>
                            <Button
                                onClick={() => handleType(ProductType.DESKTOP)}
                                className={type === ProductType.DESKTOP ? "active-btn" : ""}>
                                Desktop
                            </Button>
                            <Button
                                onClick={() => handleType(ProductType.GRAPHICS)}
                                className={type === ProductType.GRAPHICS ? "active-btn" : ""}>
                                Graphics
                            </Button>
                            <Button
                                onClick={() => handleType(ProductType.PERIPHERAL)}
                                className={type === ProductType.PERIPHERAL ? "active-btn" : ""}>
                                Peripheral
                            </Button>
                            <Button
                                onClick={() => handleType(ProductType.CHAIR)}
                                className={type === ProductType.CHAIR ? "active-btn" : ""}>
                                Chair
                            </Button>
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
                                Array.from({ length: 7 }).map((ele) => (
                                    <SwiperSlide>
                                        <Stack className="product-card">
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

export default TrendProduct