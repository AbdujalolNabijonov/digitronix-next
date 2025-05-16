import { Stack } from "@mui/material"
import { NextPage } from "next"
import HomeFilter from "./homeFilter"
import { useEffect, useState } from "react"

const SearchPc: NextPage = (props: any) => {
    const [aosEnable, setAosEnable] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            setAosEnable(window.scrollY > 2500);
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])
    return (
        <>
            <Stack className={"gaming-pc"}>
                <Stack className="container" direction={"row"} justifyContent={"space-between"}>
                    <Stack direction={"row"} gap={"15px"} data-aos="fade-right" className={aosEnable ? "aos-animate transition images duration-1000" : "images duration-1000"}>
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
                    <Stack alignItems={"center"} className={aosEnable ? "aos-animate transition duration-1000" : "duration-1000"} data-aos="fade-left" >
                        <div className="title text-white">
                            Search your own gaming PC
                        </div>
                        <div className="subtitle text-white">
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