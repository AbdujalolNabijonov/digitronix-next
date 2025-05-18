import { Direction } from "@/libs/enum/common.enum"
import { ProductCategory, ProductSort } from "@/libs/enum/product.enum"
import { ProductsInquiry } from "@/libs/types/product/product.input"
import { ArrowBackIosNewOutlined, ArrowBackIosOutlined, ArrowForwardIosOutlined, ArrowRightAltOutlined, ErrorOutline, RemoveRedEyeRounded, ThumbUpAltRounded } from "@mui/icons-material"
import { Box, Button, CircularProgress, Divider, IconButton, Stack } from "@mui/material"
import { NextPage } from "next"
import { ArrowArcLeft, Cpu, HardDrives, Laptop, Monitor } from "phosphor-react"
import { useEffect, useState } from "react"
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import { GET_ALL_PRODUCTS } from "@/apollo/user/query"
import { Product } from "@/libs/types/product/product"
import { Messages, serverApi } from "@/libs/config"
import { useRouter } from "next/router"
import { LIKE_TARGET_PRODUCT } from "@/apollo/user/mutation"
import { sweetErrorHandling } from "@/libs/sweetAlert"
import { socketVar, userVar } from "@/apollo/store"
import { NoticeGroup } from "@/libs/enum/notice.enum"
import useDeviceDetect from "@/libs/hooks/useDeviceDetector"
import { BackgroundBoxes } from "./HomeAnima"
import { numberSplitterHandler } from "@/libs/features/splitter"
import LikeButton from "../others/LikeButton"

const SortProduct: NextPage = ({ initialProps, ...props }: any) => {
    //Initialization
    const socket = useReactiveVar(socketVar)
    const [type, setType] = useState<string>(ProductCategory.LAPTOP);
    const [sort, setSort] = useState<string>(ProductSort.LIKES)
    const [scroll, setScroll] = useState<boolean>(false)
    const [searchObj, setSearchObj] = useState<ProductsInquiry>(initialProps)
    const [targetProducts, setTargetProducts] = useState<Product[]>([])
    const router = useRouter()
    const user = useReactiveVar(userVar)
    const device = useDeviceDetect()

    //LifeCircle
    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 1000)
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const {
        refetch: getTargetProductsRefetch,
        loading: getTargetProductsLoading
    } = useQuery(GET_ALL_PRODUCTS, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        variables: { input: searchObj },
        onCompleted: (data) => {
            setTargetProducts(data.getAllProducts.list)
        }
    })

    const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT)

    //Handlers
    const handleType = async (str: string) => {
        setType(str)
        searchObj.search.productCategory = str;
        setSearchObj({ ...searchObj })
        await getTargetProductsRefetch({ input: searchObj })
    }
    const handleSort = async (str: string) => {
        setSort(str)
        searchObj.sort = str;
        setSearchObj({ ...searchObj })
        await getTargetProductsRefetch({ input: searchObj })
    }
    const handleLikeTargetProduct = async (e: any, productId: string) => {
        try {
            e.stopPropagation();
            if (!user._id) throw new Error(Messages.error2);
            if (!productId) throw new Error(Messages.error1);
            await likeTargetProduct({ variables: { input: productId } });
            await getTargetProductsRefetch({ input: searchObj })
        } catch (err: any) {
            console.log(`ERROR: handleLikeTargetProduct, ${err.message}`)
            await sweetErrorHandling(err)
        }
    }
    const noticeHandler = (productName: string, noticeTargetId: any) => {
        const messageInput = {
            event: "message",
            data: {
                event: "notice",
                noticeGroup: NoticeGroup.PRODUCT,
                noticeTitle: `Product Liked`,
                noticeTargetId: noticeTargetId,
                noticeContent: `${user.memberNick} liked product named ${productName}`
            }
        }
        socket.send(JSON.stringify(messageInput))
    }
    return (
        <>
            <Stack className="trend-products relative">
                <Box className="absolute w-full h-full z-9">
                    <BackgroundBoxes />
                </Box>
                <Box className="container relative py-6">
                    <div className="text-white font-bold text-3xl tracking-wider relative z-10 inline">Trend Products</div>
                    <div className="clear-both"></div>
                    <Stack className="mt-3" justifyContent={"space-between"} flexDirection={"row"}>
                        <Stack
                            className="control-panel"
                            direction={"row"}
                            justifyContent={"start"}
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
                        {
                            device === "mobile" ? null : (
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
                            )
                        }
                    </Stack>
                    <Stack className={"product-swiper"} >
                        <Stack className="target-products">
                            {getTargetProductsLoading ? <Box sx={{ alignSelf: "center" }}><CircularProgress size={"3rem"} /></Box> :
                                targetProducts && targetProducts.length > 0 ? (
                                    <Box className="relative">
                                        <div className="prev-navi absolute left-0 top-[40%] z-20 cursor-pointer w-[60px] h-[60px] bg-gray-200 flex justify-center items-center rounded-full hover:bg-gray-500">
                                            <ArrowBackIosOutlined />
                                        </div>
                                        <div className="next-navi absolute right-0 top-[40%] z-20 cursor-pointer w-[60px] h-[60px] bg-gray-200 flex justify-center items-center rounded-full hover:bg-gray-500">
                                            <ArrowForwardIosOutlined />
                                        </div>
                                        <Swiper
                                            slidesPerView={device == "mobile" ? 1 : 4}
                                            spaceBetween={30}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            navigation={{
                                                nextEl: ".next-navi",
                                                prevEl: ".prev-navi"
                                            }}
                                            keyboard={true}
                                            modules={[Keyboard, Navigation, Pagination]}
                                            className="swiper flex-1 relative z-20"
                                        >
                                            {targetProducts.map((product: Product, index: number) => {
                                                const product_img = `${serverApi}/${product.productImages[0]}`
                                                const product_img2 = `${serverApi}/${product.productImages[1]}`
                                                return (
                                                    <SwiperSlide key={product._id}>
                                                        <Stack
                                                            onClick={() => {
                                                                const link = `/products/detail?id=${product._id}`
                                                                router.push(link, link, { scroll: false })
                                                            }}
                                                            data-aos="fade-up"
                                                            data-aos-duration={`${3000 * index}`}
                                                            className={scroll || device === "mobile" ? "product-card aos-animate transition duration-2000" : "product-card transition duration-2000"}
                                                        >
                                                            <Stack className="card-head" alignItems={"center"}>
                                                                <img src={product_img} alt="" className="toogle-img1" />
                                                                {
                                                                    product_img2 ? (
                                                                        <img src={product_img2} alt="" className="toogle-img2" />
                                                                    ) : null
                                                                }
                                                            </Stack>
                                                            <Box>
                                                                <Stack className="card-body" gap={"5px"}>
                                                                    {product.productLabel ? (
                                                                        <Box className="text-sm text-red-400">
                                                                            {product.productLabel}
                                                                        </Box>
                                                                    ) : null}
                                                                    <Box className="font-bold text-xl">{product.productName}</Box>
                                                                    <Box className="font-bold text-md text-black-100">{numberSplitterHandler(product.productPrice, 3, ".")}₩</Box>
                                                                </Stack>
                                                                <Stack className="product-status">
                                                                    <Stack direction={"row"} gap={"5px"} alignItems={"center"}>
                                                                        <IconButton onClick={(e) => { e.stopPropagation() }} disableRipple>
                                                                            <RemoveRedEyeRounded sx={{ fill: "black" }} />
                                                                        </IconButton>
                                                                        {product.productViews}
                                                                    </Stack>
                                                                    <Stack direction={"row"} gap={"5px"} alignItems={'center'}>
                                                                        <IconButton onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleLikeTargetProduct(e, product._id)
                                                                            //@ts-ignore
                                                                            if (!product.meLiked[0]?.myFavorite) {
                                                                                noticeHandler(product.productName, product.memberData?._id)
                                                                            }
                                                                        }}>
                                                                            <LikeButton checked={product?.meLiked && product?.meLiked[0] ? true : false} />
                                                                        </IconButton>
                                                                        {product.productLikes}
                                                                    </Stack>
                                                                </Stack>
                                                            </Box>
                                                        </Stack>
                                                    </SwiperSlide>
                                                )
                                            })
                                            }
                                        </Swiper>
                                    </Box>
                                ) : (
                                    <Stack
                                        alignItems={"center"}
                                        gap={"10px"}
                                        className="relative z-20 text-white text-2xl mx-30 text-center"
                                    >
                                        <ErrorOutline fontSize="large" />
                                        <div>No products found!</div>
                                    </Stack>
                                )}
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </>
    )
}
SortProduct.defaultProps = {
    initialProps: {
        page: 1,
        limit: 6,
        direction: Direction.DESC,
        sort: "productLikes",
        search: {
            productCategory: ProductCategory.LAPTOP
        }
    }
}


export default SortProduct