import { useState } from "react";
import { Product } from "@/libs/types/product/product"
import { Box, Pagination, Stack } from "@mui/material"
import ProductCard from "../products/productCard";
import { ErrorOutline } from "@mui/icons-material";
import { Direction } from "@/libs/enum/common.enum";
import { useQuery } from "@apollo/client";
import { GET_VISITED_PRODUCTS } from "@/apollo/user/query";


const Visited = (props: any) => {
    const [products, setProducts] = useState<Product[]>([])
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [searchObj, setSearchObj] = useState({
        page: 1,
        limit: 6,
        sort: "createdAt",
        direction: Direction.ASC,
        search: {}
    })

    const { refetch: getVisitedProductsRefetch } = useQuery(GET_VISITED_PRODUCTS, {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
        variables: {
            input: searchObj
        },
        onCompleted: ({ visitedProducts }) => {
            setProducts(visitedProducts.list)
            setTotalProducts(visitedProducts.metaCounter[0].total ?? 0)
        }
    })
    const likeTargetProductHandler = () => {

    }
    const handlePaginationChange = (e: any, page: number) => {
        searchObj.page = page
        setSearchObj({ ...searchObj })
        getVisitedProductsRefetch({ input: searchObj }).then()
    }
    return (
        <Stack className="favority">
            <Stack className="favority-title">
                <Box className="title">Recently Viewed Products</Box>
                <Box className="subtitle">You can view all your visited products!</Box>
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
            <Stack alignItems={"center"} sx={{ color: "white", marginTop: "30px" }}>{totalProducts} products avaible    </Stack>
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

export default Visited