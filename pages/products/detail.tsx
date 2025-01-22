import { NextPage } from "next"
import { useState } from "react"
import { useRouter } from "next/router"
import LayoutFull from "@/libs/components/layouts/LayoutFull"
import { Avatar, Box, Button, Divider, Rating, Stack, } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper as SwiperType } from "swiper"
import { FreeMode, Navigation, Thumbs } from "swiper/modules"
import { AccountBoxRounded, LaunchRounded, LocalShippingRounded, PhoneAndroid, RemoveRedEyeRounded, RestartAltRounded, ThumbUpAltRounded } from "@mui/icons-material"
import ProductCard from "@/libs/components/products/productCard"
import ProductSpecBoardPc from "@/libs/components/products/ProductSpecBoard"
import { Circuitry, CurrencyKrw, HandCoins, PaintBrushHousehold } from "@phosphor-icons/react"
import { useQuery } from "@apollo/client"
import { GET_PRODUCT } from "@/apollo/user/query"
import { Product } from "@/libs/types/product/product"
import { serverApi } from "@/libs/config"
import { Calendar, ClipboardText, Factory } from "phosphor-react"
import { numberSplitterHandler, stringSplitterHandler } from "@/libs/features/splitter"

const products: any = {
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
    const [product, setProduct] = useState<Product | null>(null)
    //LifeCircle

    const { } = useQuery(GET_PRODUCT, {
        fetchPolicy: "cache-and-network",
        variables: {
            input: productId

        },
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            setProduct(data.getProduct)
        },
    })

    //handlers
    function contactInfo() {
        window.scrollTo(400, 650)
    }
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
                                {
                                    product?.productImages.map((image: string, index: number) => {
                                        return (
                                            <SwiperSlide className="image-slide" key={index}>
                                                <img src={`${serverApi}/${image}`} />
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                            <Box className="product-description">
                                <Box className="product-title">
                                    {product?.productName}
                                </Box>
                                <Box className="product-subtitle">
                                    Exclusive Gaming Product
                                </Box>
                                <Stack>
                                    <Stack className="rating">
                                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                        <Box>172 views</Box>
                                    </Stack>
                                    <Stack className="product-shipping">
                                        <Stack>
                                            <LocalShippingRounded sx={{ fill: "#EB6753" }} />
                                            <Box>24/7 Free shiping</Box>
                                        </Stack>
                                        <Stack>
                                            <RestartAltRounded sx={{ fill: "#EB6753" }} />
                                            <Box>Ease return</Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack className="product-price" direction={"row"} alignItems={"center"} gap={"10px"}>
                                    <CurrencyKrw size={32} />
                                    <Box>{numberSplitterHandler(product?.productPrice as number, 3, ",")}</Box>
                                </Stack>
                                <Button variant="contained" onClick={contactInfo}>Contact Now</Button>
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
                                {
                                    product?.productImages.map((image: string, index: number) => {
                                        return (
                                            <SwiperSlide className="image-slide" key={index}>
                                                <img src={`${serverApi}/${image}`} />
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                            <Box className="product-feedback">
                                <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                                    <Button disableRipple endIcon={<RemoveRedEyeRounded sx={{ height: "40px", width: "40px", fill: "white" }} />}></Button>
                                    <Box>{product?.productViews}</Box>
                                </Stack>
                                <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                                    <Button endIcon={<ThumbUpAltRounded sx={{ height: "40px", width: "40px", fill: "white" }} />}></Button>
                                    <Box>{product?.productLikes}</Box>
                                </Stack>
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack className="product-main">
                        <Stack className="product-main-content">
                            {(product?.productCategory === "LAPTOP" || product?.productCategory === "DESKTOP") ? <ProductSpecBoardPc product={product} /> : null}
                            <Stack className="product-spec-detail">
                                <Stack className="product-spec-desc">
                                    <Box className="product-spec-desc-title">Product Description</Box>
                                    <Box className="product-spec-desc-content">{product?.productDesc && product?.productDesc.length ? product?.productDesc.map(ele => (
                                        <ul>
                                            <li>{ele}</li>
                                        </ul>
                                    )) : "No Description"}</Box>
                                </Stack>
                                <Stack className="product-spec-detail-sec">
                                    <Box className="product-spec-detail-title">Product Details</Box>
                                    <Stack className="product-spec-detail-content">
                                        <Box className="product-spec-detail-content-item">
                                            <Stack justifyContent={"space-between"} flexDirection={"row"}>
                                                <Stack className="spec-title" direction={"row"} gap={"10px"}>
                                                    <HandCoins size={20} />
                                                    <Box>Price:</Box>
                                                </Stack>
                                                <Box className="spec-value">{numberSplitterHandler(product?.productPrice as number, 3, ",")}<CurrencyKrw /></Box>
                                            </Stack>
                                            <Stack justifyContent={"space-between"} flexDirection={"row"}>
                                                <Stack direction={"row"} gap={"10px"} className="spec-title">
                                                    <Calendar size={20} />
                                                    <Box>Year Manifactured</Box>
                                                </Stack>
                                                <Box className="spec-value">{product?.createdAt && new Date(product?.createdAt).getFullYear()}</Box>
                                            </Stack>
                                            <Stack justifyContent={"space-between"} flexDirection={"row"}>
                                                <Stack direction={"row"} gap={"10px"} className="spec-title">
                                                    <Factory size={20} />
                                                    <Box>Manifactory</Box>
                                                </Stack>
                                                <Box className="spec-value">{product?.productBrand}</Box>
                                            </Stack>
                                        </Box>
                                        <Divider orientation="vertical" flexItem />
                                        <Box className="product-spec-detail-content-item">
                                            <Stack justifyContent={"space-between"} flexDirection={"row"}>
                                                <Stack direction={"row"} gap={"10px"} className="spec-title">
                                                    <Circuitry size={20} />
                                                    <Box>OS</Box>
                                                </Stack>
                                                <Box className="spec-value">{product?.productOS ?? "N/N"}</Box>
                                            </Stack>
                                            <Stack justifyContent={"space-between"} flexDirection={"row"}>
                                                <Stack direction={"row"} gap={"10px"} className="spec-title">
                                                    <PaintBrushHousehold size={20} />
                                                    <Box>Color</Box>
                                                </Stack>
                                                <Box className="spec-value">{product?.productColor ?? "N/N"}</Box>
                                            </Stack>
                                            <Stack justifyContent={"space-between"} flexDirection={"row"}>
                                                <Stack direction={"row"} gap={"10px"} className="spec-title">
                                                    <ClipboardText size={20} />
                                                    <Box>Serie</Box>
                                                </Stack>
                                                <Box className="spec-value">{product?.productSerie ?? "N/N"}</Box>
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
                                <textarea className="review-content" rows={10} placeholder="Write a review" ></textarea>
                                <Button variant="contained">Submit</Button>
                            </Stack>
                            <Stack direction={"row"} className="product-related" justifyContent={"space-evenly"}>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <ProductCard key={index} product={products} />
                                ))}
                            </Stack>
                        </Stack>
                        <Stack className="product-owner" id="contact">
                            <Box className="title">Get More Information</Box>
                            <Stack className="member-info">
                                <Avatar src={product?.memberData?.memberImage ? `${serverApi}/${product?.memberData?.memberImage}` : "/img/profile/defaultUser.svg"} sx={{ height: "70px", width: "70px" }} />
                                <Stack gap={"5px"}>
                                    <Stack className="member-contact">
                                        <AccountBoxRounded />
                                        <Box>{product?.memberData?.memberNick}</Box>
                                    </Stack>
                                    <Stack className="member-contact">
                                        <PhoneAndroid />
                                        <Box>{product?.memberData?.memberPhone}</Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack className="contact-name">
                                <Box>Name</Box>
                                <input type="text" placeholder="Your Name" />
                            </Stack>
                            <Stack className="contact-name">
                                <Box>Phone</Box>
                                <input type="text" placeholder="Your Name" />
                            </Stack>
                            <Stack className="contact-name">
                                <Box>Email</Box>
                                <input type="text" placeholder="Your Name" />
                            </Stack>
                            <Stack className="contact-name">
                                <Box>Message</Box>
                                <textarea placeholder="Message" rows={5}></textarea>
                            </Stack>
                            <Button variant="contained">Send Message<LaunchRounded /></Button>
                        </Stack>
                    </Stack>
                </Stack >
            </Stack >
        </>
    )
}

export default LayoutFull(Detail)