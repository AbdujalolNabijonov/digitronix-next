import LayoutProduct from "@/libs/components/layouts/LayoutProduct";
import ProductCard from "@/libs/components/products/productCard";
import ProductFilter from "@/libs/components/products/productFilter";
import { ErrorOutline, SwapVertOutlined } from "@mui/icons-material";
import {
    Box,
    MenuItem,
    Pagination,
    Select,
    Stack
} from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client"
import { GET_ALL_PRODUCTS } from "@/apollo/user/query";
import { ProductsInquiry } from "@/libs/types/product/product.input";
import { Product } from "@/libs/types/product/product";
import useDeviceDetect from "@/libs/hooks/useDeviceDetector";



const Products: NextPage = (props: any) => {
    const device = useDeviceDetect()
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsInquiry, setProductsInquiry] = useState<ProductsInquiry>(router?.query?.input ? JSON.parse(router?.query?.input as string) : null);
    const [products, setProducts] = useState<Product[]>([])
    const [totalProducts, setTotalProducts] = useState<number>(0)

    //LifeCircle
    useEffect(() => {
        const query = router?.query?.input ? JSON.parse(router?.query?.input as string) : null
        console.log(query)
        if (!query) {
            router.push("/").then();
        } else if (query && !query.search.productCategory) {
            router.push("/").then();
        } else {
            setProductsInquiry(query)
        }
    }, [router.query.input])

    //Apollo Request
    const {
        loading: getAllProductsLoading,
        data: getAllProductsData,
        error: getAllProductsError,
        refetch: getAllProductsRefetch
    } = useQuery(GET_ALL_PRODUCTS, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        variables: { input: productsInquiry },
        onCompleted: (data: any) => {
            setProducts(data?.getAllProducts.list)
            setTotalProducts(data?.getAllProducts.metaCounter[0].total ?? 0)
        }
    })

    //Handlers
    const handlePaginationChange = (e: any, newPage: number) => {
        setCurrentPage(newPage)
    }
    if (device === "mobile") {
        return <h1>PRODUCTS MOBILE</h1>;
    } else {
        return (
            <>
                <Stack className="products-page">
                    <Stack className="container">
                        <Stack className="navigator">
                            <Box className="navigator-name">
                                {productsInquiry?.search?.productCategory} {`(${totalProducts})`}
                            </Box>
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <Stack className="path-history" direction={"row"} gap={"10px"}>
                                    <Link href={"/"}> HOME </Link>
                                    <div>/</div>
                                    <a >PRODUCT</a>
                                    <div>/</div>
                                    <div>{productsInquiry?.search?.productCategory?.toUpperCase()}</div>
                                </Stack>
                                <Stack direction={"row"} className="sort">
                                    <Stack direction={"row"} alignItems={"center"}>
                                        <SwapVertOutlined />
                                        <div>Sort By</div>
                                    </Stack>
                                    <Select value={"Desc"}>
                                        <MenuItem value={"Desc"}>DESC</MenuItem>
                                    </Select>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction={"row"} gap={"20px"} className="main">
                            <ProductFilter setProductsInquiry={setProductsInquiry} productsInquiry={productsInquiry} />
                            <Stack>
                                {
                                    products && products[0] ? (
                                        <Stack
                                            className="product-list"
                                            direction={"row"}
                                            gap={"20px"}
                                            flexWrap={"wrap"}
                                            alignContent={"start"}
                                        >
                                            {
                                                products.map((product: Product) =>
                                                    <ProductCard product={product} key={product._id} />
                                                )
                                            }

                                        </Stack>
                                    ) : (
                                        <Stack
                                            alignItems={"center"}
                                            style={{ margin: "30px 0", fontSize: "24px", color: "white" }}
                                            gap={"10px"}
                                        >
                                            <ErrorOutline fontSize="large" />
                                            <div>No products found!</div>
                                        </Stack>
                                    )
                                }
                                <Stack className="pagination-box">
                                    <Pagination
                                        page={currentPage}
                                        count={productsInquiry?.page > 3 ? productsInquiry.page + 1 : Math.ceil(3)}
                                        onChange={handlePaginationChange}
                                        variant="outlined"
                                        shape="rounded"
                                        color="secondary"
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </>
        )
    }
}

export default LayoutProduct(Products)