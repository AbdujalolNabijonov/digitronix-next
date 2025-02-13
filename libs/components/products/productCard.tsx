import { NoticeGroup } from "@/libs/enum/notice.enum"
import { stringSplitterHandler } from "@/libs/features/splitter"
import { Product } from "@/libs/types/product/product"
import { FavoriteOutlined, ThumbUpAltRounded, VisibilityOutlined } from "@mui/icons-material"
import { Button, IconButton, Stack } from "@mui/material"
import { useRouter } from "next/router"
import { useReactiveVar } from "@apollo/client"
import { socketVar, userVar } from "@/apollo/store"

interface propsData {
    product: Product;
    likeTargetProductHandler: any
}
const ProductCard = (props: propsData) => {
    const { product, likeTargetProductHandler } = props
    const user = useReactiveVar(userVar)
    const socket = useReactiveVar(socketVar)
    const prod_img = `${process.env.REACT_APP_API_URL}/${product.productImages[0]}`
    const router = useRouter()
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
        <Stack className="item-box" justifyContent={"space-between"} onClick={() => {
            const link = `/products/detail/?id=${product._id}`
            router.push(link, link, { scroll: false })
        }
        }>
            <div className="item-img">
                <img src={prod_img} alt="" />
            </div>
            {product?.productLabel ? (
                <>
                    <div className="tringle"></div>
                    <div className="label">{product.productLabel}</div>
                </>
            ) : null}
            <Stack className="item-body" alignItems={"center"}>
                <div className="title">
                    {product.productName}
                </div>
                {
                    ["LAPTOP", "DESKTOP"].includes(product.productCategory) ? (
                        <div className="context">
                            {stringSplitterHandler(product.productCore, "_")} / {stringSplitterHandler(product.productGraphics, "_")}
                        </div>
                    ) : null
                }
            </Stack>
            <Stack className="item-footer">
                <Stack direction={"row"} gap={"5px"} alignItems={"center"} justifyContent={"end"}>
                    <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
                        <IconButton disableRipple onClick={(e) => { e.stopPropagation() }}>
                            <VisibilityOutlined sx={{ fill: "gray" }} />
                        </IconButton>
                        <div>{product.productViews}</div>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"}>
                        <IconButton onClick={(e) => {
                            likeTargetProductHandler(e, product._id)
                            //@ts-ignore
                            if (!product?.meLiked[0]?.myFavorite) {
                                noticeHandler(product.productName, product.memberData?._id)
                            }
                        }}>
                            <ThumbUpAltRounded sx={product.meLiked && product.meLiked[0]?.myFavorite ? { fill: "#f44336" } : { fill: "gray" }} />
                        </IconButton>
                        <div>{product.productLikes}</div>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default ProductCard