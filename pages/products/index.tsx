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
import { Direction } from "@/libs/enum/common.enum";



const Products: NextPage = ({ initialProps, ...props }: any) => {
    const device = useDeviceDetect()
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsInquiry, setProductsInquiry] = useState<ProductsInquiry>(initialProps);
    const [products, setProducts] = useState<Product[]>([])
    const [totalProducts, setTotalProducts] = useState<number>(0)
    const [value, setValue] = useState<string>("new")


    //Apollo Request
    const {
        refetch: getAllProductsRefetch
    } = useQuery(GET_ALL_PRODUCTS, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        variables: { input: productsInquiry },
        onCompleted: (data: any) => {
            setProducts(data?.getAllProducts ? data?.getAllProducts.list : [])
            setTotalProducts(data?.getAllProducts.metaCounter[0].total ?? 0)
        }
    })
    useEffect(() => {
        if (router.query.input) {
            const query = JSON.parse(router.query.input as string)
            setProductsInquiry(query);
            getAllProductsRefetch({ input: query }).then();
        }
    }, [router])

    //Handlers
    const handlePaginationChange = (e: any, newPage: number) => {
        setCurrentPage(newPage)
        setProductsInquiry({ ...productsInquiry, page: newPage })
    }
    const handleSortChange = (e: any) => {
        const value = e.target.value;
        setValue(value)
        switch (value) {
            case "old":
                const jsonObj = JSON.stringify({ ...productsInquiry, sort: "createdAt", direction: Direction.ASC })
                router.push(`/products?input=${jsonObj}`, `/products?input=${jsonObj}`, { shallow: true })
                setProductsInquiry({ ...productsInquiry, sort: "createdAt", direction: Direction.ASC })
                break;
            case "new":
                const jsonObj2 = JSON.stringify({ ...productsInquiry, sort: "createdAt", direction: Direction.DESC })
                router.push(`/products?input=${jsonObj2}`, `/products?input=${jsonObj2}`, { shallow: true })
                setProductsInquiry({ ...productsInquiry, sort: "createdAt", direction: Direction.DESC })
                break;
            default:
                const jsonObj3 = JSON.stringify({ ...productsInquiry, sort: value })
                router.push(`/products?input=${jsonObj3}`, `/products?input=${jsonObj3}`, { shallow: true })
                setProductsInquiry({ ...productsInquiry, sort: value })
                break;
        }
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
                                    <Select value={productsInquiry.sort} onChange={handleSortChange}>
                                        <MenuItem value={"createdAt"}>New</MenuItem>
                                        <MenuItem value={"productViews"}>Popular</MenuItem>
                                        <MenuItem value={"productLikes"}>Trend</MenuItem>
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
                                        count={Math.ceil(totalProducts / productsInquiry.limit)}
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
Products.defaultProps = {
    initialProps: {
        page: 1,
        limit: 9,
        direction: Direction.DESC,
        sort: "createdAt",
        search: {
        }
    }
}

export default LayoutProduct(Products)