import { useRef, useState } from "react"
import { Connectivity, MaterialType, ProductBrand, ProductCategory, ProductLabel, ProductSeries } from "@/libs/enum/product.enum"
import { ProductType } from "@/libs/types/product/product.input"
import { CloudUploadRounded, KeyboardArrowDown } from "@mui/icons-material"
import { CssVarsProvider, FormControl, FormLabel, Input, Option, Select, selectClasses } from "@mui/joy"
import { Box, Button, Divider, IconButton, Stack } from "@mui/material"
import { ArrowSquareOut } from "phosphor-react"
import { FileUploader } from 'react-drag-drop-files'
import { sweetConfirmAlert, sweetErrorHandling, sweetTopSmallSuccessAlert } from "@/libs/sweetAlert"
import axios from "axios"
import { getJwtToken } from "@/libs/auth"
import { Messages, serverApi } from "@/libs/config"
import { useMutation } from "@apollo/client"
import { CREATE_PRODUCT } from "@/apollo/user/mutation"
import { numberSplitterHandler } from "@/libs/features/splitter"

const AddProduct = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const fileTypes = ["JPG", "PNG"];
    const requiredFields: Record<string, string[]> = {
        LAPTOP: ["productName", "productBrand", "productPrice", "productCore", "productDisplay", "productGraphics", "productImages", "productMemory", "productOS", "productSerie", "productStorage"],
        DESKTOP: ["productName", "productBrand", "productPrice", "productCore", "productGraphics", "productImages", "productMemory", "productOS", "productSerie", "productStorage"],
        GRAPHICS: ["productName", "productBrand", "productPrice", "productGraphics", "productImages", "productSerie", "productStorage"],
        KEYBOARD: ["productName", "productBrand", "productPrice", "productConnectivity", "productImages", "productSerie"],
        MICE: ["productName", "productBrand", "productPrice", "productConnectivity", "productImages", "productSerie"],
        CHAIR: ["productName", "productBrand", "productPrice", "productImages", "productWeight"]
    };
    const [priceValue, setPriceValue] = useState("")
    const initialProduct = {
        productName: "",
        productLabel: "",
        productBrand: "",
        productCategory: ProductCategory.DESKTOP,
        productPrice: 0,
        productColor: "",
        productCore: "",
        productSerie: "",
        productDisplay: 0,
        productOS: "",
        productMemory: 0,
        productStorage: 0,
        productGraphics: "",
        productConnectivity: "",
        productMaterial: "",
        productImages: [],
        productWeight: 0,
        productDesc: "",
    }
    let [productObj, setProductObj] = useState(initialProduct)


    const [createProduct] = useMutation(CREATE_PRODUCT)

    const imagesUploadHandler = async (files: any) => {
        try {
            if (files.length > 5) throw new Error(Messages.error8)
            const token = getJwtToken()
            const formData = new FormData();
            formData.append(
                'operations',
                JSON.stringify({
                    query: `mutation ImagesUploader($files: [Upload!]!, $target: String!) { 
						imagesUploader(files: $files, target: $target)
				  }`,
                    variables: {
                        files: [null, null, null, null, null],
                        target: 'product',
                    },
                }),
            );
            formData.append(
                'map',
                JSON.stringify({
                    '0': ['variables.files.0'],
                    '1': ['variables.files.1'],
                    '2': ['variables.files.2'],
                    '3': ['variables.files.3'],
                    '4': ['variables.files.4'],
                }),
            );
            for (let key in files) {
                formData.append(`${key}`, files[key])
            }
            const response = await axios.post(`${process.env.REACT_APP_API_GRAPHQL_URL}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'apollo-require-preflight': true,
                    Authorization: `Bearer ${token}`,
                },
            });
            productObj.productImages = response.data.data.imagesUploader;
            setProductObj({ ...productObj })
        } catch (err: any) {
            console.log(`ERROR: imagesUploadHandler, ${err.message}`)
            await sweetErrorHandling(err)
        }
    }

    const submitHandler = async () => {
        try {
            const category = productObj.productCategory;
            const fieldsToCheck = requiredFields[category] || [];
            //@ts-ignore
            const missingFields = fieldsToCheck.filter(field => !productObj[field]);

            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
            }
            if (!productObj.productDesc) {
                throw new Error("Insert some info about your product ")
            }
            Object.keys(productObj).map(key => {
                //@ts-ignore
                if (!productObj[key]) delete productObj[key]
            })
            const confirm = await sweetConfirmAlert("Do you want to submit product?")
            if (confirm) {
                await createProduct({ variables: { input: productObj } });
                await sweetTopSmallSuccessAlert("Product created successfully!")
            }
        } catch (err: any) {
            console.log(`Error: submitHandler, ${err.message}`)
            await sweetErrorHandling(err)
        }
    }

    const changeCategoryHandler = (e: any, value: any) => {
        productObj = initialProduct
        productObj.productCategory = value;
        setProductObj({ ...productObj })
    }
    const setNameHandler = (e: any) => {
        productObj.productName = e.target.value;
        setProductObj({ ...productObj })
    }
    const setLabelHandler = (e: any, label: any) => {
        productObj.productLabel = label;
        setProductObj({ ...productObj })
    }
    const brandSelectHandler = (e: any, brand: any) => {
        productObj.productBrand = brand
        setProductObj({ ...productObj })
    }

    const setPriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        setProductObj(prev => ({ ...prev, productPrice: Number(value) }));
        setPriceValue(numberSplitterHandler(Number(value), 3, "."))
    };

    const colorSelectHandler = (e: any, color: any) => {
        productObj.productColor = String(color).toUpperCase()
        setProductObj({ ...productObj })
    }
    const setCoreHandler = (e: any) => {
        productObj.productCore = e.target.value;
        setProductObj({ ...productObj })
    }
    const serieSelectHandler = (e: any, serie: any) => {
        productObj.productSerie = serie;
        setProductObj({ ...productObj })
    }
    const displaySelectHandler = (e: any, display: any) => {
        productObj.productDisplay = display;
        setProductObj({ ...productObj })
    }
    const OSSelectHandler = (e: any, os: any) => {
        productObj.productOS = os;
        setProductObj({ ...productObj })
    }
    const memorySelectHandler = (e: any, memory: any) => {
        productObj.productMemory = memory;
        setProductObj({ ...productObj })
    }
    const storageSelectHandler = (e: any, storage: any) => {
        productObj.productStorage = storage
        setProductObj({ ...productObj })
    }
    const setGraphicsHandler = (e: any) => {
        productObj.productGraphics = e.target.value;
        setProductObj({ ...productObj })
    }
    const connectivitySelectHandler = (e: any, connectivity: any) => {
        productObj.productConnectivity = connectivity;
        setProductObj({ ...productObj })
    }
    const materialSelectHandler = (e: any, material: any) => {
        productObj.productMaterial = String(material)
        setProductObj({ ...productObj })
    }
    const setWeightHandler = (e: any) => {
        productObj.productWeight = Number(e.target.value);
        setProductObj({ ...productObj })
    }
    const setDescHandler = (e: any) => {
        productObj.productDesc = e.target.value;
        setProductObj({ ...productObj })
    }
    return (
        <Stack className={"add-product"}>
            <Stack className="add-product-head">
                <Box className={"title"}>Add Product</Box>
                <Box className="subtitle">You can sell your product with this trustful platform!</Box>
            </Stack>
            <Stack className="add-poduct-body">
                <CssVarsProvider>
                    <Box className="add-title">Common Inserts</Box>
                    <Stack className="add-insert">
                        <FormControl sx={{ flex: 1 }}>
                            <FormLabel className={"add-label"}>
                                Product Category
                            </FormLabel>
                            <Select
                                onChange={changeCategoryHandler}
                                placeholder="Select a categy"
                                indicator={<KeyboardArrowDown />}
                                value={productObj.productCategory}
                                sx={{
                                    padding: "10px",
                                    [`& .${selectClasses.indicator}`]: {
                                        transition: '0.2s',
                                        [`&.${selectClasses.expanded}`]: {
                                            transform: 'rotate(-180deg)',
                                        },
                                    },
                                }}
                            >
                                {Object.values(ProductType).map((category: string, index: number) => (
                                    <Option value={category} key={category}>{category}</Option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ flex: 1 }}>
                            <FormLabel className={"add-label"}>
                                Product Brand
                            </FormLabel>
                            <Select
                                placeholder="Select a brand"
                                indicator={<KeyboardArrowDown />}
                                onChange={brandSelectHandler}
                                value={productObj.productBrand}
                                sx={{
                                    padding: "10px",
                                    [`& .${selectClasses.indicator}`]: {
                                        transition: '0.2s',
                                        [`&.${selectClasses.expanded}`]: {
                                            transform: 'rotate(-180deg)',
                                        },
                                    },
                                }}
                            >
                                {Object.values(ProductBrand).map((brand: string, index: number) => (
                                    <Option value={brand} key={index}>{brand}</Option>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack className="add-insert">
                        <FormControl sx={{ flex: 1 }}>
                            <FormLabel className={"add-label"}>Product Name</FormLabel>
                            <Input placeholder="Type in here…" value={productObj.productName} variant="soft" sx={{ padding: "10px" }} onChange={setNameHandler} />
                        </FormControl>
                        <FormControl sx={{ flex: 1 }}>
                            <FormLabel className={"add-label"}>Price</FormLabel>
                            <Input placeholder="Type in here…" value={priceValue} variant="soft" sx={{ padding: "10px" }} onChange={setPriceHandler} />
                            <p style={{ color: 'red', fontSize: "12pxs", marginLeft: "10px" }}>THIS IS IN KOREAN CURRENCY</p>
                        </FormControl>
                        <FormControl sx={{ flex: 1 }}>
                            <FormLabel className={"add-label"}>
                                Product Label
                            </FormLabel>
                            <Select
                                placeholder="Select a brand"
                                indicator={<KeyboardArrowDown />}
                                value={productObj.productLabel}
                                onChange={setLabelHandler}
                                sx={{
                                    padding: "10px",
                                    [`& .${selectClasses.indicator}`]: {
                                        transition: '0.2s',
                                        [`&.${selectClasses.expanded}`]: {
                                            transform: 'rotate(-180deg)',
                                        },
                                    },
                                }}
                            >
                                {Object.values(ProductLabel).map((label: string, index: number) => (
                                    <Option value={label} key={index}>{label}</Option>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Divider sx={{ borderColor: "white", marginTop: "20px" }} />
                    {
                        productObj.productCategory === ProductCategory.DESKTOP || productObj.productCategory === ProductCategory.LAPTOP ? (
                            <Stack className="add-pc">
                                <Box className="add-title">Computer Inserts</Box>
                                <Stack className="add-insert">
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel className={"add-label"}>Core Chip</FormLabel>
                                        <Input placeholder="Type in here…" value={productObj.productCore} variant="soft" sx={{ padding: "10px" }} onChange={setCoreHandler} />
                                    </FormControl>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel className={"add-label"}>
                                            Serie
                                        </FormLabel>
                                        <Select
                                            placeholder="Select a brand"
                                            indicator={<KeyboardArrowDown />}
                                            onChange={serieSelectHandler}
                                            value={productObj.productSerie}
                                            sx={{
                                                padding: "10px",
                                                [`& .${selectClasses.indicator}`]: {
                                                    transition: '0.2s',
                                                    [`&.${selectClasses.expanded}`]: {
                                                        transform: 'rotate(-180deg)',
                                                    },
                                                },
                                            }}
                                        >
                                            {Object.values(ProductSeries).map((serie: string, index: number) => (
                                                <Option value={serie} key={serie}>{serie}</Option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <Stack className="add-insert">
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel className={"add-label"}>
                                            Display Inch
                                        </FormLabel>
                                        <Select
                                            placeholder="Select a brand"
                                            indicator={<KeyboardArrowDown />}
                                            onChange={displaySelectHandler}
                                            value={productObj.productDisplay}
                                            sx={{
                                                padding: "10px",
                                                [`& .${selectClasses.indicator}`]: {
                                                    transition: '0.2s',
                                                    [`&.${selectClasses.expanded}`]: {
                                                        transform: 'rotate(-180deg)',
                                                    },
                                                },
                                            }}
                                        >
                                            {[10.1, 11.6, 12.3, 12.5, 13.3, 14, 15.6, 16, 17.3, 18].map((inch: number, index: number) => (
                                                <Option value={inch} key={inch}>{inch}</Option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel className={"add-label"}>
                                            OS
                                        </FormLabel>
                                        <Select
                                            placeholder="Select a brand"
                                            indicator={<KeyboardArrowDown />}
                                            onChange={OSSelectHandler}
                                            sx={{
                                                padding: "10px",
                                                [`& .${selectClasses.indicator}`]: {
                                                    transition: '0.2s',
                                                    [`&.${selectClasses.expanded}`]: {
                                                        transform: 'rotate(-180deg)',
                                                    },
                                                },
                                            }}
                                        >
                                            {[
                                                "Windows",
                                                "macOS",
                                                "Linux",
                                                "Ubuntu",
                                                "Fedora",
                                                "Debian",
                                                "Arch Linux",
                                                "Kali Linux",
                                                "Chrome OS",
                                                "FreeBSD",
                                                "OpenBSD",
                                                "Solaris",
                                                "Haiku",
                                                "ReactOS"
                                            ].map((os: string, index: number) => (
                                                <Option value={os} key={os}>{os}</Option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel className={"add-label"}>Graphics Card</FormLabel>
                                        <Input placeholder="Type in here…" value={productObj.productGraphics} variant="soft" sx={{ padding: "10px" }} onChange={setGraphicsHandler} />
                                    </FormControl>
                                </Stack>
                                <Stack className="add-insert">
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel className={"add-label"}>
                                            Memory Ram
                                        </FormLabel>
                                        <Select
                                            placeholder="Select a brand"
                                            indicator={<KeyboardArrowDown />}
                                            onChange={memorySelectHandler}
                                            value={productObj.productMemory}
                                            sx={{
                                                padding: "10px",
                                                [`& .${selectClasses.indicator}`]: {
                                                    transition: '0.2s',
                                                    [`&.${selectClasses.expanded}`]: {
                                                        transform: 'rotate(-180deg)',
                                                    },
                                                },
                                            }}
                                        >
                                            {[2, 4, 8, 16, 32, 64, 128, 256].map((memory: number, index: number) => (
                                                <Option value={memory} key={memory}>{memory}GB</Option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel className={"add-label"}>
                                            Storage HardWare
                                        </FormLabel>
                                        <Select
                                            placeholder="Select a brand"
                                            indicator={<KeyboardArrowDown />}
                                            value={productObj.productStorage}
                                            onChange={storageSelectHandler}
                                            sx={{
                                                padding: "10px",
                                                [`& .${selectClasses.indicator}`]: {
                                                    transition: '0.2s',
                                                    [`&.${selectClasses.expanded}`]: {
                                                        transform: 'rotate(-180deg)',
                                                    },
                                                },
                                            }}
                                        >
                                            {[128, 256, 512, 1024, 2048, 4096, 8192].map((memory: number, index: number) => (
                                                <Option value={memory} key={memory}>{memory}GB</Option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Stack>
                        ) : null
                    }
                    {
                        productObj.productCategory === ProductCategory.MICE || productObj.productCategory === ProductCategory.KEYBOARD ? (
                            <Stack className="add-km">
                                <Box className="add-title">Keyboard & Mice Inserts</Box>
                                <Stack className="add-insert">
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel className={"add-label"}>
                                            Connectivity
                                        </FormLabel>
                                        <Select
                                            placeholder="Select a brand"
                                            indicator={<KeyboardArrowDown />}
                                            onChange={connectivitySelectHandler}
                                            value={productObj.productConnectivity}
                                            sx={{
                                                padding: "10px",
                                                [`& .${selectClasses.indicator}`]: {
                                                    transition: '0.2s',
                                                    [`&.${selectClasses.expanded}`]: {
                                                        transform: 'rotate(-180deg)',
                                                    },
                                                },
                                            }}
                                        >
                                            {Object.values(Connectivity).map((type: string, index: number) => (
                                                <Option value={type} key={type}>{type}</Option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel className={"add-label"}>
                                            Brand
                                        </FormLabel>
                                        <Select
                                            placeholder="Select a brand"
                                            indicator={<KeyboardArrowDown />}
                                            value={productObj.productBrand}
                                            onChange={brandSelectHandler}
                                            sx={{
                                                padding: "10px",
                                                [`& .${selectClasses.indicator}`]: {
                                                    transition: '0.2s',
                                                    [`&.${selectClasses.expanded}`]: {
                                                        transform: 'rotate(-180deg)',
                                                    },
                                                },
                                            }}
                                        >
                                            {Object.values(ProductBrand).map((brand: string, index: number) => (
                                                <Option value={brand} key={brand}>{brand}</Option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <Stack className="add-insert">
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel className={"add-label"}>
                                            Color
                                        </FormLabel>
                                        <Select
                                            placeholder="Select a brand"
                                            indicator={<KeyboardArrowDown />}
                                            value={productObj.productColor}
                                            onChange={colorSelectHandler}
                                            sx={{
                                                padding: "10px",
                                                [`& .${selectClasses.indicator}`]: {
                                                    transition: '0.2s',
                                                    [`&.${selectClasses.expanded}`]: {
                                                        transform: 'rotate(-180deg)',
                                                    },
                                                },
                                            }}
                                        >
                                            {["Black", "Red", "Silver", "White", "Gray", "Blue", "Gold"].map((color: string, index: number) => (
                                                <Option value={color} key={color}>{color}</Option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel className={"add-label"}>
                                            Serie
                                        </FormLabel>
                                        <Select
                                            placeholder="Select a brand"
                                            indicator={<KeyboardArrowDown />}
                                            value={productObj.productSerie}
                                            onChange={serieSelectHandler}
                                            sx={{
                                                padding: "10px",
                                                [`& .${selectClasses.indicator}`]: {
                                                    transition: '0.2s',
                                                    [`&.${selectClasses.expanded}`]: {
                                                        transform: 'rotate(-180deg)',
                                                    },
                                                },
                                            }}
                                        >
                                            {Object.values(ProductSeries).map((serie: string, index: number) => (
                                                <Option value={serie} key={serie}>{serie}</Option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Stack>
                        ) : null
                    }
                    {
                        productObj.productCategory === ProductCategory.GRAPHICS ? (
                            <Stack className="add-graphics">
                                <Box className="add-title">Graphics Inserts</Box>
                                <Stack className="add-insert">
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel className={"add-label"}>
                                            Serie
                                        </FormLabel>
                                        <Select
                                            placeholder="Select a brand"
                                            indicator={<KeyboardArrowDown />}
                                            sx={{
                                                padding: "10px",
                                                [`& .${selectClasses.indicator}`]: {
                                                    transition: '0.2s',
                                                    [`&.${selectClasses.expanded}`]: {
                                                        transform: 'rotate(-180deg)',
                                                    },
                                                },
                                            }}
                                        >
                                            {Object.values(ProductSeries).map((serie: string, index: number) => (
                                                <Option value={serie} key={serie}>{serie}</Option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel className={"add-label"}>
                                            Memory Ram
                                        </FormLabel>
                                        <Select
                                            placeholder="Select a brand"
                                            indicator={<KeyboardArrowDown />}
                                            onChange={memorySelectHandler}
                                            value={productObj.productMemory}
                                            sx={{
                                                padding: "10px",
                                                [`& .${selectClasses.indicator}`]: {
                                                    transition: '0.2s',
                                                    [`&.${selectClasses.expanded}`]: {
                                                        transform: 'rotate(-180deg)',
                                                    },
                                                },
                                            }}
                                        >
                                            {[2, 4, 8, 16, 32, 64, 128, 256].map((memory: number, index: number) => (
                                                <Option value={memory} key={memory}>{memory}GB</Option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Stack>
                        ) : null
                    }
                    {
                        productObj.productCategory === ProductCategory.CHAIR ? (
                            <Stack className="add-chair">
                                <Box className="add-title">Chair Inserts</Box>
                                <Stack className="add-insert">
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel className={"add-label"}>
                                            Fabric Type
                                        </FormLabel>
                                        <Select
                                            placeholder="Select a brand"
                                            indicator={<KeyboardArrowDown />}
                                            onChange={materialSelectHandler}
                                            value={productObj.productMaterial}
                                            sx={{
                                                padding: "10px",
                                                [`& .${selectClasses.indicator}`]: {
                                                    transition: '0.2s',
                                                    [`&.${selectClasses.expanded}`]: {
                                                        transform: 'rotate(-180deg)',
                                                    },
                                                },
                                            }}
                                        >
                                            {Object.values(MaterialType).map((type: string, index: number) => (
                                                <Option value={type} key={type}>{type}</Option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel className={"add-label"}>
                                            Chair Weight
                                        </FormLabel>
                                        <Input
                                            type="number"
                                            defaultValue={2}
                                            sx={{ padding: "10px" }}
                                            onChange={setWeightHandler}
                                            value={productObj.productWeight}
                                            slotProps={{
                                                input: {
                                                    ref: inputRef,
                                                    min: 1,
                                                    max: 5,
                                                    step: 0.1,
                                                },
                                            }}
                                        />
                                    </FormControl>

                                </Stack>
                            </Stack>
                        ) : null
                    }
                    <Divider sx={{ borderColor: "white", marginTop: "20px" }} />

                </CssVarsProvider>
                <Stack className={"product-desc"}>
                    <Box className={"add-title"}>Product Description</Box>
                    <textarea rows={10} placeholder="Product Description ..." onChange={setDescHandler} value={productObj.productDesc}></textarea>
                </Stack>
                <Divider sx={{ borderColor: "white", marginTop: "20px" }} />
                <Stack>
                    <Box className={"add-title"}>Product Images</Box>
                    <Stack className="upload-images">
                        <FileUploader handleChange={imagesUploadHandler} classes="drag-dropper" name="file" types={fileTypes} multiple={true} >
                            <CloudUploadRounded className="drag-icon" />
                            <Box className="title">Drag and Drop images here</Box>
                            <Stack>
                                <ul>
                                    <li>Valid formatted images: image/jpg image/png image/jpeg</li>
                                    <li>Well quality image for user experience</li>
                                    <li>Relevant image for each product</li>
                                </ul>
                            </Stack>
                            <Button endIcon={<ArrowSquareOut size={32} />}>
                                Browse Files
                            </Button>
                        </FileUploader>
                    </Stack>
                </Stack>
                {
                    productObj.productImages && productObj.productImages.length > 0 ? (
                        <Stack className="product-images">
                            {
                                productObj.productImages.map((image: string, index: number) => (
                                    <img key={index} src={`${serverApi}/${image}`} alt="this is product image" />
                                ))
                            }
                        </Stack>
                    ) : null
                }
                <Divider sx={{ borderColor: "white", marginTop: "20px" }} />
                <Stack className="submit-btn">
                    <Button onClick={submitHandler} disabled={productObj.productImages.length>0}>
                        Create Product
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    )
}
export default AddProduct