import { NextPage } from "next";
import { ProductCategory } from "@/libs/enum/product.enum";
import { MemoryRounded, ScreenshotMonitorRounded, StorageRounded } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { Product } from "@/libs/types/product/product";
import { Memory } from "@phosphor-icons/react/dist/ssr";
import { GraphicsCard } from "@phosphor-icons/react";

function ProductSpecBoardPc(props: any) {
    const { productCore, productGraphics, productStorage, productMemory, productDisplay } = props.product
    const deviceType = ProductCategory.LAPTOP
    return (
        <Stack className="product-spec-board">
            <Stack className="product-spec-item">
                <Box className="product-spec-item-icon">
                    <MemoryRounded sx={{ fontSize: "40px" }} />
                </Box>
                <Box>{productCore.replace(/_/g, " ")}</Box>
            </Stack>
            <Stack className="product-spec-item">
                <Box className="product-spec-item-icon">
                    <GraphicsCard size={40} />
                </Box>
                <Box>{productGraphics.replace(/_/g, " ")}</Box>
            </Stack>
            <Stack className="product-spec-item">
                <Box className="product-spec-item-icon">
                    <StorageRounded sx={{ fontSize: "40px" }} />
                </Box>
                <Box>SSD {productStorage} GB</Box>
            </Stack>
            <Stack className="product-spec-item">
                <Box className="product-spec-item-icon">
                    <Memory size={40} />
                </Box>
                <Box>{productMemory} GB</Box>
            </Stack>
            {productDisplay && (
                <Stack className="product-spec-item">
                    <Box className="product-spec-item-icon">
                        <ScreenshotMonitorRounded sx={{ fontSize: "40px" }} />
                    </Box>
                    <Box>{productDisplay} inch</Box>
                </Stack>
            )}
        </Stack>
    )
}
export default ProductSpecBoardPc