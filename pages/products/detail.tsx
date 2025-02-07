import { NextPage } from "next"
import { useState } from "react"
import { useRouter } from "next/router"
import LayoutFull from "@/libs/components/layouts/LayoutFull"
import { Avatar, Box, Button, Divider, IconButton, Pagination, Rating, Stack, } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper as SwiperType } from "swiper"
import { FreeMode, Navigation, Thumbs } from "swiper/modules"
import { AccountBoxRounded, LaunchRounded, LocalShippingRounded, PhoneAndroid, RemoveRedEyeRounded, RestartAltRounded, Star, ThumbUpAltRounded } from "@mui/icons-material"
import ProductCard from "@/libs/components/products/productCard"
import ProductSpecBoardPc from "@/libs/components/products/ProductSpecBoard"
import { Circuitry, CurrencyKrw, HandCoins, PaintBrushHousehold } from "@phosphor-icons/react"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import { GET_ALL_PRODUCTS, GET_COMMENTS, GET_PRODUCT } from "@/apollo/user/query"
import { Product } from "@/libs/types/product/product"
import { Messages, serverApi } from "@/libs/config"
import { Calendar, ClipboardText, Factory } from "phosphor-react"
import { numberSplitterHandler } from "@/libs/features/splitter"
import Zoom from 'react-medium-image-zoom'
import { CommentGroup } from "@/libs/enum/comment.enum"
import { Comment } from "@/libs/types/comment/comment"
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert"
import { CREATE_COMMENT, LIKE_TARGET_COMMENT, LIKE_TARGET_PRODUCT } from "@/apollo/user/mutation"
import { userVar } from "@/apollo/store"
import 'react-medium-image-zoom/dist/styles.css'
import moment from "moment"
import CommentWrite from "@/libs/components/others/commentWrite"
import CommentRead from "@/libs/components/others/commentRead"


const Detail: NextPage = () => {
    const router = useRouter()
    const productId = router.query.id;
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [product, setProduct] = useState<Product | null>(null)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [rating, setRating] = useState<number>(0)
    const [commentObj, setCommentObj] = useState({
        commentGroup: CommentGroup.PRODUCT,
        commentRank: 0,
        commentContent: "",
        commentTargetId: "",
    })
    const [commentSearchObj, setCommentSearchObj] = useState({
        page: 1,
        limit: 2,
        search: {
            commentTargetId: ""
        }
    })
    const [comments, setComments] = useState<Comment[]>([])
    const [totalComments, setTotalComments] = useState(0)
    const user = useReactiveVar(userVar)
    //LifeCircle

    const { refetch: getProductRefetch } = useQuery(GET_PRODUCT, {
        fetchPolicy: "cache-and-network",
        variables: {
            input: productId

        },
        notifyOnNetworkStatusChange: true,
        skip: !productId,
        onCompleted: (data) => {
            setProduct(data.getProduct)
            commentObj.commentTargetId = data.getProduct._id
            commentSearchObj.search.commentTargetId = data.getProduct._id
            setCommentSearchObj({ ...commentSearchObj })
            setCommentObj({ ...commentObj })
        },
    })

    const {
        refetch: getAllProductRefetch
    } = useQuery(GET_ALL_PRODUCTS, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        variables: {
            input: {
                page: 1,
                limit: 5,
                sort: "createdAt",
                search: {
                    productCategory: product?.productCategory
                }
            }
        },
        skip: !product?.productCategory,
        onCompleted: ({ getAllProducts }) => {
            setRelatedProducts(getAllProducts.list)
        }
    })

    const {
        refetch: getAllCommentsRefetch
    } = useQuery(GET_COMMENTS, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        skip: !product?._id,
        variables: {
            input: commentSearchObj
        },
        onCompleted: ({ getAllComments }) => {
            setComments(getAllComments.list);
            setTotalComments(getAllComments.metaCounter[0].total)
        }
    })

    const [createComment] = useMutation(CREATE_COMMENT)
    const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT)
    const [likeTargetComment] = useMutation(LIKE_TARGET_COMMENT)

    //handlers
    function contactInfo() {
        window.scrollTo(400, 650)
    }

    async function submitCommentHandler() {
        try {
            if (!user._id) throw Error(Messages.error2)
            if (!commentObj.commentContent) throw new Error(Messages.comment_err1);
            if (!rating) throw new Error(Messages.comment_err2)
            commentObj.commentRank = rating
            await createComment({ variables: { input: commentObj } })
            await sweetTopSmallSuccessAlert(Messages.success2);
            commentObj.commentRank = 0;
            commentObj.commentContent = ""
            setCommentObj({ ...commentObj })
            await getAllCommentsRefetch({ input: commentSearchObj })
        } catch (err: any) {
            await sweetErrorHandling(err)
        }
    }
    const likeTargetProductHandler = async (e: any, productId: any) => {
        try {
            e.stopPropagation()
            if (!user._id) throw new Error(Messages.error2);
            if (!productId) throw new Error(Messages.error1);
            await likeTargetProduct({ variables: { input: productId } });
            await getProductRefetch({ input: productId })
            await getAllProductRefetch({
                input: {
                    page: 1,
                    limit: 5,
                    sort: "createdAt",
                    search: {
                        productCategory: product?.productCategory
                    }
                }
            })
        } catch (err: any) {
            console.log(`Error: likeTargetProductHandler, ${err.message}`);
            await sweetErrorHandling(err)
        }
    }

    const likeTargetCommentHandler = async (e: any, commentId: string) => {
        try {
            if (!user._id) throw new Error(Messages.error2);
            if (!commentId) throw new Error(Messages.error1);
            await likeTargetComment({ variables: { input: commentId } });
            await getAllCommentsRefetch({ input: commentSearchObj })
        } catch (err: any) {
            console.log(`Error: likeTargetCommentHandler, ${err.message}`);
            await sweetErrorHandling(err)
        }
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
                                                <Zoom>
                                                    <img
                                                        alt="That Wanaka Tree, New Zealand by Laura Smetsers"
                                                        src={`${serverApi}/${image}`}
                                                        width="500"
                                                    />
                                                </Zoom>
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
                                        <Box>{totalComments} views</Box>
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
                                    <IconButton disableRipple>
                                        <RemoveRedEyeRounded sx={{ fill: "gray" }} />
                                    </IconButton>
                                    <Box>{product?.productViews}</Box>
                                </Stack>
                                <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                                    <IconButton onClick={(e) => likeTargetProductHandler(e, product?._id)}>
                                        <ThumbUpAltRounded sx={product?.meLiked && product.meLiked[0]?.myFavorite ? { fill: "#f44336" } : { fill: "gray" }} />
                                    </IconButton>
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
                                    <Box className="product-spec-desc-content">{product?.productDesc ? product?.productDesc : "No Description"}</Box>
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
                                                <Box className="spec-value">{product?.productOS ? product?.productOS : "N/N"}</Box>
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
                            {
                                comments && comments.length > 0 ? (
                                    <CommentRead
                                        comments={comments}
                                        commentSearchObj={commentSearchObj}
                                        setCommentSearchObj={setCommentSearchObj}
                                        totalComments={totalComments}
                                        likeTargetCommentHandler={likeTargetCommentHandler}
                                        getAllCommentsRefetch={getAllCommentsRefetch}
                                    />
                                ) : null
                            }
                            <CommentWrite
                                commentObj={commentObj}
                                setCommentObj={setCommentObj}
                                setRating={setRating}
                                submitCommentHandler={submitCommentHandler}
                            />
                            <Stack className="product-related">
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    className="swiper-related"
                                >
                                    {relatedProducts.map((product: Product, index: number) => (
                                        <SwiperSlide>
                                            <ProductCard product={product} key={index} likeTargetProductHandler={likeTargetProductHandler} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
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