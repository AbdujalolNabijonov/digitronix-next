import { ProductList } from "@/libs/components/admin/products/productList"
import LayoutAdmin from "@/libs/components/layouts/LayoutAdmin"
import { ProductsInquiryByAdmin, ProductStatus } from "@/libs/types/product/product.input"
import { CancelRounded } from "@mui/icons-material"
import { Box, MenuItem, OutlinedInput, Select, Stack, TablePagination } from "@mui/material"
import { NextPage } from "next"
import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { GET_ALL_PRODUCTS_BY_ADMIN } from "@/apollo/admin/query"
import { Product } from "@/libs/types/product/product"
import { ProductCategory } from "@/libs/enum/product.enum"
import { UPDATE_PRODUCT_BY_ADMIN } from "@/apollo/admin/mutation"
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert"

const Products: NextPage = ({ initialProps, ...props }: any) => {
    //Initializations
    const [anchorEl, setAnchorEl] = useState<HTMLElement[] | []>([])
    const [productsInquiry, setProductsInquiry] = useState<ProductsInquiryByAdmin>(initialProps)
    const [value, setValue] = useState<string>('ALL')
    const [products, setProducts] = useState<Product[]>([])
    const [totalProducts, setTotalProducts] = useState<number>(0)

    //Apollo Request
    const {
        loading: getAllProductsLoading,
        data: getAllProductsData,
        error: getAllPrproductsError,
        refetch: getAllProductsRefetch
    } = useQuery(GET_ALL_PRODUCTS_BY_ADMIN, {
        fetchPolicy: "cache-and-network",
        variables: { input: productsInquiry },
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: any) => {
            setProducts(data.getAllProductsByAdmin.list);
            setTotalProducts(data.getAllProductsByAdmin.metaCounter[0].total ?? 0)
        }
    })

    const [updateProductByAdmin] = useMutation(UPDATE_PRODUCT_BY_ADMIN)

    //Handlers
    const changePageHandler = async (event: unknown, newPage: number) => {
        productsInquiry.page = newPage + 1;
        setProductsInquiry({ ...productsInquiry });
    };

    const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        productsInquiry.limit = parseInt(event.target.value, 10);
        productsInquiry.page = 1;
        setProductsInquiry({ ...productsInquiry });
    };
    const menuIconClickHandler = (e: any, index: number) => {
        const tempAnchor = anchorEl.slice();
        tempAnchor[index] = e.currentTarget;
        setAnchorEl(tempAnchor);
    };

    const menuIconCloseHandler = () => {
        setAnchorEl([]);
    };

    //Apollo related Handlers
    const handleSearchStatus = async (status: any) => {
        if (status !== "ALL") {
            setProductsInquiry({ ...productsInquiry, search: { ...productsInquiry.search, productStatus: status } })
        } else {
            delete productsInquiry.search.productStatus;
            setProductsInquiry({ ...productsInquiry })
        }
        await getAllProductsRefetch(productsInquiry)
    }

    const textHandler = async (text: string) => {
        setProductsInquiry({ ...productsInquiry, search: { ...productsInquiry.search, text } });
    }

    async function handleSearchCategory(category: string) {
        if (category !== "ALL") {
            setProductsInquiry({ ...productsInquiry, search: { ...productsInquiry.search, productCategory: category } })
        } else {
            delete productsInquiry.search.productCategory;
            setProductsInquiry({ ...productsInquiry })
        }
        await getAllProductsRefetch(productsInquiry)
        setValue(category)
    }

    const updateProductHandler = async (updateData: any) => {
        try {
            await updateProductByAdmin({ variables: { input: updateData } });
            menuIconCloseHandler();
            await getAllProductsRefetch({ input: productsInquiry })
            sweetTopSmallSuccessAlert("Successfully changed")
        } catch (err: any) {
            sweetErrorHandling(err).then();
        }
    };
    return (
        <>
            <Stack className="admin-user" >
                <Box className="title">
                    Products
                </Box>
                <Stack>
                    <Stack className="search-panel">
                        <Stack className="status" direction={"row"} gap={"10px"}>
                            <Box className={!productsInquiry?.search?.productStatus ? 'on' : ''} onClick={() => handleSearchStatus("ALL")}>ALL</Box>
                            <Box className={productsInquiry?.search?.productStatus === ProductStatus.ACTIVE ? 'on' : ''} onClick={() => handleSearchStatus(ProductStatus.ACTIVE)}>Active</Box>
                            <Box className={productsInquiry?.search?.productStatus === ProductStatus.SOLD ? 'on' : ''} onClick={() => handleSearchStatus(ProductStatus.SOLD)}>Sold</Box>
                            <Box className={productsInquiry?.search?.productStatus === ProductStatus.DELETE ? 'on' : ''} onClick={() => handleSearchStatus(ProductStatus.DELETE)}>Delete</Box>
                        </Stack>
                        <Stack className="search-area" direction={"row"} alignItems={"center"}>
                            <OutlinedInput
                                value={productsInquiry.search.text}
                                onChange={(e: any) => textHandler(e.target.value)}
                                sx={{ width: '100%' }}
                                className={'search'}
                                placeholder="Search user name"
                                endAdornment={
                                    <>
                                        {productsInquiry.search.text && (
                                            <CancelRounded
                                                style={{ cursor: 'pointer' }}
                                                onClick={async () => {
                                                    setProductsInquiry({
                                                        ...productsInquiry,
                                                        search: {
                                                            ...productsInquiry?.search,
                                                            text: '',
                                                        },
                                                    });
                                                    await getAllProductsRefetch({ input: productsInquiry })
                                                }}
                                            />
                                        )}
                                    </>
                                }
                            />
                            <Select sx={{ width: '160px', ml: '20px' }} value={value}>
                                <MenuItem value={"ALL"} onClick={() => handleSearchCategory('ALL')}>
                                    All
                                </MenuItem>
                                {
                                    Object.values(ProductCategory).map((category: string) => (
                                        <MenuItem value={category} onClick={() => handleSearchCategory(category)}>
                                            {category}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Stack>
                    </Stack>
                    <Box className="table-list">
                        <ProductList
                            products={products}
                            anchorEl={anchorEl}
                            menuIconClickHandler={menuIconClickHandler}
                            menuIconCloseHandler={menuIconCloseHandler}
                            updateProductHandler={updateProductHandler}
                        />
                        <TablePagination
                            style={{ color: "white" }}
                            rowsPerPageOptions={[10, 20, 40, 60]}
                            component="div"
                            count={totalProducts}
                            rowsPerPage={productsInquiry?.limit}
                            page={productsInquiry?.page - 1}
                            onPageChange={changePageHandler}
                            onRowsPerPageChange={changeRowsPerPageHandler}
                        />
                    </Box>
                </Stack>
            </Stack>
        </>
    )
}

Products.defaultProps = {
    initialProps: {
        limit: 10,
        page: 1,
        sort: "createdAt",
        search: {}
    }
}

export default LayoutAdmin(Products)