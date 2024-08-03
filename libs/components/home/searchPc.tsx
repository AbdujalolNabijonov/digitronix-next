import { Stack } from "@mui/material"
import { NextPage } from "next"
import HomeFilter from "./homeFilter"

const SearchPc: NextPage = (props: any) => {
    return (
        <>
            <Stack className={"gaming-pc"}>
                <Stack className="container" direction={"row"} justifyContent={"space-between"}>
                    <Stack className="images" direction={"row"} gap={"15px"}>
                        <div className={"img-big"}>
                            <img src="/img/products/gaming.avif" alt="" />
                        </div>
                        <Stack gap={"15px"}>
                            <div className={"img-little"}>
                                <img src="/img/products/gaming-2.jpeg" alt="" />
                            </div>
                            <div className={"img-little"}>
                                <img src="/img/products/gaming-3.jpg" alt="" />
                            </div>
                        </Stack>
                    </Stack>
                    <Stack alignItems={"center"}>
                        <div className="title">
                            Search your own gaming PC
                        </div>
                        <div className="subtitle">
                            We are passionate about teaming up with gamers to fearlessly challenge the limits and win ultimate glory.
                        </div>
                        <div className="filter-search">
                            <HomeFilter />
                        </div>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default SearchPc