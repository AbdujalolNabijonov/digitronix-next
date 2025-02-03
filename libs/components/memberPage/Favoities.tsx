import { Box, Pagination, Stack } from "@mui/material"
import ProductCard from "../products/productCard"
import { Product } from "@/libs/types/product/product"
import { ErrorOutline } from "@mui/icons-material"
import { useQuery } from "@apollo/client"
import { useState } from "react"
import { GET_FAVORITY_PRODUCTS } from "@/apollo/user/query"
import { useRouter } from "next/router"
import { Direction } from "@/libs/enum/common.enum"

const Favorities = (props: any) => {
    const [products, setProducts] = useState<Product[]>([])
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [searchObj, setSearchObj] = useState({
        page: 1,
        limit: 6,
        sort: "createdAt",
        direction: Direction.ASC,
        search: {}
    })

    const { refetch: getFavorityProductsRefetch } = useQuery(GET_FAVORITY_PRODUCTS, {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
        variables: {
            input: searchObj
        },
        onCompleted: ({ favorityProducts }) => {
            setProducts(favorityProducts.list)
            setTotalProducts(favorityProducts.metaCounter[0].total ?? 0)
        }
    })
    const likeTargetProductHandler = () => {

    }
    const handlePaginationChange = (e: any, page: number) => {
        searchObj.page = page;
        setSearchObj({ ...searchObj })
        getFavorityProductsRefetch({ input: searchObj }).then()
    }
    return (
        <Stack className="favority">
            <Stack className="favority-title">
                <Box className="title">My Favorities</Box>
                <Box className="subtitle">You can view all you liked products!</Box>
            </Stack>
            <Stack className="favority-products">
                {
                    (products && products.length > 0) ? products.map((product: Product) => (
                        <ProductCard product={product} likeTargetProductHandler={likeTargetProductHandler} />
                    )) : (
                        <Stack
                            alignItems={"center"}
                            style={{ width: "100%", margin: "30px 0", fontSize: "24px", color: "white" }}
                            gap={"10px"}
                        >
                            <ErrorOutline fontSize="large" />
                            <div>No products found!</div>
                        </Stack>
                    )
                }
            </Stack>
            <Stack alignItems={"center"} sx={{ color: "white", marginTop: "30px" }}>{totalProducts} products avaible</Stack>
            <Stack className="pagination-box">
                <Pagination
                    page={searchObj.page}
                    count={Math.ceil(totalProducts / searchObj.limit)}
                    onChange={handlePaginationChange}
                    variant="outlined"
                    shape="rounded"
                    color="secondary"
                />
            </Stack>
        </Stack>
    )
}

export default Favorities