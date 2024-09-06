import { Product } from "@/libs/types/product/product"
import { FavoriteOutlined, VisibilityOutlined } from "@mui/icons-material"
import { Button, IconButton, Stack } from "@mui/material"

interface propsData {
    product: Product
}
const ProductCard = (props: propsData) => {
    const { product } = props
    const prod_img = `${process.env.REACT_APP_API_URL}/${product.productImages[0]}`
    return (
        <Stack className="item-box" >
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
                <div className="context">
                    {product.productCore}/ {product.productGraphics}
                </div>
            </Stack>
            <Stack className="item-footer">
                <Stack direction={"row"} gap={"5px"} alignItems={"center"} justifyContent={"end"}>
                    <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
                        <VisibilityOutlined sx={{ color: "white" }} />
                        <div>{product.productViews}</div>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"}>
                        <IconButton >
                            <FavoriteOutlined sx={{ color: "white" }} />
                        </IconButton>
                        <div>{product.productLikes}</div>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default ProductCard