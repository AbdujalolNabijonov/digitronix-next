import { Box, Stack } from "@mui/material"

const AllProducts = () => {
    return (
        <Stack className="all-products">
            <Stack className="all-products-head">
                <Box className={"title"}>My Products</Box>
                <Box className={"subtitle"}>You can find out more about your products!</Box>
            </Stack>
            <Stack className="all-products-body">

            </Stack>
        </Stack>
    )
}

export default AllProducts