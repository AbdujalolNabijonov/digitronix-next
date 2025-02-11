import { useEffect, useState } from "react"
import LayoutBasic from "@/libs/components/layouts/LayoutBasic"
import ProductCard from "@/libs/components/products/productCard"
import { Product } from "@/libs/types/product/product"
import { Box, Divider, IconButton, Pagination, Stack } from "@mui/material"
import { Devices, Mailbox } from "@phosphor-icons/react"
import { useRouter } from "next/router"
import { MapPin, Phone } from "phosphor-react"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import { GET_ALL_PRODUCTS, GET_COMMENTS, GET_MEMBER } from "@/apollo/user/query"
import { ErrorOutline, RemoveRedEyeRounded, ThumbUpAltRounded } from "@mui/icons-material"
import { Member } from "@/libs/types/member/member"
import { Comment, CommentObj } from "@/libs/types/comment/comment"
import CommentRead from "@/libs/components/others/commentRead"
import CommentWrite from "@/libs/components/others/commentWrite"
import { CommentGroup } from "@/libs/enum/comment.enum"
import { CREATE_COMMENT, LIKE_TARGET_COMMENT, LIKE_TARGET_MEMBER, LIKE_TARGET_PRODUCT } from "@/apollo/user/mutation"
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert"
import { userVar } from "@/apollo/store"
import { Messages, serverApi } from "@/libs/config"

const Detail = (props: any) => {
    const router = useRouter()
    const memberId = router.query.id
    const user = useReactiveVar(userVar)
    const [member, setMember] = useState<Member>()
    const [products, setProducts] = useState<Product[]>([])
    const [comments, setComments] = useState<Comment[]>([])
    const [totalProducts, setTotalProducts] = useState<number>(0)
    const [rating, setRating] = useState<number>(0)
    const [commentObj, setCommentObj] = useState<CommentObj>({
        commentGroup: CommentGroup.MEMBER,
        commentRank: 0,
        commentContent: "",
        commentTargetId: "",
    })
    const [searchObj, setSearchObj] = useState({
        page: 1,
        limit: 6,
        sort: "createdAt",
        search: {
            memberId: ""
        }
    })
    const [searchCommentObj, setSearchCommentObj] = useState({
        page: 1,
        limit: 3,
        sort: "createdAt",
        search: {
            commentTargetId: ""
        }
    })


    const { refetch: getMemberRefetch } = useQuery(GET_MEMBER, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        skip: !memberId,
        variables: { input: memberId },
        onCompleted: (data) => {
            setMember(data.getMember)
            searchObj.search.memberId = data.getMember._id
            searchCommentObj.search.commentTargetId = data.getMember._id
            commentObj.commentTargetId = data.getMember._id
            setSearchObj({ ...searchObj })
            setSearchCommentObj({ ...searchCommentObj })
            setCommentObj({ ...commentObj })
        }
    })
    const { refetch: getTargetProductsRefetch } = useQuery(GET_ALL_PRODUCTS,
        {
            fetchPolicy: "cache-and-network",
            notifyOnNetworkStatusChange: true,
            variables: { input: searchObj },
            skip: !memberId,
            onCompleted: ({ getAllProducts }) => {
                setProducts(getAllProducts.list)
                setTotalProducts(getAllProducts.metaCounter[0].total)
            }
        }
    )

    const { refetch: getAllCommentsRefetch } = useQuery(GET_COMMENTS, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        variables: { input: searchCommentObj },
        skip: !searchCommentObj.search.commentTargetId,
        onCompleted: ({ getAllComments }) => {
            setComments(getAllComments.list)
        }
    })

    const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT)
    const [likeTargetComment] = useMutation(LIKE_TARGET_COMMENT)
    const [createComment] = useMutation(CREATE_COMMENT)
    const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER)

    useEffect(() => {
        getTargetProductsRefetch({ input: searchObj }).then()
    }, [searchObj])

    const likeTargetProductHandler = async (e: any, productId: string) => {
        try {
            if (!user._id) throw new Error(Messages.error2);
            if (!productId) throw new Error(Messages.error1);
            await likeTargetProduct({ variables: { input: productId } });
            await getTargetProductsRefetch({ input: searchObj });
        } catch (err: any) {
            console.log(`ERROR: likeTargetProductHandler: ${err.message}`)
            await sweetErrorHandling(err)
        }
    }
    const likeTargetCommentHandler = async (e: any, commentId: string) => {
        try {
            if (!user._id) throw new Error(Messages.error2);
            if (!commentId) throw new Error(Messages.error1);
            await likeTargetComment({ variables: { input: commentId } })
            await getAllCommentsRefetch({ input: searchCommentObj });
        } catch (err: any) {
            console.log(`ERROR: likeTargetCommentHandler: ${err.message}`)
            await sweetErrorHandling(err)
        }
    }
    const submitCommentHandler = async (e: any) => {
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
            await getAllCommentsRefetch({ input: searchCommentObj })
        } catch (err: any) {
            console.log(`ERROR: submitCommentHandler: ${err.message}`)
            await sweetErrorHandling(err)
        }
    }
    const likeTargetHandler = async (e: any, memberId: string) => {
        try {
            e.stopPropagation()
            if (user._id === memberId) throw new Error(Messages.error7)
            if (!user._id) throw new Error(Messages.error2);
            if (!memberId) throw new Error(Messages.error1);
            await likeTargetMember({ variables: { input: memberId } });
            await getMemberRefetch({ input: searchObj.search.memberId })
        } catch (err: any) {
            console.log(`ERROR: likeTargetHandler: ${err}`);
            await sweetErrorHandling(err)
        }
    }
    const paginationSelectHandler = (e: any, page: number) => {
        searchObj.page = page
        setSearchObj({ ...searchObj })
    }
    return (
        <Stack className="retailer-detail">
            <Stack className="container">
                <Stack className="retailer-body">
                    <Stack className="retailer-products">
                        {products && products.length > 0 ?
                            products.map((product: Product, index: number) => (
                                < ProductCard product={product} key={index} likeTargetProductHandler={likeTargetProductHandler} />
                            )) :
                            (
                                <Stack
                                    alignItems={"center"}
                                    style={{ margin: "200px auto", fontSize: "24px", color: "white" }}
                                    gap={"10px"}
                                >
                                    <ErrorOutline fontSize="large" />
                                    <div>No products found!</div>
                                </Stack>
                            )
                        }
                    </Stack>
                    {
                        products.length > 0 ? (
                            <Stack className="pagination-box">
                                <Pagination
                                    page={searchObj.page}
                                    count={Math.ceil(totalProducts / searchObj.limit)}
                                    variant="outlined"
                                    onChange={paginationSelectHandler}
                                    shape="rounded"
                                    color="secondary"
                                />
                            </Stack>
                        ) : null
                    }
                    {
                        comments && comments.length > 0 ? (
                            <CommentRead
                                setCommentSearchObj={setSearchCommentObj}
                                comments={comments}
                                totalComments={comments.length}
                                commentSearchObj={searchCommentObj}
                                getAllCommentsRefetch={getAllCommentsRefetch}
                                likeTargetCommentHandler={likeTargetCommentHandler}
                            />
                        ) : null
                    }
                    <CommentWrite
                        commentObj={commentObj}
                        setRating={setRating}
                        setCommentObj={setCommentObj}
                        submitCommentHandler={submitCommentHandler}
                    />
                </Stack>
                <Stack className="retailer-info">
                    <img src={member?.memberImage ? `${serverApi}/${member.memberImage}` : "/img/profile/noUser.jpg"} alt="" />
                    <Stack className="info-body">
                        <Box className="title">{member?.memberFullName ?? member?.memberNick}</Box>
                        <Stack className="contact-info">
                            <Stack className={"contact-info-item"}>
                                <Devices size={32} style={{ fill: "rgb(48, 47, 47)" }} />
                                <Box>Avaible products {member?.memberProducts}</Box>
                            </Stack>
                            <Stack className={"contact-info-item"}>
                                <MapPin size={32} style={{ fill: "rgb(48, 47, 47)" }} />
                                <Box>{member?.memberAddress ?? "No address provided"}</Box>
                            </Stack>
                            <Stack className={"contact-info-item"}>
                                <Phone size={32} style={{ fill: "rgb(48, 47, 47)" }} />
                                <Box>{member?.memberPhone ?? "No phone provided"}</Box>
                            </Stack>
                            <Stack className={"contact-info-item"}>
                                <Mailbox size={32} style={{ fill: "rgb(48, 47, 47)" }} />
                                <Box>{member?.memberEmail ?? "No email Provided"}</Box>
                            </Stack>
                        </Stack>
                        <Divider sx={{ borderBottomWidth: "2px" }} />
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"end"} fontSize={"20px"} padding={"2px"}>
                            <Stack direction={"row"} alignItems={"center"} gap={"2px"}>
                                <IconButton disableRipple >
                                    <RemoveRedEyeRounded />
                                </IconButton>
                                <Box>{member?.memberViews}</Box>
                            </Stack>
                            <Stack direction={"row"} alignItems={"center"} gap={"2px"}>
                                <IconButton onClick={(e) => { likeTargetHandler(e, member?._id as string) }}>
                                    <ThumbUpAltRounded sx={member?.meLiked && member?.meLiked[0]?.myFavorite ? { fill: "#f44336" } : { fill: "gray" }} />
                                </IconButton>
                                <Box>{member?.memberLikes}</Box>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default LayoutBasic(Detail)