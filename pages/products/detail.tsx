import { NextPage } from "next"
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import { GET_PRODUCT } from "@/apollo/user/query"
import LayoutFull from "@/libs/components/layouts/LayoutFull"
import { Box, Button, Stack } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper as SwiperType } from "swiper"
import { useState } from "react"
import { FreeMode, Navigation, Thumbs } from "swiper/modules"
import { FavoriteBorderOutlined, MemoryOutlined, MemoryRounded, RemoveRedEyeRounded, StorageRounded } from "@mui/icons-material"
import ProductCard from "@/libs/components/products/productCard"
import { Product } from "@/libs/types/product/product"
const product:any = {
    _id: "66ca5f3e58983c128c6ad2b3",
    memberId: "66ca561318af3640a59ebc47",
    productName: "MAG Infinite S3",
    productPrice: 1230000,
    productColor: "BLACK",
    productMemory: 24,
    productStorage: 2048,
    productImages: ["uploads/product/cd5a4e87-cb16-4d53-ad5b-1b7bf6d683c4.png", "uploads/product/cd5a4e87-cb16-4d53-ad5b-1b7bf6d683c4.png"],
    productDesc: [],
    productViews: 0,
    productLikes: 0,
    productComments: 0,
    productRank: 0,
};

const Detail: NextPage = () => {
    const router = useRouter()
    const productId = router.query.id;
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    return (
        <>
            <Stack className="product-detail">
                <Stack className="container">
                    <Stack className="product">
                        <Stack className="product-info">
                            <Swiper
                                spaceBetween={10}
                                navigation={true}
                                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="product-image"
                            >
                                <SwiperSlide className="image-slide">
                                    <img src="/img/products/gaming-2.jpeg" />
                                </SwiperSlide>
                                <SwiperSlide className="image-slide">
                                    <img src="/img/products/gaming-2.jpeg" />
                                </SwiperSlide>
                                <SwiperSlide className="image-slide">
                                    <img src="/img/products/gaming-2.jpeg" />
                                </SwiperSlide>
                                <SwiperSlide className="image-slide">
                                    <img src="/img/products/gaming-2.jpeg" />
                                </SwiperSlide>
                            </Swiper>
                            <Box className="product-description">
                                <Box className="product-title">
                                    MSI GF65 Thin 9SEXR-250VN
                                </Box>
                                <Box className="product-subtitle">
                                    Exclusive Gaming Laptop
                                </Box>
                                <ul>
                                    <li>Gaming Laptop</li>
                                    <li>Gaming Laptop</li>
                                    <li>Gaming Laptop</li>
                                    <li>Gaming Laptop</li>
                                </ul>
                                <Box className="product-price">
                                    Won 3.000.000
                                </Box>
                                <Button variant="contained">Contact Now</Button>
                            </Box>
                        </Stack>
                        <Stack direction={"row"} alignItems={"end"} justifyContent={"space-between"}>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="product-images"
                            >
                                <SwiperSlide className="image-slide">
                                    <img src="/img/products/gaming-2.jpeg" />
                                </SwiperSlide>
                                <SwiperSlide className="image-slide">
                                    <img src="/img/products/gaming-2.jpeg" />
                                </SwiperSlide>
                                <SwiperSlide className="image-slide">
                                    <img src="/img/products/gaming-2.jpeg" />
                                </SwiperSlide>
                                <SwiperSlide className="image-slide">
                                    <img src="/img/products/gaming-2.jpeg" />
                                </SwiperSlide>
                            </Swiper>
                            <Box className="product-feedback">
                                <Box>
                                    <RemoveRedEyeRounded sx={{ fontSize: "40px" }} />
                                    {"6"}
                                </Box>
                                <Box>
                                    <FavoriteBorderOutlined sx={{ fontSize: "40px" }} />
                                    {"2"}
                                </Box>
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack className="product-main">
                        <Stack className="product-main-content">
                            <Stack className="product-spec-board">
                                <Stack className="product-spec-item">
                                    <Box className="product-spec-item-icon">
                                        <MemoryRounded sx={{ fontSize: "40px" }} />
                                    </Box>
                                    <Box>Intel I7</Box>
                                </Stack>
                                <Stack className="product-spec-item">
                                    <Box className="product-spec-item-icon">
                                        <img src="/img/icons/graphics-card-white.svg" alt="" />
                                    </Box>
                                    <Box>RTX 4090</Box>
                                </Stack>
                                <Stack className="product-spec-item">
                                    <Box className="product-spec-item-icon">
                                        <StorageRounded sx={{ fontSize: "40px" }} />
                                    </Box>
                                    <Box>SSD 226Gb</Box>
                                </Stack>
                                <Stack className="product-spec-item">
                                    <Box className="product-spec-item-icon">
                                        <img src="/img/icons/ram.png" width={"40px"} alt="" />
                                    </Box>
                                    <Box>7GB</Box>
                                </Stack>
                            </Stack>
                            <Stack className="product-spec-detail">
                                <Stack className="product-spec-desc">
                                    <Box className="product-spec-desc-title">Product Description</Box>
                                    <Box className="product-spec-desc-content">No Description</Box>
                                </Stack>
                                <Stack className="product-spec-detail-sec">
                                    <Box className="product-spec-detail-title">Product Details</Box>
                                    <Stack className="product-spec-detail-content">
                                        <Box>
                                            <Stack justifyContent={"space-between"} flexDirection={"row"}>
                                                <Box className="spec-title">Price</Box>
                                                <Box className="spec-value">3.000.000</Box>
                                            </Stack>
                                            <Stack justifyContent={"space-between"} flexDirection={"row"}>
                                                <Box className="spec-title">Year Manifactured</Box>
                                                <Box className="spec-value">2025</Box>
                                            </Stack>
                                            <Stack justifyContent={"space-between"} flexDirection={"row"}>
                                                <Box className="spec-title">Manifacturer</Box>
                                                <Box className="spec-value">Asus</Box>
                                            </Stack>
                                        </Box>
                                        <Box>
                                            <Stack justifyContent={"space-between"} flexDirection={"row"}>
                                                <Box className="spec-title">OS</Box>
                                                <Box className="spec-value">Windows 11</Box>
                                            </Stack>
                                            <Stack justifyContent={"space-between"} flexDirection={"row"}>
                                                <Box className="spec-title">USB</Box>
                                                <Box className="spec-value">3.0 Turbo</Box>
                                            </Stack>
                                            <Stack justifyContent={"space-between"} flexDirection={"row"}>
                                                <Box className="spec-title">AUX</Box>
                                                <Box className="spec-value">3.1</Box>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack className="product-address">
                                <Box className="title">Address</Box>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57594.66061049844!2d126.9045532639416!3d35.178808128837545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3571892301f5a7af%3A0x5f4d2ed0125f548!2sGwangju!5e0!3m2!1sen!2skr!4v1737363106815!5m2!1sen!2skr"
                                    loading="lazy">
                                </iframe>
                            </Stack>
                            <Stack className="product-review">
                                <Box className="title">Leave Review</Box>
                                <Box className="subtitle">Review</Box>
                                <textarea className="review-content" rows={10} placeholder="Write a review"></textarea>
                                <Button variant="contained">Submit</Button>
                            </Stack>
                            <Stack direction={"row"} className="product-related" gap={"20px"}>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <ProductCard key={index} product={product} />
                                ))}
                            </Stack>
                        </Stack>
                        <Stack className="product-owner">

                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default LayoutFull(Detail)