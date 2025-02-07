import { useEffect, useState } from "react"
import TabContext from "@mui/lab/TabContext"
import TabPanel from "@mui/lab/TabPanel"
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import { Box, Button, Fab, IconButton, Menu, MenuItem, Pagination, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { numberSplitterHandler } from "@/libs/features/splitter";
import moment from "moment";
import { Pen, Trash } from "phosphor-react";
import { Product } from "@/libs/types/product/product";
import { ErrorOutline } from "@mui/icons-material";
import { useReactiveVar, useQuery, useMutation } from "@apollo/client"
import { userVar } from "@/apollo/store";
import { GET_ALL_PRODUCTS } from "@/apollo/user/query";
import { serverApi } from "@/libs/config";
import { ProductStatus } from "@/libs/enum/product.enum";
import { UPDATE_PRODUCT } from "@/apollo/user/mutation";
import { sweetConfirmAlert, sweetErrorHandling, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert";
import { useRouter } from "next/router";


const AllProducts = () => {
    const router = useRouter()
    const [value, setValue] = useState<string>("1")
    const [anchor, setAnchor] = useState(null);
    const user = useReactiveVar(userVar)
    const [productId, setProductId] = useState("")
    const [totalProducts, setTotalProducts] = useState<number>(0)
    const [products, setProducts] = useState<Product[]>([])
    const [rebuild, setRebuild] = useState(new Date())
    const [searchObj, setSearchObj] = useState({
        page: 1,
        limit: 5,
        search: {}
    })

    const { refetch: refetchProductActive } = useQuery(GET_ALL_PRODUCTS, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        skip: value === "2",
        variables: {
            input: {
                ...searchObj,
                search: {
                    memberId: user._id,
                    productStatus: ProductStatus.ACTIVE
                }
            }
        },
        onCompleted: ({ getAllProducts }) => {
            setProducts(getAllProducts.list)
            setTotalProducts(getAllProducts.metaCounter[0].total || 0)
        }
    })
    const { refetch: refetchProductSold } = useQuery(GET_ALL_PRODUCTS, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
        skip: value === "1",
        variables: {
            input: {
                ...searchObj,
                search: {
                    memberId: user._id,
                    productStatus: ProductStatus.SOLD
                }
            }
        },
        onCompleted: ({ getAllProducts }) => {
            setProducts(getAllProducts.list)
            setTotalProducts(getAllProducts.metaCounter[0].total || 0)
        }
    })

    const [updateProduct] = useMutation(UPDATE_PRODUCT)

    useEffect(() => {
        if (value === "1") {
            refetchProductActive({ input: { ...searchObj, search: { memberId: user._id, productStatus: ProductStatus.ACTIVE } } }).then();
        } else {
            refetchProductSold({ input: { ...searchObj, search: { memberId: user._id, productStatus: ProductStatus.SOLD } } }).then();
        }
    }, [value, searchObj, rebuild])

    const handleChange = (e: any, tabIndex: string) => {
        setValue(tabIndex)
    }
    const toggleStatusHandler = (e: any, productId: string) => {
        setProductId(productId)
        setAnchor(e.currentTarget)
    }

    const handlePaginationChange = (e: any, page: number) => {
        searchObj.page = page;
        setSearchObj({ ...searchObj })
    }

    const statusChangeHandler = async (e: any, status: string, productId?: string) => {
        try {
            setAnchor(null)
            const updateInput = {
                _id: productId,
                productStatus: status
            }
            const agreement = await sweetConfirmAlert("Are you agree to change product status?");
            if (agreement) {
                await updateProduct({ variables: { input: updateInput } });
                await sweetTopSmallSuccessAlert("Successfully changed!")
                setRebuild(new Date())
            }
        } catch (err: any) {
            console.log(`Error: statusChangeHandler, ${err.message}`)
            await sweetErrorHandling(err)
        }
    }
    return (
        <Stack className="all-products">
            <Stack className="all-products-head">
                <Box className={"title"}>My Products</Box>
                <Box className={"subtitle"}>You can find out more about your products!</Box>
            </Stack>
            <Stack className="all-products-body">
                <TabContext value={value}>
                    <Stack className="tab-list">
                        <TabList onChange={handleChange}>
                            <Tab label="On Sale" value={"1"} className="tab-item" />
                            <Tab label="On Sold" value={"2"} className="tab-item" />
                        </TabList>
                    </Stack>
                    <TabPanel value={value}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="tab-item" align="center">
                                        No
                                    </TableCell>
                                    <TableCell className="tab-item" align="center">
                                        Image
                                    </TableCell>
                                    <TableCell className="tab-item" align="center">
                                        Title
                                    </TableCell>
                                    <TableCell className="tab-item" align="center">
                                        Date Publishing
                                    </TableCell>
                                    <TableCell className="tab-item" align="center">
                                        Status
                                    </TableCell>
                                    <TableCell className="tab-item" align="center">
                                        View
                                    </TableCell>
                                    {
                                        value === "1" ? (
                                            <TableCell className="tab-item" align="center">
                                                Action
                                            </TableCell>
                                        ) : null
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    products && products.length > 0 ? products.map((product: Product, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className="trow-item" align="center">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell className="trow-item" align="center">
                                                <img src={product.productImages.length > 0 ? `${serverApi}/${product.productImages[0]}` : "/img/profile/image.svg"} alt="products" />
                                            </TableCell>
                                            <TableCell className="trow-item" align="center">
                                                <Box className="title">{product.productName}</Box>
                                                <Box className="subtitle">₩{numberSplitterHandler(product.productPrice, 3, ".")}</Box>
                                            </TableCell>
                                            <TableCell className="trow-item" align="center">
                                                {moment(product.createdAt).format("DD MMMM, YYYY")}
                                            </TableCell>
                                            {
                                                value === "1" ? (
                                                    <>
                                                        <TableCell className="trow-item status" align="center">
                                                            <Fab className="status-btn" onClick={(e: any) => toggleStatusHandler(e, product._id)}>
                                                                Active
                                                            </Fab>
                                                            <Menu
                                                                anchorEl={anchor}
                                                                open={Boolean(anchor)}
                                                                onClose={() => setAnchor(null)}
                                                                sx={{ marginTop: "10px" }}
                                                            >
                                                                <MenuItem>
                                                                    <Button sx={{ padding: "4px 13px" }} onClick={(e: any) => statusChangeHandler(e, ProductStatus.SOLD)}>
                                                                        Sold
                                                                    </Button>
                                                                </MenuItem>
                                                            </Menu>
                                                        </TableCell>
                                                    </>
                                                ) : (
                                                    <TableCell className="trow-item status" align="center">
                                                        <Button disableRipple className="status-btn">
                                                            Sold
                                                        </Button>
                                                    </TableCell>
                                                )
                                            }
                                            <TableCell className="trow-item" align="center">
                                                {product.productViews}
                                            </TableCell>
                                            {
                                                value === "1" ? (
                                                    <TableCell className="trow-item" align="center">
                                                        <Stack className="action-btn">
                                                            <IconButton onClick={() => {
                                                                router.push(`/memberPage?stage=8&productId=${product._id}`)
                                                            }}>
                                                                <Pen />
                                                            </IconButton>
                                                            <IconButton onClick={(e: any) => {
                                                                statusChangeHandler(e, ProductStatus.DELETE, product._id)
                                                            }}>
                                                                <Trash />
                                                            </IconButton>
                                                        </Stack>
                                                    </TableCell>
                                                ) : null
                                            }
                                        </TableRow>
                                    )) : null
                                }
                            </TableBody>
                        </Table>
                        {
                            products && products.length > 0 ? (
                                <>
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
                                    <Box className="avb">Total {totalProducts} products avaible</Box>
                                </>
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
                    </TabPanel>
                </TabContext>
            </Stack>
        </Stack>
    )
}

export default AllProducts