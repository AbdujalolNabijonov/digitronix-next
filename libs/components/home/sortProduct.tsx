import { Direction } from "@/libs/enum/common.enum"
import { ProductCategory, ProductSort } from "@/libs/enum/product.enum"
import { ProductsInquiry } from "@/libs/types/product/product.input"
import { Memory, RemoveRedEyeRounded, SdCard, ThumbUpAltRounded } from "@mui/icons-material"
import { Box, Button, CircularProgress, Divider, Stack } from "@mui/material"
import { NextPage } from "next"
import { ArrowSquareOut, Cpu, HardDrive, HardDrives, Laptop, Monitor } from "phosphor-react"
import { useEffect, useState } from "react"
import { Keyboard, Mousewheel, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useQuery } from "@apollo/client"
import { GET_ALL_PRODUCTS } from "@/apollo/user/query"
import { Product } from "@/libs/types/product/product"
import { serverApi } from "@/libs/config"
import { GraphicsCard } from "@phosphor-icons/react"
import { useRouter } from "next/router"

const SortProduct: NextPage = ({ initialProps, ...props }: any) => {
    //Initialization
    const [type, setType] = useState<string>(ProductCategory.LAPTOP);
    const [sort, setSort] = useState<string>(ProductSort.LIKES)
    const [scroll, setScroll] = useState<boolean>(false)
    const [searchObj, setSearchObj] = useState<ProductsInquiry>(initialProps)
    const [targetProducts, setTargetProducts] = useState<Product[]>([])
    const router = useRouter()

    //LifeCircle
    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 1000)
        }
        window.addEventListener("scroll", handleScroll)
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
                        <Stack className="target-products">
                            {getTargetProductsLoading ? <Box sx={{ alignSelf: "center" }}><CircularProgress size={"3rem"} /></Box> : targetProducts ? (
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    keyboard={true}
                                    modules={[Keyboard, Navigation]}
                                    className="swiper"
                                >
                                    {targetProducts.map((product: Product, index: number) => {
                                        const product_img = `${serverApi}/${product.productImages[0]}`
                                        return (
                                            <SwiperSlide key={product._id} onClick={() => {
                                                const link = `/products/detail?id=${product._id}`
                                                router.push(link, link, { scroll: false })
                                            }}>
                                                <Stack data-aos="fade-up" data-aos-duration={`${3000 * index}`} className={scroll ? "product-card aos-animate" : "product-card"}>
                                                    <Stack className="card-head" alignItems={"center"}>
                                                        <img src={product_img} alt="" />
                                                    </Stack>
                                                    <Box>
                                                        <Divider variant="middle" sx={{ borderColor: "gray" }} />
                                                        <Stack className="card-body" gap={"5px"}>
                                                            <Stack direction={"row"} gap={"10px"} alignItems={"center"} className="name">
                                                                <Laptop size={30} />
                                                                <div>{product.productName}</div>
                                                            </Stack>
                                                            {
                                                                product.productCategory === ProductCategory.DESKTOP || product.productCategory === ProductCategory.LAPTOP ? (
                                                                    <>
                                                                        <Stack direction={"row"} gap={"10px"} alignItems={"center"} className="cpu">
                                                                            <Cpu size={30} />
                                                                            <div>{product.productCore}</div>
                                                                        </Stack>
                                                                        <Stack direction={"row"} gap={"10px"} alignItems={"center"} className="graphics">
                                                                            <GraphicsCard size={30} />
                                                                            <div>{product.productGraphics}</div>
                                                                        </Stack>
                                                                    </>
                                                                ) : null
                                                            }
                                                            {
                                                                product.productDisplay ? (
                                                                    <Stack direction={"row"} gap={"10px"} alignItems={"center"} className="display">
                                                                        <Monitor size={30} />
                                                                        <div>{product.productDisplay} inch</div>
                                                                    </Stack>
                                                                ) : null
                                                            }
                                                            {
                                                                product.productCategory === ProductCategory.KEYBOARD || product.productCategory === ProductCategory.CHAIR ? null : (
                                                                    <Stack direction={"row"} gap={"10px"} alignItems={"center"} className="storage">
                                                                        <HardDrives size={30} />
                                                                        <div>{product.productStorage} GB</div>
                                                                    </Stack>
                                                                )
                                                            }
                                                        </Stack>
                                                        <Divider sx={{ borderColor: "gray" }} variant="middle" />
                                                        <Stack className="product-status">
                                                            <Stack direction={"row"} gap={"5px"} alignItems={"center"}>
                                                                <RemoveRedEyeRounded />
                                                                {product.productViews}
                                                            </Stack>
                                                            <Stack direction={"row"} gap={"5px"} alignItems={'center'}>
                                                                <Button endIcon={<ThumbUpAltRounded />}></Button>
                                                                {product.productViews}
                                                            </Stack>
                                                        </Stack>
                                                    </Box>
                                                </Stack>
                                            </SwiperSlide>
                                        )
                                    })
                                    }
                                </Swiper>
                            ) : "no"}
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